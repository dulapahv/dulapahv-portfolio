import { beforeEach, describe, expect, it, vi } from 'vitest';

import { getCurrentlyPlaying, getTopArtists, getTopTracks } from './Spotify';

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('Spotify API Actions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.SPOTIFY_CLIENT_ID = 'test-client-id';
    process.env.SPOTIFY_CLIENT_SECRET = 'test-client-secret';
    process.env.SPOTIFY_REFRESH_TOKEN = 'test-refresh-token';
    process.env.SPOTIFY_ACCESS_TOKEN = 'test-access-token';
  });

  describe('getTopArtists', () => {
    it('should return top artists', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          items: [
            {
              id: '1',
              name: 'Artist 1',
              external_urls: { spotify: 'url1' },
              images: [{ url: 'img1.jpg', height: 640, width: 640 }]
            },
            {
              id: '2',
              name: 'Artist 2',
              external_urls: { spotify: 'url2' },
              images: [{ url: 'img2.jpg', height: 640, width: 640 }]
            }
          ]
        })
      });

      const result = await getTopArtists(2);

      expect(result).toHaveLength(2);
      expect(result[0].name).toBe('Artist 1');
    });

    it('should return empty array on error', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        statusText: 'Unauthorized'
      });

      const result = await getTopArtists(5);

      expect(result).toEqual([]);
    });

    it('should refresh token on 401', async () => {
      // First request fails with 401
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 401
      });

      // Token refresh succeeds
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ access_token: 'new-token' })
      });

      // Retry succeeds
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ items: [] })
      });

      await getTopArtists(5);

      expect(mockFetch).toHaveBeenCalledTimes(3);
    });
  });

  describe('getTopTracks', () => {
    it('should return top tracks', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          items: [
            {
              id: '1',
              name: 'Track 1',
              artists: [{ id: 'a1', name: 'Artist 1', external_urls: { spotify: 'url' } }],
              album: {
                name: 'Album 1',
                images: [{ url: 'img1.jpg', height: 640, width: 640 }],
                external_urls: { spotify: 'album-url' }
              },
              external_urls: { spotify: 'track-url1' }
            }
          ]
        })
      });

      const result = await getTopTracks(1);

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Track 1');
    });

    it('should return empty array on error', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        statusText: 'Forbidden'
      });

      const result = await getTopTracks(5);

      expect(result).toEqual([]);
    });
  });

  describe('getCurrentlyPlaying', () => {
    it('should return currently playing track when available', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          is_playing: true,
          item: {
            id: '1',
            name: 'Test Song',
            artists: [{ id: 'a1', name: 'Test Artist', external_urls: { spotify: 'url' } }],
            album: {
              name: 'Test Album',
              images: [{ url: 'test.jpg', height: 640, width: 640 }],
              external_urls: { spotify: 'album-url' }
            },
            external_urls: { spotify: 'track-url' }
          },
          progress_ms: 120000
        })
      });

      const result = await getCurrentlyPlaying();

      expect(result).toBeDefined();
      expect(result?.is_playing).toBe(true);
      expect(result?.item?.name).toBe('Test Song');
    });

    it('should return null when nothing is playing (204)', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 204
      });

      const result = await getCurrentlyPlaying();

      expect(result).toBeNull();
    });

    it('should handle API errors gracefully', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        text: async () => 'Internal Server Error'
      });

      const result = await getCurrentlyPlaying();

      expect(result).toBeNull();
    });

    it('should refresh token on 401 and retry', async () => {
      // First request fails with 401
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 401
      });

      // Token refresh succeeds
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ access_token: 'new-token' })
      });

      // Retry succeeds
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          is_playing: false,
          item: null,
          progress_ms: null
        })
      });

      const result = await getCurrentlyPlaying();

      expect(mockFetch).toHaveBeenCalledTimes(3);
      expect(result?.is_playing).toBe(false);
    });

    it('should return null on 403 (missing scope)', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 403,
        text: async () => 'Forbidden'
      });

      const result = await getCurrentlyPlaying();

      expect(result).toBeNull();
    });
  });
});
