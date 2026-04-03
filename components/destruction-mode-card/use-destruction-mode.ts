"use client";

import Matter from "matter-js";
import { useCallback, useEffect, useRef } from "react";

const { Engine, World, Bodies, Body, Mouse, MouseConstraint, Events, Runner } =
  Matter;

const DESTRUCTION_FLAG = "__destructionModeActive";

interface ElementBody {
  body: Matter.Body;
  element: HTMLElement;
  originalStyles: {
    transform: string;
    transition: string;
    zIndex: string;
    pointerEvents: string;
    willChange: string;
    animation: string;
  };
  originalAbsCenter: { x: number; y: number };
}

const RESTITUTION = 0.4;
const FRICTION = 0.3;
const WALL_THICKNESS = 200;

function enableGravity(engine: Matter.Engine) {
  engine.gravity.y = 1;
  engine.gravity.scale = 0.001;
}

function restoreElementStyles(eb: ElementBody) {
  const { element, originalStyles } = eb;
  element.style.transform = originalStyles.transform;
  element.style.transition = originalStyles.transition;
  element.style.zIndex = originalStyles.zIndex;
  element.style.pointerEvents = originalStyles.pointerEvents;
  element.style.willChange = originalStyles.willChange;
  element.style.animation = originalStyles.animation;
}

function cleanupPhysics(
  runner: Matter.Runner | null,
  engine: Matter.Engine | null,
  canvas: HTMLCanvasElement | null
) {
  if (runner) {
    Runner.stop(runner);
  }
  if (engine) {
    World.clear(engine.world, false);
    Engine.clear(engine);
  }
  if (canvas) {
    canvas.remove();
  }
}

