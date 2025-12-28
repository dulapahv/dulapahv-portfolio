import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { GitHubContributionsCard } from "./github-contributions-card";

const CONTRIBUTIONS_IN_LAST_YEAR_REGEX = /contributions in the last year/i;

vi.mock("@/app/actions/gh-contributions", () => ({
  getGitHubContributions: vi.fn().mockResolvedValue([
    {
      days: [
        { date: "2024-01-01", count: 5, level: 2 },
        { date: "2024-01-02", count: 3, level: 1 },
        null,
        null,
        null,
        null,
        null,
      ],
    },
    {
      days: [
        { date: "2024-01-08", count: 8, level: 3 },
        { date: "2024-01-09", count: 0, level: 0 },
        null,
        null,
        null,
        null,
        null,
      ],
    },
  ]),
  getContributionStats: vi.fn().mockResolvedValue({
    totalContributions: 250,
    currentYear: "the last year",
  }),
}));

describe("GitHubContributionsCard", () => {
  it("should render contributions card with title", async () => {
    const component = await GitHubContributionsCard({ username: "testuser" });
    render(component);

    expect(screen.getByText("GitHub Activity")).toBeInTheDocument();
  });

  it("should display total contributions", async () => {
    const component = await GitHubContributionsCard({ username: "testuser" });
    render(component);

    expect(screen.getByText("250")).toBeInTheDocument();
    expect(
      screen.getByText(CONTRIBUTIONS_IN_LAST_YEAR_REGEX)
    ).toBeInTheDocument();
  });

  it("should have link to GitHub profile", async () => {
    const component = await GitHubContributionsCard({ username: "testuser" });
    render(component);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "https://github.com/testuser");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("title", "View my GitHub profile");
  });

  it("should render contribution grid", async () => {
    const component = await GitHubContributionsCard({ username: "testuser" });
    const { container } = render(component);

    const grid = container.querySelector(".cursor-crosshair");
    expect(grid).toBeInTheDocument();
  });

  it("should display day labels", async () => {
    const component = await GitHubContributionsCard({ username: "testuser" });
    render(component);

    expect(screen.getByText("Mon")).toBeInTheDocument();
    expect(screen.getByText("Wed")).toBeInTheDocument();
    expect(screen.getByText("Fri")).toBeInTheDocument();
  });

  it("should display contribution level legend", async () => {
    const component = await GitHubContributionsCard({ username: "testuser" });
    render(component);

    expect(screen.getByText("Less")).toBeInTheDocument();
    expect(screen.getByText("More")).toBeInTheDocument();
  });

  it("should match snapshot", async () => {
    const component = await GitHubContributionsCard({ username: "testuser" });
    const { container } = render(component);
    expect(container).toMatchSnapshot();
  });
});
