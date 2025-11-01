import { beforeEach, describe, expect, it, vi } from 'vitest';

import { getGitHubFollowers } from './gh-follower';

// Mock global fetch
global.fetch = vi.fn();

describe('getGitHubFollowers', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch and return follower count successfully', async () => {
    const mockFollowers = 42;
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ followers: mockFollowers })
    });

    const result = await getGitHubFollowers();

    expect(global.fetch).toHaveBeenCalledWith('https://api.github.com/users/dulapahv', {
      next: { revalidate: 60 }
    });
    expect(result).toBe(mockFollowers);
  });

  it('should throw error when fetch fails', async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: false,
      status: 404
    });

    await expect(getGitHubFollowers()).rejects.toThrow('Failed to fetch data');
  });

  it('should handle network errors', async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error('Network error'));

    await expect(getGitHubFollowers()).rejects.toThrow('Network error');
  });

  it('should fetch with correct revalidate option', async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ followers: 100 })
    });

    await getGitHubFollowers();

    expect(global.fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        next: { revalidate: 60 }
      })
    );
  });

  it('should return zero followers if API returns zero', async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ followers: 0 })
    });

    const result = await getGitHubFollowers();
    expect(result).toBe(0);
  });

  it('should handle large follower counts', async () => {
    const largeCount = 999999;
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ followers: largeCount })
    });

    const result = await getGitHubFollowers();
    expect(result).toBe(largeCount);
  });
});
