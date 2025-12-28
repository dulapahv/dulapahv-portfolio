import { describe, expect, it } from "vitest";

import robots from "./robots";

describe("robots", () => {
  it("should return robots configuration with wildcard user agent", () => {
    const result = robots();

    expect(result.rules).toBeDefined();

    const rules = Array.isArray(result.rules) ? result.rules[0] : result.rules;
    expect(rules.userAgent).toBe("*");
    expect(rules.allow).toBe("/");
  });

  it("should return sitemap URL", () => {
    const result = robots();

    expect(result.sitemap).toBeDefined();
    expect(typeof result.sitemap).toBe("string");
    expect(result.sitemap).toContain("/sitemap.xml");
  });

  it("should allow all paths for all user agents", () => {
    const result = robots();

    const rules = Array.isArray(result.rules) ? result.rules : [result.rules];
    const firstRule = rules[0];
    if (firstRule && "allow" in firstRule) {
      expect(firstRule.allow).toBe("/");
    }
  });

  it("should match snapshot", () => {
    const result = robots();
    expect(result).toMatchSnapshot();
  });
});
