"use server";

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

const SPOTIFY_API_BASE = "https://api.spotify.com/v1";
const DEFAULT_REVALIDATE = 3600;

async function refreshAccessToken(): Promise<string> {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!(clientId && clientSecret && refreshToken)) {
    throw new Error("Missing Spotify credentials");
  }

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to refresh access token");
  }

  const data: SpotifyTokenResponse = await response.json();

  return data.access_token;
}

async function fetchWithAuth(
  url: string,
  revalidate = DEFAULT_REVALIDATE
): Promise<Response> {
  let accessToken = process.env.SPOTIFY_ACCESS_TOKEN;

  if (!accessToken) {
    accessToken = await refreshAccessToken();
  }

  let response = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
    next: { revalidate },
  });

  if (response.status === 401) {
    accessToken = await refreshAccessToken();
    response = await fetch(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
      next: { revalidate },
    });
  }

  return response;
}

async function fetchSpotifyData<T>(endpoint: string): Promise<T> {
  const response = await fetchWithAuth(`${SPOTIFY_API_BASE}${endpoint}`);

  if (!response.ok) {
    throw new Error(`Spotify API error: ${response.statusText}`);
  }

  return response.json();
}

export async function getTopArtists(limit = 5): Promise<SpotifyArtist[]> {
  try {
    const data = await fetchSpotifyData<{ items: SpotifyArtist[] }>(
      `/me/top/artists?time_range=short_term&limit=${limit}`
    );
    return data.items;
  } catch (error) {
    console.error("Error fetching top artists:", error);
    return [];
  }
}

export async function getTopTracks(limit = 5): Promise<SpotifyTrack[]> {
  try {
    const data = await fetchSpotifyData<{ items: SpotifyTrack[] }>(
      `/me/top/tracks?time_range=short_term&limit=${limit}`
    );
    return data.items;
  } catch (error) {
    console.error("Error fetching top tracks:", error);
    return [];
  }
}

export async function getCurrentlyPlaying(): Promise<CurrentlyPlaying | null> {
  try {
    const response = await fetchWithAuth(
      `${SPOTIFY_API_BASE}/me/player/currently-playing`,
      0
    );

    // 204 means nothing is playing
    if (response.status === 204) {
      return null;
    }

    if (response.status === 401 || response.status === 403) {
      console.error(
        'Spotify API authorization failed. Ensure your token has the "user-read-currently-playing" or "user-read-playback-state" scope.'
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
    console.error("Error fetching currently playing:", error);
    return null;
  }
}
