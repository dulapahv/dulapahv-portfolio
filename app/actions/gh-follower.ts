'use server';

export async function getGitHubFollowers() {
  const username = 'dulapahv';
  const url = `https://api.github.com/users/${username}`;

  const response = await fetch(url, {
    next: { revalidate: 60 }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = (await response.json()) as { followers: number };
  return data.followers;
}
