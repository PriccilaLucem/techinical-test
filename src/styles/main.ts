import styled from 'styled-components';

export type Task = {
  id: number;
  titulo: string;
  descricao: string | null;
  dataCriacao: string;
};

// Componentes estilizados
export const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f0f4ff 0%, #e6f0ff 100%);
  padding: 2.5rem 1rem;
`;

export const Card = styled.div`
  max-width: 42rem;
  margin: 0 auto;
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export const Header = styled.div`
  background: linear-gradient(90deg, #2563eb 0%, #4f46e5 100%);
  padding: 1.5rem;
  color: white;
`;

export const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
`;

export const Subtitle = styled.p`
  opacity: 0.9;
`;

export const Content = styled.div`
  padding: 1.5rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  min-height: 6rem;
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
  }
`;

export const Button = styled.button<{ $isEditing?: boolean }>`
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  font-weight: 500;
  color: white;
  background: ${props => props.$isEditing ? '#eab308' : '#2563eb'};
  &:hover {
    background: ${props => props.$isEditing ? '#ca8a04' : '#1d4ed8'};
  }
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
  border: none;
  cursor: pointer;
  margin-bottom: 2rem;
`;

export const TaskList = styled.ul`
  margin-top: 1rem;
`;

export const TaskItem = styled.li`
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 0.75rem;
  transition: box-shadow 0.2s;
  &:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
`;

export const TaskTitle = styled.h3`
  font-weight: 600;
  font-size: 1.125rem;
  color: #1f2937;
`;

export const TaskDescription = styled.p<{ $empty?: boolean }>`
  font-size: 0.875rem;
  color: ${props => props.$empty ? '#9ca3af' : '#4b5563'};
  font-style: ${props => props.$empty ? 'italic' : 'normal'};
`;

export const TaskDate = styled.p`
  font-size: 0.75rem;
  color: #9ca3af;
  margin-top: 0.25rem;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

export const IconButton = styled.button<{ $color: string }>`
  padding: 0.5rem;
  color: white;
  background: ${props => props.$color};
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
  display: flex;
  align-items: center;
  justify-content: center;
`;