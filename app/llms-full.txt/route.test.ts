import { describe, expect, it, vi } from "vitest";

vi.mock("content-collections", () => ({
  allProjects: [
    {
      kind: "project",
      slug: "test-project",
      title: "Test Project",
      description: "A test project",
      startDate: new Date("2024-01-01"),
      sortDate: new Date("2024-01-01"),
      content: "This is project content.",
      _meta: { path: "test-project" },
    },
  ],
  allBlogs: [
    {
      kind: "blog",
      slug: "test-blog",
      title: "Test Blog",
      description: "A test blog",
      date: new Date("2024-06-01"),
      sortDate: new Date("2024-06-01"),
      content: "This is blog content.",
      _meta: { path: "test-blog" },
    },
  ],
}));

import { GET } from "./route";

const TOTAL_REGEX = /Total: \d+/;
const MERGED_REGEX = /Merged: \d+/;
const CITATION_REGEX = /citation:/;

describe("llms-full.txt route", () => {
  it("should return a Response with text/plain content type", async () => {
    const response = await GET();

    expect(response).toBeInstanceOf(Response);
    expect(response.headers.get("Content-Type")).toBe(
      "text/plain; charset=utf-8"
    );
  });

  it("should contain document metadata", async () => {
    const response = await GET();
    const body = await response.text();

    expect(body).toContain("## Document Metadata");
    expect(body).toContain("@document-type: Complete Portfolio Reference");
    expect(body).toContain("@author: Dulapah Vibulsanti");
  });

  it("should contain skills section", async () => {
    const response = await GET();
    const body = await response.text();

    expect(body).toContain("SECTION: Technical Skills");
  });

  it("should contain contribution stats", async () => {
    const response = await GET();
    const body = await response.text();

    expect(body).toContain("SECTION: Open Source Contributions");
    expect(body).toMatch(TOTAL_REGEX);
    expect(body).toMatch(MERGED_REGEX);
  });

  it("should contain MDX content from items", async () => {
    const response = await GET();
    const body = await response.text();

    expect(body).toContain("This is blog content.");
    expect(body).toContain("This is project content.");
  });

  it("should contain blog post citation format", async () => {
    const response = await GET();
    const body = await response.text();

    expect(body).toContain('type: "blog"');
    expect(body).toMatch(CITATION_REGEX);
  });

  it("should contain project with dates", async () => {
    const response = await GET();
    const body = await response.text();

    expect(body).toContain('type: "project"');
    expect(body).toContain('started: "2024-01-01"');
  });
});
