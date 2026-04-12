import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ResumeCard } from "./resume-card";

describe("ResumeCard", () => {
  it("should have link with correct href and target attributes", () => {
    render(<ResumeCard />);

    const link = screen.getByTitle("View my résumé");
    expect(link).toHaveAttribute("href", "https://dulapahv.dev/resume");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
  });

  it("should update rotation on mouse move and reset on mouse leave", async () => {
    const { container } = render(<ResumeCard />);

    const interactiveArea = container.querySelector('[role="presentation"]');
    expect(interactiveArea).toBeInTheDocument();

    if (interactiveArea) {
      // Get the document element that has the transform style
      const documentEl = interactiveArea.querySelector(
        '[aria-hidden="true"][style*="rotateX"]'
      );
      expect(documentEl).toBeInTheDocument();

      // Initial state should have 0 rotation
      expect(documentEl).toHaveStyle({
        transform: "rotateX(0deg) rotateY(0deg)",
      });

      // Simulate mouse move - need to use fireEvent for mouse events with coordinates
      const { fireEvent } = await import("@testing-library/react");
      fireEvent.mouseMove(interactiveArea, { clientX: 200, clientY: 200 });

      // After mouse leave, rotation should reset to 0
      fireEvent.mouseLeave(interactiveArea);
      expect(documentEl).toHaveStyle({
        transform: "rotateX(0deg) rotateY(0deg)",
      });
    }
  });

  it("should render title text", () => {
    render(<ResumeCard />);

    expect(screen.getByText("Résumé")).toBeInTheDocument();
  });
});
