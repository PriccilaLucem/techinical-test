// utils/trpc.ts
import { createTRPCNext } from '@trpc/next';
import type { AppRouter } from '@/server/routers/_app'; 
import { httpBatchLink } from '@trpc/client';

export const trpc = createTRPCNext<AppRouter>({
  config() {
    return {
      links: [
        httpBatchLink({
          url: '/api/trpc',
        }),
      ],
    };
  },
  ssr: false,
});
