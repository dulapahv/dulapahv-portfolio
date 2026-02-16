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

vi.mock("node:fs/promises", () => {
  const readFile = vi.fn().mockImplementation((filePath: string) => {
    if (typeof filePath === "string" && filePath.includes("test-blog")) {
      return Promise.resolve(
        "---\ntitle: Test Blog\n---\n\nThis is blog content."
      );
    }
    if (typeof filePath === "string" && filePath.includes("test-project")) {
      return Promise.resolve(
        "---\ntitle: Test Project\n---\n\nThis is project content."
      );
    }
    return Promise.reject(new Error("File not found"));
  });
  return { readFile, default: { readFile } };
});

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

  it("should contain MDX content from files", async () => {
    const response = await GET();
    const body = await response.text();

    expect(body).toContain("This is blog content.");
    expect(body).toContain("This is project content.");
  });

  it("should handle file read errors gracefully", async () => {
    const fsPromises = await import("node:fs/promises");
    const mockedReadFile = vi.mocked(fsPromises.readFile);
    mockedReadFile.mockRejectedValueOnce(new Error("File not found"));
    mockedReadFile.mockRejectedValueOnce(new Error("File not found"));

    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {
        // Intentionally empty to suppress console.error in tests
      });
    const response = await GET();
    expect(response).toBeInstanceOf(Response);
    expect(response.headers.get("Content-Type")).toBe(
      "text/plain; charset=utf-8"
    );
    consoleErrorSpy.mockRestore();
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
