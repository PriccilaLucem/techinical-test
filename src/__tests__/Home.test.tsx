import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from '@/pages/index';
import { trpc } from '@/utils/trpc';

jest.mock('@/utils/trpc', () => ({
  trpc: {
    listarItens: {
      useQuery: jest.fn(() => ({ 
        data: [], 
        refetch: jest.fn() 
      })),
    },
    criarTask: {
      useMutation: jest.fn(() => ({ 
        mutate: jest.fn(), 
        isLoading: false 
      })),
    },
    atualizarTask: {
      useMutation: jest.fn(() => ({ 
        mutate: jest.fn(), 
        isLoading: false 
      })),
    },
    deletarTask: {
      useMutation: jest.fn(() => ({ 
        mutate: jest.fn(), 
        isLoading: false 
      })),
    },
  },
}));

describe('Home Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders empty state when no tasks', () => {
    render(<Home />);
    expect(screen.getByText('Nenhuma tarefa encontrada')).toBeInTheDocument();
  });

  test('allows creating new task', async () => {
    const mockMutate = jest.fn();
    (trpc.criarTask.useMutation as jest.Mock).mockReturnValue({
      mutate: mockMutate,
      isLoading: false,
    });

    render(<Home />);

    fireEvent.change(screen.getByLabelText('Título'), {
      target: { value: 'Nova Tarefa' }
    });
    fireEvent.change(screen.getByLabelText('Descrição'), {
      target: { value: 'Descrição teste' }
    });
    fireEvent.click(screen.getByText('Adicionar Tarefa'));

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith({
        titulo: 'Nova Tarefa',
        descricao: 'Descrição teste'
      });
    });
  });

  test('displays existing tasks', () => {
    const mockData = [{
      id: 1,
      titulo: 'Tarefa Existente',
      descricao: 'Descrição existente',
      dataCriacao: new Date().toISOString()
    }];

    (trpc.listarItens.useQuery as jest.Mock).mockReturnValue({
      data: mockData,
      refetch: jest.fn()
    });

    render(<Home />);
    
    expect(screen.getByText('Tarefa Existente')).toBeInTheDocument();
    expect(screen.getByText('Descrição existente')).toBeInTheDocument();
  });
});