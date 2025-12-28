import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ResumeCard } from "./resume-card";

describe("ResumeCard", () => {
  it("should render resume card with title", () => {
    render(<ResumeCard />);

    expect(screen.getByText("Résumé")).toBeInTheDocument();
  });

  it("should have link to resume", () => {
    render(<ResumeCard />);

    const link = screen.getByTitle("View my résumé");
    expect(link).toHaveAttribute("href", "https://dulapahv.dev/resume");
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("should render resume header icon", () => {
    render(<ResumeCard />);

    const link = screen.getByTitle("View my résumé");
    expect(link).toBeInTheDocument();
  });

  it("should handle mouse move events", () => {
    const { container } = render(<ResumeCard />);

    const interactiveArea = container.querySelector(".cursor-crosshair");
    expect(interactiveArea).toBeInTheDocument();

    if (interactiveArea) {
      fireEvent.mouseMove(interactiveArea, { clientX: 100, clientY: 100 });
    }
  });

  it("should handle mouse leave events", () => {
    const { container } = render(<ResumeCard />);

    const interactiveArea = container.querySelector(".cursor-crosshair");
    expect(interactiveArea).toBeInTheDocument();

    if (interactiveArea) {
      fireEvent.mouseMove(interactiveArea, { clientX: 100, clientY: 100 });
      fireEvent.mouseLeave(interactiveArea);
    }
  });

  it("should render document visualization", () => {
    const { container } = render(<ResumeCard />);

    const documentElement = container.querySelector('[style*="rotateX"]');
    expect(documentElement).toBeInTheDocument();
  });

  it("should render decorative lines", () => {
    const { container } = render(<ResumeCard />);

    const lines = container.querySelectorAll(".h-0\\.5");
    expect(lines.length).toBe(6);
  });

  it("should match snapshot", () => {
    const { container } = render(<ResumeCard />);
    expect(container).toMatchSnapshot();
  });
});
