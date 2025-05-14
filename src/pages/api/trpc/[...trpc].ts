
import { createNextApiHandler } from '@trpc/server/adapters/next';
import { appRouter } from '@/server/routers/_app';


const createContext = () => ({});

type Context = Awaited<ReturnType<typeof createContext>>;

export default createNextApiHandler({
  router: appRouter,
  createContext,
  
    onError({ error }) {
        if (error.code === 'INTERNAL_SERVER_ERROR') {
        console.error('Something went wrong', error);
        }
    },
});
