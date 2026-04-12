import { render } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import Home from "./page";

// Mock content-collections for allProjects used in page
vi.mock("content-collections", () => ({
  allProjects: [
    {
      kind: "project",
      slug: "project-1",
      title: "Test Project 1",
      description: "Description 1",
      image: "/images/project1.jpg",
      sortDate: new Date("2024-01-01"),
      startDate: new Date("2024-01-01"),
      formattedStartDate: "Jan 2024",
      formattedEndDate: "Present",
      isOngoing: true,
    },
  ],
  allBlogs: [],
}));

// Mock async server components
vi.mock(
  "@/components/github-contributions-card/github-contributions-card",
  () => ({
    GitHubContributionsCard: () => (
      <div data-testid="github-contributions-card">GitHub Contributions</div>
    ),
  })
);

vi.mock("@/components/github-contributions-card/loading", () => ({
  Loading: () => (
    <div data-testid="github-contributions-card-skeleton">Loading...</div>
  ),
}));

vi.mock("@/components/open-source-card/open-source-card", () => ({
  OpenSourceCard: () => <div data-testid="open-source-card">Open Source</div>,
}));

vi.mock("@/components/open-source-card/loading", () => ({
  Loading: () => <div data-testid="open-source-card-skeleton">Loading...</div>,
}));

vi.mock("@/components/spotify-card/spotify-card", () => ({
  SpotifyCard: () => <div data-testid="spotify-card">Spotify</div>,
}));

vi.mock("@/components/spotify-card/loading", () => ({
  Loading: () => <div data-testid="spotify-card-skeleton">Loading...</div>,
}));

// Mock SVG text animation to avoid jsdom SVG method errors
vi.mock("@/components/svg-text-animation", () => ({
  SvgTextAnimation: ({ children }: { children: ReactNode }) => (
    <div>{children}</div>
  ),
}));

// Mock Globe component to avoid WebGL/Canvas errors in jsdom
vi.mock("@/components/globe", () => ({
  Globe: () => <div data-testid="globe">Globe</div>,
}));

describe("Home Page", () => {
  it("should match snapshot", () => {
    const { container } = render(<Home />);
    expect(container).toMatchSnapshot();
  });
});