export function useDestructionMode() {
  const engineRef = useRef<Matter.Engine | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const elementBodiesRef = useRef<ElementBody[]>([]);
  const wallsRef = useRef<Matter.Body[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const activeRef = useRef(false);
  const rafRef = useRef<number>(0);
  const scrollHandlerRef = useRef<(() => void) | null>(null);
  const wheelHandlerRef = useRef<((e: WheelEvent) => void) | null>(null);

  const syncDOM = useCallback(() => {
    for (const {
      body,
      element,
      originalAbsCenter,
    } of elementBodiesRef.current) {
      const dx = body.position.x - originalAbsCenter.x;
      const dy = body.position.y - originalAbsCenter.y;
      element.style.transform = `translate(${dx}px, ${dy}px) rotate(${body.angle}rad)`;
    }
    if (activeRef.current) {
      rafRef.current = requestAnimationFrame(syncDOM);
    }
  }, []);

  const activate = useCallback(() => {
    if (activeRef.current) {
      return;
    }
    activeRef.current = true;

    (window as unknown as Record<string, unknown>)[DESTRUCTION_FLAG] = true;
    document.body.style.overflowX = "clip";

    const engine = Engine.create({ gravity: { x: 0, y: 0, scale: 0 } });
    engineRef.current = engine;

    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    const viewW = window.innerWidth;
    const viewH = window.innerHeight;
    const docW = Math.max(document.documentElement.scrollWidth, viewW);
    const docH = Math.max(document.documentElement.scrollHeight, viewH);

    const walls = [
      Bodies.rectangle(
        docW / 2,
        docH + WALL_THICKNESS / 2,
        docW * 2,
        WALL_THICKNESS,
        { isStatic: true }
      ),
      Bodies.rectangle(
        -WALL_THICKNESS / 2,
        docH / 2,
        WALL_THICKNESS,
        docH * 2,
        { isStatic: true }
      ),
      Bodies.rectangle(
        docW + WALL_THICKNESS / 2,
        docH / 2,
        WALL_THICKNESS,
        docH * 2,
        { isStatic: true }
      ),
      Bodies.rectangle(
        docW / 2,
        -WALL_THICKNESS / 2,
        docW * 2,
        WALL_THICKNESS,
        { isStatic: true }
      ),
    ];
    wallsRef.current = walls;
    World.add(engine.world, walls);

    const elements = document.querySelectorAll<HTMLElement>(
      "[data-destructible]"
    );
    const bodies: ElementBody[] = [];

    for (const element of elements) {
      const prevAnimation = element.style.animation;
      element.style.animation = "none";

      const rect = element.getBoundingClientRect();
      const absCX = rect.left + scrollX + rect.width / 2;
      const absCY = rect.top + scrollY + rect.height / 2;

      const body = Bodies.rectangle(absCX, absCY, rect.width, rect.height, {
        restitution: RESTITUTION,
        friction: FRICTION,
        frictionAir: 0.01,
      });

      bodies.push({
        body,
        element,
        originalStyles: {
          transform: element.style.transform,
          transition: element.style.transition,
          zIndex: element.style.zIndex,
          pointerEvents: element.style.pointerEvents,
          willChange: element.style.willChange,
          animation: prevAnimation,
        },
        originalAbsCenter: { x: absCX, y: absCY },
      });

      element.style.transition = "none";
      element.style.zIndex = "50";
      element.style.pointerEvents = "none";
      element.style.willChange = "transform";

      World.add(engine.world, body);
    }

    elementBodiesRef.current = bodies;

    const canvas = document.createElement("canvas");
    canvas.style.cssText =
      "position:fixed;inset:0;width:100%;height:100%;z-index:9998;cursor:grab;touch-action:none;";
    canvas.width = viewW;
    canvas.height = viewH;
    document.body.appendChild(canvas);
    canvasRef.current = canvas;

    const handleWheel = (e: WheelEvent) => {
      window.scrollBy(e.deltaX, e.deltaY);
    };
    canvas.addEventListener("wheel", handleWheel, { passive: true });
    wheelHandlerRef.current = handleWheel;

    const mouse = Mouse.create(canvas);
    mouse.offset.x = scrollX;
    mouse.offset.y = scrollY;

    const handleScroll = () => {
      mouse.offset.x = window.scrollX;
      mouse.offset.y = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    scrollHandlerRef.current = handleScroll;

    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.2, render: { visible: false } },
    });
    World.add(engine.world, mouseConstraint);

    Events.on(mouseConstraint, "startdrag", () => {
      canvas.style.cursor = "grabbing";
    });
    Events.on(mouseConstraint, "enddrag", () => {
      canvas.style.cursor = "grab";
    });

    const runner = Runner.create();
    Runner.run(runner, engine);
    runnerRef.current = runner;

    rafRef.current = requestAnimationFrame(syncDOM);
  }, [syncDOM]);

  const deactivate = useCallback(() => {
    if (!activeRef.current) {
      return;
    }
    activeRef.current = false;
    cancelAnimationFrame(rafRef.current);

    (window as unknown as Record<string, unknown>)[DESTRUCTION_FLAG] = false;
    document.body.style.overflowX = "";

    if (scrollHandlerRef.current) {
      window.removeEventListener("scroll", scrollHandlerRef.current);
      scrollHandlerRef.current = null;
    }
    if (wheelHandlerRef.current && canvasRef.current) {
      canvasRef.current.removeEventListener("wheel", wheelHandlerRef.current);
      wheelHandlerRef.current = null;
    }

    cleanupPhysics(runnerRef.current, engineRef.current, canvasRef.current);
    runnerRef.current = null;
    engineRef.current = null;
    canvasRef.current = null;

    for (const eb of elementBodiesRef.current) {
      restoreElementStyles(eb);
    }
    elementBodiesRef.current = [];
    wallsRef.current = [];
  }, []);

  const explode = useCallback(() => {
    if (!(activeRef.current && engineRef.current)) {
      return;
    }
    enableGravity(engineRef.current);

    const cx = window.scrollX + window.innerWidth / 2;
    const cy = window.scrollY + window.innerHeight / 2;

    for (const { body } of elementBodiesRef.current) {
      const dx = body.position.x - cx;
      const dy = body.position.y - cy;
      const dist = Math.max(Math.sqrt(dx * dx + dy * dy), 1);
      const force = 0.25;
      Body.applyForce(body, body.position, {
        x: (dx / dist) * force + (Math.random() - 0.5) * 0.05,
        y: (dy / dist) * force - 0.15,
      });
      Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.8);
    }
  }, []);

  const shake = useCallback(() => {
    if (!(activeRef.current && engineRef.current)) {
      return;
    }
    enableGravity(engineRef.current);

    for (const { body } of elementBodiesRef.current) {
      Body.applyForce(body, body.position, {
        x: (Math.random() - 0.5) * 0.05,
        y: -Math.random() * 0.06,
      });
      Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.2);
    }
  }, []);

  const reset = useCallback(
    (onComplete?: () => void) => {
      if (!activeRef.current) {
        onComplete?.();
        return;
      }

      if (runnerRef.current) {
        Runner.stop(runnerRef.current);
      }
      cancelAnimationFrame(rafRef.current);

      if (canvasRef.current) {
        canvasRef.current.style.pointerEvents = "none";
      }

      const elements = elementBodiesRef.current;
      if (elements.length === 0) {
        deactivate();
        onComplete?.();
        return;
      }

      let done = false;
      const finish = () => {
        if (done) {
          return;
        }
        done = true;
        deactivate();
        onComplete?.();
      };

      let completed = 0;
      for (const eb of elements) {
        eb.element.style.transition =
          "transform 500ms cubic-bezier(0.25, 1, 0.5, 1)";
        eb.element.style.transform = "translate(0px, 0px) rotate(0rad)";

        const onEnd = () => {
          eb.element.removeEventListener("transitionend", onEnd);
          completed++;
          if (completed >= elements.length) {
            finish();
          }
        };
        eb.element.addEventListener("transitionend", onEnd);
      }

      setTimeout(finish, 700);
    },
    [deactivate]
  );

  useEffect(() => {
    return () => {
      if (activeRef.current) {
        deactivate();
      }
    };
  }, [deactivate]);

  return { activate, deactivate, reset, explode, shake };
}
