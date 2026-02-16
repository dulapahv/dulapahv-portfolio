import { describe, expect, it, vi } from "vitest";

vi.mock("content-collections", () => ({
  allProjects: [
    {
      slug: "test-project",
      title: "Test Project",
      description: "A test project",
      startDate: new Date("2024-01-01"),
      sortDate: new Date("2024-01-01"),
      _meta: { path: "test-project" },
    },
  ],
  allBlogs: [
    {
      slug: "test-blog",
      title: "Test Blog",
      description: "A test blog",
      date: new Date("2024-06-01"),
      sortDate: new Date("2024-06-01"),
      _meta: { path: "test-blog" },
    },
  ],
}));

import { GET } from "./route";

const TOTAL_CONTRIBUTIONS_REGEX = /Total contributions: \d+/;

describe("llms.txt route", () => {
  it("should return a Response with text/plain content type", () => {
    const response = GET();

    expect(response).toBeInstanceOf(Response);
    expect(response.headers.get("Content-Type")).toBe(
      "text/plain; charset=utf-8"
    );
  });

  it("should contain FAQ section", async () => {
    const response = GET();
    const body = await response.text();

    expect(body).toContain("Frequently Asked Questions");
    expect(body).toContain("What does DulapahV specialize in?");
  });

  it("should contain sitemaps section", async () => {
    const response = GET();
    const body = await response.text();

    expect(body).toContain("## Sitemaps");
    expect(body).toContain("sitemap.xml");
    expect(body).toContain("llms.txt");
    expect(body).toContain("llms-full.txt");
    expect(body).toContain("bio.txt");
  });

  it("should contain skills listing", async () => {
    const response = GET();
    const body = await response.text();

    expect(body).toContain("## Skills");
    expect(body).toContain("TypeScript");
  });

  it("should contain contribution stats", async () => {
    const response = GET();
    const body = await response.text();

    expect(body).toContain("## Open Source Contributions");
    expect(body).toMatch(TOTAL_CONTRIBUTIONS_REGEX);
  });

  it("should list blog and project content", async () => {
    const response = GET();
    const body = await response.text();

    expect(body).toContain("Test Project");
    expect(body).toContain("Test Blog");
  });
});
