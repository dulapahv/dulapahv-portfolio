import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import type { ProjectCardItem } from "./projects-card";
import { ProjectsCard } from "./projects-card";

const NEXT_PROJECT_REGEX = /next project/i;
const PREVIOUS_PROJECT_REGEX = /previous project/i;
const GO_TO_PROJECT_REGEX = /go to project/i;
const TEST_PROJECT_REGEX = /test project/i;

const mockProjects: ProjectCardItem[] = [
  {
    slug: "project-1",
    title: "Test Project 1",
    description: "Description for project 1",
    image: "/images/project1.jpg",
    formattedStartDate: "Jan 2024",
    formattedEndDate: "Present",
    isOngoing: true,
  },
  {
    slug: "project-2",
    title: "Test Project 2",
    description: "Description for project 2",
    image: "/images/project2.jpg",
    formattedStartDate: "Jan 2023",
    formattedEndDate: "Dec 2023",
    isOngoing: false,
  },
  {
    slug: "project-3",
    title: "Test Project 3",
    description: "Description for project 3",
    image: "/images/project3.jpg",
    formattedStartDate: "Jan 2022",
    formattedEndDate: "Dec 2022",
    isOngoing: false,
  },
];

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

describe("ProjectsCard", () => {
  it("should render projects card with title", () => {
    render(<ProjectsCard projects={mockProjects} />);

    expect(screen.getByText("Recent Projects")).toBeInTheDocument();
  });

  it("should display the first project by default", () => {
    render(<ProjectsCard projects={mockProjects} />);

    expect(screen.getByText("Test Project 1")).toBeInTheDocument();
    expect(screen.getByText("Description for project 1")).toBeInTheDocument();
  });

  it("should navigate to next project when next button is clicked", async () => {
    render(<ProjectsCard projects={mockProjects} />);

    const nextButton = screen.getByRole("button", { name: NEXT_PROJECT_REGEX });
    await userEvent.click(nextButton);

    expect(screen.getByText("Test Project 2")).toBeInTheDocument();
  });

  it("should navigate to previous project when previous button is clicked", async () => {
    render(<ProjectsCard projects={mockProjects} />);

    const prevButton = screen.getByRole("button", {
      name: PREVIOUS_PROJECT_REGEX,
    });
    await userEvent.click(prevButton);

    expect(screen.getByText("Test Project 3")).toBeInTheDocument();
  });

  it("should navigate to specific project when dot indicator is clicked", async () => {
    render(<ProjectsCard projects={mockProjects} />);

    const dotIndicators = screen.getAllByRole("button", {
      name: GO_TO_PROJECT_REGEX,
    });
    await userEvent.click(dotIndicators[1]);

    expect(screen.getByText("Test Project 2")).toBeInTheDocument();
  });

  it("should show ongoing badge for ongoing projects", () => {
    render(<ProjectsCard projects={mockProjects} />);

    expect(screen.getByText("Ongoing")).toBeInTheDocument();
  });

  it("should have link to view all projects", () => {
    render(<ProjectsCard projects={mockProjects} />);

    const link = screen.getByTitle("View all projects");
    expect(link).toHaveAttribute("href", "/project");
  });

  it("should have links to individual projects", () => {
    render(<ProjectsCard projects={mockProjects} />);

    const links = screen.getAllByRole("link", { name: TEST_PROJECT_REGEX });
    expect(links.length).toBeGreaterThan(0);
    expect(links[0]).toHaveAttribute(
      "href",
      expect.stringContaining("/project/")
    );
  });
});
