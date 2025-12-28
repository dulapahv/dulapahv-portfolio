import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  getContributionStats,
  getGitHubContributions,
} from "./gh-contributions";

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("GitHub Contributions Actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getGitHubContributions", () => {
    it("should fetch and group GitHub contributions successfully", async () => {
      const mockResponse = {
        contributions: [
          { date: "2024-01-01", count: 5, level: 2 },
          { date: "2024-01-02", count: 3, level: 1 },
          { date: "2024-01-08", count: 8, level: 3 }, // New week (Sunday)
        ],
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await getGitHubContributions("testuser");

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].days).toBeDefined();
    });

    it("should return empty array on API error", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

      const result = await getGitHubContributions("testuser");

      expect(result).toEqual([]);
    });

    it("should handle network errors", async () => {
      mockFetch.mockRejectedValueOnce(new Error("Network error"));

      const result = await getGitHubContributions("testuser");

      expect(result).toEqual([]);
    });

    it("should group contributions into weeks correctly", async () => {
      const mockResponse = {
        contributions: [
          { date: "2024-01-07", count: 1, level: 1 }, // Sunday
          { date: "2024-01-08", count: 2, level: 1 }, // Monday
          { date: "2024-01-14", count: 3, level: 2 }, // Sunday - new week
        ],
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await getGitHubContributions("testuser");

      expect(result.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe("getContributionStats", () => {
    it("should calculate contribution statistics", async () => {
      const mockResponse = {
        total: {
          lastYear: 250,
        },
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const stats = await getContributionStats("testuser");

      expect(stats.totalContributions).toBe(250);
      expect(stats.currentYear).toBe("the last year");
    });

    it("should handle missing total", async () => {
      const mockResponse = {
        contributions: [],
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const stats = await getContributionStats("testuser");

      expect(stats.totalContributions).toBe(0);
    });

    it("should return zero stats on error", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
      });

      const stats = await getContributionStats("testuser");

      expect(stats.totalContributions).toBe(0);
      expect(stats.currentYear).toBe("the last year");
    });
  });
});
