import { appRouter } from '../server/routers/_app';
import { prisma } from "@/server/db"

export const createTestCaller = () => {
  return appRouter.createCaller({
    prisma,
    session: null, 
  });
};

export type TestCaller = ReturnType<typeof createTestCaller>;