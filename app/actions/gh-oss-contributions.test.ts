import { beforeEach, describe, expect, it, vi } from "vitest";

import { getContributionStats, getContributions } from "./gh-oss-contributions";

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("GitHub OSS Contributions Actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.GITHUB_TOKEN = "test-github-token";
  });

  describe("getContributions", () => {
    it("should fetch OSS contributions successfully", async () => {
      const mockPRResponse = {
        items: [
          {
            title: "Test PR",
            html_url: "https://github.com/owner/repo/pull/123",
            number: 123,
            repository_url: "https://api.github.com/repos/owner/repo",
            created_at: "2024-01-01T00:00:00Z",
            state: "open",
            draft: false,
            pull_request: {
              merged_at: "2024-01-02T00:00:00Z",
            },
          },
        ],
      };

      const mockIssueResponse = {
        items: [
          {
            title: "Test Issue",
            html_url: "https://github.com/owner/repo/issues/456",
            number: 456,
            repository_url: "https://api.github.com/repos/owner/repo",
            created_at: "2024-01-02T00:00:00Z",
            state: "open",
          },
        ],
      };

      // Mock PRs fetch
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockPRResponse,
      });

      // Mock Issues fetch
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockIssueResponse,
      });

      const result = await getContributions();

      expect(result).toHaveLength(2);
      expect(result[0].type).toBe("PR");
      expect(result[0].status).toBe("MERGED");
      expect(result[1].type).toBe("ISSUE");
    });

    it("should return empty array on error", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 401,
        text: async () => "Unauthorized",
      });

      const result = await getContributions();

      expect(result).toEqual([]);
    });

    it("should filter out specified URLs", async () => {
      const mockPRResponse = {
        items: [
          {
            title: "Filtered PR",
            html_url: "https://github.com/dulapahv/Issho/issues/2", // This is in FILTERED_URLS
            number: 2,
            repository_url: "https://api.github.com/repos/dulapahv/Issho",
            created_at: "2024-01-01T00:00:00Z",
            state: "open",
            draft: false,
            pull_request: { merged_at: null },
          },
          {
            title: "Valid PR",
            html_url: "https://github.com/owner/repo/pull/123",
            number: 123,
            repository_url: "https://api.github.com/repos/owner/repo",
            created_at: "2024-01-01T00:00:00Z",
            state: "open",
            draft: false,
            pull_request: { merged_at: null },
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockPRResponse,
      });

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ items: [] }),
      });

      const result = await getContributions();

      expect(result).toHaveLength(1);
      expect(result[0].url).toBe("https://github.com/owner/repo/pull/123");
    });

    it("should handle draft PRs", async () => {
      const mockPRResponse = {
        items: [
          {
            title: "Draft PR",
            html_url: "https://github.com/owner/repo/pull/789",
            number: 789,
            repository_url: "https://api.github.com/repos/owner/repo",
            created_at: "2024-01-01T00:00:00Z",
            state: "open",
            draft: true,
            pull_request: { merged_at: null },
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockPRResponse,
      });

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ items: [] }),
      });

      const result = await getContributions();

      expect(result[0].status).toBe("DRAFT");
    });
  });

  describe("getContributionStats", () => {
    it("should calculate contribution statistics", async () => {
      const contributions = [
        {
          title: "PR 1",
          repository: "owner/repo1",
          number: 1,
          url: "url1",
          type: "PR" as const,
          status: "MERGED" as const,
          date: new Date(),
        },
        {
          title: "PR 2",
          repository: "owner/repo2",
          number: 2,
          url: "url2",
          type: "PR" as const,
          status: "OPEN" as const,
          date: new Date(),
        },
        {
          title: "Issue 1",
          repository: "owner/repo3",
          number: 3,
          url: "url3",
          type: "ISSUE" as const,
          status: "CLOSED" as const,
          date: new Date(),
        },
      ];

      const stats = await getContributionStats(contributions);

      expect(stats.total).toBe(3);
      expect(stats.merged).toBe(1);
      expect(stats.open).toBe(1);
      expect(stats.closed).toBe(1);
    });

    it("should handle empty contributions array", async () => {
      const stats = await getContributionStats([]);

      expect(stats.total).toBe(0);
      expect(stats.merged).toBe(0);
      expect(stats.open).toBe(0);
      expect(stats.closed).toBe(0);
    });
  });
});
