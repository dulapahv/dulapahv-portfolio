const vercelToken = process.env.VERCEL_TOKEN;
const edgeConfigId = process.env.EDGE_CONFIG_ID;

if (!vercelToken || !edgeConfigId) {
  throw new Error('Missing Vercel Token, or Edge Config ID');
}

export const updateEdgeConfig = async (
  key: string,
  value: number | object | string,
): Promise<void> => {
  const endpoint = new URL(
    `/v1/edge-config/${edgeConfigId}/items`,
    'https://api.vercel.com',
  );

  const response = await fetch(endpoint, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${vercelToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      items: [
        {
          operation: 'upsert',
          key,
          value,
        },
      ],
    }),
  });

  if (!response.ok) {
    const data = (await response.json()) as {
      error: { message: string };
    };
    throw new Error(data.error.message);
  }
};
