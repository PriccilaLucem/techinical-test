// server/trpc.ts
import { inferAsyncReturnType } from '@trpc/server';
import { prisma } from './db';

export async function createContext() {
  return { prisma };
}

export type Context = inferAsyncReturnType<typeof createContext>;