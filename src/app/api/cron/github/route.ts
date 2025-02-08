import { Octokit } from '@octokit/rest';

import { SHORT_NAME } from '@/lib/constants';
import { updateEdgeConfig } from '@/lib/vercel';
import { parseError } from '@/utils/parse-error';

export const runtime = 'edge';

const octokit = new Octokit();

export const GET = async (): Promise<Response> => {
  try {
    const profile = await octokit.rest.users.getByUsername({
      username: SHORT_NAME,
    });

    await updateEdgeConfig('followers', profile.data.followers);

    return new Response(undefined, { status: 204 });
  } catch (error) {
    const message = parseError(error);

    console.error(message);

    return new Response(message, { status: 500 });
  }
};
