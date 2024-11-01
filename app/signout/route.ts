import { NextRequest } from 'next/server';

import { signOut } from '~/app/auth';

const handler = async (req: NextRequest) => {
  await signOut({
    redirectTo: '/',
    redirect: true,
  });
};

export const GET = handler;
export const POST = handler;
