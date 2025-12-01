'use server';

export interface SpotifyArtist {
  id: string;
  name: string;
  images: { url: string; height: number | null; width: number | null }[];
  external_urls: { spotify: string };
}

export interface SpotifyTrack {
  id: string;
  name: string;
  artists: { name: string; id: string; external_urls: { spotify: string } }[];
  album: {
    name: string;
    images: { url: string; height: number | null; width: number | null }[];
    external_urls: { spotify: string };
  };
  external_urls: { spotify: string };
}

export interface CurrentlyPlaying {
  is_playing: boolean;
  item: SpotifyTrack | null;
  progress_ms: number | null;
}

interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
}

// Refresh the Spotify access token
async function refreshAccessToken(): Promise<string> {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error('Missing Spotify credentials');
  }

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    })
  });

  if (!response.ok) {
    throw new Error('Failed to refresh access token');
  }

  const data: SpotifyTokenResponse = await response.json();
  return data.access_token;
}

// Fetch data from Spotify with automatic token refresh
async function fetchSpotifyData<T>(endpoint: string): Promise<T> {
  let accessToken = process.env.SPOTIFY_ACCESS_TOKEN;

  if (!accessToken) {
    accessToken = await refreshAccessToken();
  }

  let response = await fetch(`https://api.spotify.com/v1${endpoint}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    next: { revalidate: 3600 } // Cache for 1 hour
  });

  // If token expired, refresh and retry
  if (response.status === 401) {
    accessToken = await refreshAccessToken();
    response = await fetch(`https://api.spotify.com/v1${endpoint}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      next: { revalidate: 3600 }
    });
  }

  if (!response.ok) {
    throw new Error(`Spotify API error: ${response.statusText}`);
  }

  return response.json();
}

// Get top artists
export async function getTopArtists(limit = 5): Promise<SpotifyArtist[]> {
  try {
    const data = await fetchSpotifyData<{ items: SpotifyArtist[] }>(
      `/me/top/artists?time_range=short_term&limit=${limit}`
    );
    return data.items;
  } catch (error) {
    console.error('Error fetching top artists:', error);
    return [];
  }
}

// Get top tracks
export async function getTopTracks(limit = 5): Promise<SpotifyTrack[]> {
  try {
    const data = await fetchSpotifyData<{ items: SpotifyTrack[] }>(
      `/me/top/tracks?time_range=short_term&limit=${limit}`
    );
    return data.items;
  } catch (error) {
    console.error('Error fetching top tracks:', error);
    return [];
  }
}

// Get currently playing track
// Note: Requires 'user-read-currently-playing' or 'user-read-playback-state' scope
export async function getCurrentlyPlaying(): Promise<CurrentlyPlaying | null> {
  try {
    let accessToken = process.env.SPOTIFY_ACCESS_TOKEN;

    if (!accessToken) {
      console.warn('No SPOTIFY_ACCESS_TOKEN found, attempting to refresh...');
      accessToken = await refreshAccessToken();
    }

    let response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      next: { revalidate: 0 } // Don't cache, we want real-time data
    });

    // If token expired, refresh and retry
    if (response.status === 401) {
      console.warn('Access token expired, refreshing...');
      try {
        accessToken = await refreshAccessToken();
        response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          },
          next: { revalidate: 0 }
        });
      } catch (refreshError) {
        console.error('Failed to refresh token for currently playing:', refreshError);
        return null;
      }
    }

    // 204 means no content (nothing playing)
    if (response.status === 204) {
      return null;
    }

    // Still unauthorized after refresh - likely missing scope
    if (response.status === 401 || response.status === 403) {
      console.error(
        'Spotify API authorization failed. Please ensure your access token has the "user-read-currently-playing" or "user-read-playback-state" scope.'
      );
      return null;
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Spotify API error (${response.status}):`, errorText);
      return null;
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching currently playing:', error);
    return null;
  }
}
