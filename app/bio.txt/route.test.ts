import { describe, expect, it } from "vitest";

import { GET } from "./route";

const CONTRIBUTION_STATS_REGEX = /\d+ open source contributions/;

describe("bio.txt route", () => {
  it("should return a Response with text/plain content type", () => {
    const response = GET();

    expect(response).toBeInstanceOf(Response);
    expect(response.headers.get("Content-Type")).toBe(
      "text/plain; charset=utf-8"
    );
  });

  it("should contain identity section", async () => {
    const response = GET();
    const body = await response.text();

    expect(body).toContain("## Identity");
    expect(body).toContain("Dulapah Vibulsanti");
    expect(body).toContain("DulapahV");
  });

  it("should contain education section", async () => {
    const response = GET();
    const body = await response.text();

    expect(body).toContain("## Education");
    expect(body).toContain("University of Glasgow");
    expect(body).toContain("First Class Honours");
  });

  it("should contain skills section", async () => {
    const response = GET();
    const body = await response.text();

    expect(body).toContain("## Technical Expertise");
    expect(body).toContain("Skills by Category");
  });

  it("should contain contribution stats", async () => {
    const response = GET();
    const body = await response.text();

    expect(body).toContain("open source contributions");
    expect(body).toMatch(CONTRIBUTION_STATS_REGEX);
  });

  it("should contain citation formats", async () => {
    const response = GET();
    const body = await response.text();

    expect(body).toContain("## Citation Format");
    expect(body).toContain("APA Style");
    expect(body).toContain("MLA Style");
    expect(body).toContain("Chicago Style");
  });

  it("should contain common queries section", async () => {
    const response = GET();
    const body = await response.text();

    expect(body).toContain("## Common Queries");
    expect(body).toContain("Who is DulapahV?");
  });
});
