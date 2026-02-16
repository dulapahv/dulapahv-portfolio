import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { CameraRollCard } from "./camera-roll-card";

const CAMERA_ROLL_IMAGE_REGEX = /camera roll image/i;
const NEXT_IMAGE_REGEX = /next image/i;
const PREVIOUS_IMAGE_REGEX = /previous image/i;
const GO_TO_IMAGE_REGEX = /go to image/i;

vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    ...props
  }: {
    src: string;
    alt: string;
    [key: string]: string | boolean | number;
  }) => (
    // biome-ignore lint/performance/noImgElement: Test mock requires img element
    <img alt={alt} height={100} src={src} width={100} {...props} />
  ),
}));

vi.mock("react-medium-image-zoom", () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

describe("CameraRollCard", () => {
  const mockImages = ["image1.jpg", "image2.jpg", "image3.jpg"];

  it("should render camera roll card with title", () => {
    render(<CameraRollCard images={mockImages} />);

    expect(screen.getByText("Camera Roll")).toBeInTheDocument();
  });

  it("should display all images", () => {
    render(<CameraRollCard images={mockImages} />);

    const images = screen.getAllByAltText(CAMERA_ROLL_IMAGE_REGEX);
    expect(images).toHaveLength(mockImages.length);
  });

  it("should show empty state when no images provided", () => {
    render(<CameraRollCard images={[]} />);

    expect(screen.getByText("No images to display")).toBeInTheDocument();
  });

  it("should navigate to next image when next button is clicked", async () => {
    const { container } = render(<CameraRollCard images={mockImages} />);

    const nextButton = screen.getByRole("button", { name: NEXT_IMAGE_REGEX });

    // Check initial translateX is 0%
    const carousel = container.querySelector('[style*="translateX"]');
    expect(carousel).toHaveStyle({ transform: "translateX(-0%)" });

    await userEvent.click(nextButton);

    // After click, should move to second image
    expect(carousel).toHaveStyle({ transform: "translateX(-100%)" });
  });

  it("should navigate to previous image when previous button is clicked", async () => {
    const { container } = render(<CameraRollCard images={mockImages} />);

    const prevButton = screen.getByRole("button", {
      name: PREVIOUS_IMAGE_REGEX,
    });

    await userEvent.click(prevButton);

    // Should wrap to last image
    const carousel = container.querySelector('[style*="translateX"]');
    expect(carousel).toHaveStyle({ transform: "translateX(-200%)" });
  });

  it("should navigate to specific image when progress bar is clicked", async () => {
    const { container } = render(<CameraRollCard images={mockImages} />);

    const indicators = screen.getAllByRole("button", {
      name: GO_TO_IMAGE_REGEX,
    });
    await userEvent.click(indicators[2]);

    const carousel = container.querySelector('[style*="translateX"]');
    expect(carousel).toHaveStyle({ transform: "translateX(-200%)" });
  });

  it("should show coming soon message", () => {
    render(<CameraRollCard images={mockImages} />);

    expect(
      screen.getByText("View all photos (Coming Soon)")
    ).toBeInTheDocument();
  });
});
