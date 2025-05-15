import { createTestCaller } from '../__test-utils__/trpc';
import { prisma } from '@/server/db';
import * as yup from 'yup';

// Mock the Prisma client
jest.mock('@/server/db', () => ({
  prisma: {
    task: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

describe('tRPC Router Tests', () => {
  let caller: ReturnType<typeof createTestCaller>;

  beforeEach(() => {
    jest.clearAllMocks();
    caller = createTestCaller();
  });

  describe('criarTask', () => {
    it('should create a task with valid input', async () => {
      const mockTask = { id: 1, titulo: 'Test', descricao: 'Test desc', dataCriacao: new Date() };
      (prisma.task.create as jest.Mock).mockResolvedValue(mockTask);
      
      const result = await caller.criarTask({
        titulo: 'Test',
        descricao: 'Test desc'
      });
      
      expect(result).toEqual(mockTask);
      expect(prisma.task.create).toHaveBeenCalledWith({
        data: {
          titulo: 'Test',
          descricao: 'Test desc'
        }
      });
    });

    it('should throw validation error for missing title', async () => {
      await expect(caller.criarTask({
        titulo: '',
        descricao: 'Test desc'
      })).rejects.toThrow('Title is required');
    });
  });

  // ... rest of your tests
});