import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import Home from "./page";

// Mock async server components
vi.mock("@/components/github-contributions-card", () => ({
  GitHubContributionsCard: () => (
    <div data-testid="github-contributions-card">GitHub Contributions</div>
  ),
}));

vi.mock("@/components/open-source-card", () => ({
  OpenSourceCard: () => <div data-testid="open-source-card">Open Source</div>,
}));

vi.mock("@/components/spotify-card", () => ({
  SpotifyCard: () => <div data-testid="spotify-card">Spotify</div>,
}));

// Mock SVG text animation to avoid jsdom SVG method errors
vi.mock("@/components/svg-text-animation", () => ({
  SvgTextAnimation: ({ children }: { children: React.ReactNode }) => (
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
