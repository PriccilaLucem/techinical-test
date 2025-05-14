import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { prisma } from '../db';

const t = initTRPC.create();

export const appRouter = t.router({
  // Create
  criarTask: t.procedure
    .input(z.object({
      titulo: z.string(),
      descricao: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      return await prisma.task.create({
        data: {
          titulo: input.titulo,
          descricao: input.descricao,
        },
      });
    }),

  // Read All
  listarItens: t.procedure.query(async () => {
    return await prisma.task.findMany({
      orderBy: { dataCriacao: 'desc' },
    });
  }),

  // Read by ID
  obterTask: t.procedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      return await prisma.task.findUnique({
        where: { id: input.id },
      });
    }),

  // Update
  atualizarTask: t.procedure
    .input(z.object({
      id: z.number(),
      titulo: z.string(),
      descricao: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      return await prisma.task.update({
        where: { id: input.id },
        data: {
          titulo: input.titulo,
          descricao: input.descricao,
        },
      });
    }),

  // Delete
  deletarTask: t.procedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      return await prisma.task.delete({
        where: { id: input.id },
      });
    }),
});

export type AppRouter = typeof appRouter;
