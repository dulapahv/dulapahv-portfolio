import { describe, expect, it } from "vitest";

import {
  contributionsData,
  getContributionStats,
  getContributionsByYear,
} from "./contributions";

describe("Contributions Module", () => {
  describe("contributionsData", () => {
    it("should export contributions data array", () => {
      expect(Array.isArray(contributionsData)).toBe(true);
      expect(contributionsData.length).toBeGreaterThan(0);
    });

    it("should have valid contribution structure", () => {
      const contribution = contributionsData[0];
      expect(contribution).toHaveProperty("title");
      expect(contribution).toHaveProperty("repository");
      expect(contribution).toHaveProperty("number");
      expect(contribution).toHaveProperty("url");
      expect(contribution).toHaveProperty("date");
      expect(contribution).toHaveProperty("status");
      expect(contribution).toHaveProperty("type");
    });

    it("should have valid contribution types", () => {
      for (const contribution of contributionsData) {
        expect(["PR", "ISSUE"]).toContain(contribution.type);
      }
    });

    it("should have valid contribution statuses", () => {
      for (const contribution of contributionsData) {
        expect(["MERGED", "OPEN", "CLOSED", "DRAFT"]).toContain(
          contribution.status
        );
      }
    });
  });

  describe("getContributionsByYear", () => {
    it("should group contributions by year", () => {
      const result = getContributionsByYear();

      expect(typeof result).toBe("object");
      expect(Object.keys(result).length).toBeGreaterThan(0);
    });

    it("should return contributions sorted by date (newest first)", () => {
      const result = getContributionsByYear();
      const allYears = Object.keys(result).map(Number);
      const firstYear = allYears[0];
      const contributionsInYear = result[firstYear];

      if (contributionsInYear.length > 1) {
        for (let i = 0; i < contributionsInYear.length - 1; i++) {
          expect(contributionsInYear[i].date.getTime()).toBeGreaterThanOrEqual(
            contributionsInYear[i + 1].date.getTime()
          );
        }
      }
    });

    it("should group all contributions correctly", () => {
      const result = getContributionsByYear();
      const totalContributions = Object.values(result).reduce(
        (sum, contributions) => sum + contributions.length,
        0
      );

      expect(totalContributions).toBe(contributionsData.length);
    });

    it("should have date instances for each contribution", () => {
      const result = getContributionsByYear();
      for (const yearContributions of Object.values(result)) {
        for (const contribution of yearContributions) {
          expect(contribution.date).toBeInstanceOf(Date);
        }
      }
    });
  });

  describe("getContributionStats", () => {
    it("should calculate total contributions", () => {
      const stats = getContributionStats();

      expect(stats.total).toBe(contributionsData.length);
      expect(stats.total).toBeGreaterThan(0);
    });

    it("should count merged contributions", () => {
      const stats = getContributionStats();
      const expectedMerged = contributionsData.filter(
        (c) => c.status === "MERGED"
      ).length;

      expect(stats.merged).toBe(expectedMerged);
    });

    it("should count open contributions", () => {
      const stats = getContributionStats();
      const expectedOpen = contributionsData.filter(
        (c) => c.status === "OPEN"
      ).length;

      expect(stats.open).toBe(expectedOpen);
    });

    it("should count closed contributions", () => {
      const stats = getContributionStats();
      const expectedClosed = contributionsData.filter(
        (c) => c.status === "CLOSED"
      ).length;

      expect(stats.closed).toBe(expectedClosed);
    });

    it("should have stats that sum to total", () => {
      const stats = getContributionStats();

      expect(stats.merged + stats.open + stats.closed).toBeLessThanOrEqual(
        stats.total
      );
    });
  });
});
