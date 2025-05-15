import { initTRPC } from '@trpc/server';
import * as yup from 'yup';
import { prisma } from '../db';

const t = initTRPC.create();

export const appRouter = t.router({
  // Create
  criarTask: t.procedure
    .input(
      yup.object({
        titulo: yup.string().required('Title is required'),
        descricao: yup.string().optional(),
      })
    )
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
    .input(
      yup.object({
        id: yup.number().required('ID is required'),
      })
    )
    .query(async ({ input }) => {
      return await prisma.task.findUnique({
        where: { id: input.id },
      });
    }),

  // Update
  atualizarTask: t.procedure
    .input(
      yup.object({
        id: yup.number().required('ID is required'),
        titulo: yup.string().required('Title is required'),
        descricao: yup.string().optional(),
      })
    )
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
    .input(
      yup.object({
        id: yup.number().required('ID is required'),
      })
    )
    .mutation(async ({ input }) => {
      return await prisma.task.delete({
        where: { id: input.id },
      });
    }),
});

export type AppRouter = typeof appRouter;