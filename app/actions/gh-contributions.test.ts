import { beforeEach, describe, expect, it, vi } from "vitest";

import { getGitHubContributionsData } from "./gh-contributions";

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("getGitHubContributionsData", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns weeks and stats from a single fetch", async () => {
    const mockResponse = {
      contributions: [
        { date: "2024-01-01", count: 5, level: 2 },
        { date: "2024-01-02", count: 3, level: 1 },
        { date: "2024-01-08", count: 8, level: 3 },
      ],
      total: { lastYear: 250 },
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await getGitHubContributionsData("testuser");

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(result.weeks.length).toBeGreaterThan(0);
    expect(result.weeks[0].days).toBeDefined();
    expect(result.totalContributions).toBe(250);
    expect(result.currentYear).toBe("the last year");
  });

  it("groups contributions into weeks correctly", async () => {
    const mockResponse = {
      contributions: [
        { date: "2024-01-07", count: 1, level: 1 }, // Sunday
        { date: "2024-01-08", count: 2, level: 1 }, // Monday
        { date: "2024-01-14", count: 3, level: 2 }, // Sunday - new week
      ],
      total: { lastYear: 6 },
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await getGitHubContributionsData("testuser");

    expect(result.weeks.length).toBeGreaterThanOrEqual(1);
  });

  it("handles missing total field", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ contributions: [] }),
    });

    const result = await getGitHubContributionsData("testuser");

    expect(result.totalContributions).toBe(0);
    expect(result.weeks).toEqual([]);
  });

  it("returns empty data on API error", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    const result = await getGitHubContributionsData("testuser");

    expect(result.weeks).toEqual([]);
    expect(result.totalContributions).toBe(0);
    expect(result.currentYear).toBe("the last year");
  });

  it("returns empty data on network error", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network error"));

    const result = await getGitHubContributionsData("testuser");

    expect(result.weeks).toEqual([]);
    expect(result.totalContributions).toBe(0);
  });

  it("rejects invalid usernames without fetching", async () => {
    const result = await getGitHubContributionsData("invalid--user");

    expect(mockFetch).not.toHaveBeenCalled();
    expect(result.weeks).toEqual([]);
    expect(result.totalContributions).toBe(0);
  });
});
