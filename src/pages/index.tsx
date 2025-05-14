import { trpc } from '@/utils/trpc';
import { useState } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import {
  Card,
  Container,
  Content,
  Header,
  Title,
  Subtitle,
  Input,
  TextArea,
  Button,
  TaskList,
  TaskItem,
  TaskTitle,
  TaskDescription,
  TaskDate,
  ActionButtons,
  IconButton
} from "@/styles/main";

type Task = {
  id: number;
  titulo: string;
  descricao: string | null;
  dataCriacao: string;
};

export default function Home() {
  const { data: itens, refetch } = trpc.listarItens.useQuery();
  const criarItem = trpc.criarTask.useMutation({ onSuccess: () => refetch() });
  const atualizarItem = trpc.atualizarTask.useMutation({ onSuccess: () => refetch() });
  const deletarItem = trpc.deletarTask.useMutation({ onSuccess: () => refetch() });

  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [editandoId, setEditandoId] = useState<number | null>(null);

  const handleSubmit = () => {
    if (editandoId) {
      atualizarItem.mutate({ id: editandoId, titulo, descricao });
      setEditandoId(null);
    } else {
      criarItem.mutate({ titulo, descricao });
    }
    setTitulo('');
    setDescricao('');
  };

  const startEdit = (item: Task) => {
    setEditandoId(item.id);
    setTitulo(item.titulo);
    setDescricao(item.descricao || '');
  };

  return (
    <Container>
      <Card>
        <Header>
          <Title>CRUD de Tarefas</Title>
          <Subtitle>Gerencie suas tarefas diárias</Subtitle>
        </Header>

        <Content>
          <div>
            <label htmlFor="titulo">Título</label>
            <Input
              id="titulo"
              type="text"
              placeholder="Digite o título da tarefa"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </div>
          
          <div>
            <label htmlFor="descricao">Descrição</label>
            <TextArea
              id="descricao"
              placeholder="Adicione detalhes sobre a tarefa"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </div>
          
          <Button 
            onClick={handleSubmit}
            $isEditing={!!editandoId}
          >
            {editandoId ? 'Atualizar Tarefa' : 'Adicionar Tarefa'}
          </Button>

          <h2>Suas Tarefas</h2>
          
          {itens?.length === 0 ? (
            <p>Nenhuma tarefa encontrada</p>
          ) : (
            <TaskList>
              {itens?.map((item: Task) => (
                <TaskItem key={item.id}>
                  <div>
                    <TaskTitle>{item.titulo}</TaskTitle>
                    <TaskDescription $empty={!item.descricao}>
                      {item.descricao || 'Sem descrição'}
                    </TaskDescription>
                    <TaskDate>
                      Criado em: {new Date(item.dataCriacao).toLocaleDateString()}
                    </TaskDate>
                  </div>
                  <ActionButtons>
                    <IconButton 
                      onClick={() => startEdit(item)}
                      $color="#eab308"
                      title="Editar"
                    >
                      <PencilIcon width={16} height={16} />
                    </IconButton>
                    <IconButton
                      onClick={() => deletarItem.mutate({ id: item.id })}
                      $color="#ef4444"
                      title="Deletar"
                    >
                      <TrashIcon width={16} height={16} />
                    </IconButton>
                  </ActionButtons>
                </TaskItem>
              ))}
            </TaskList>
          )}
        </Content>
      </Card>
    </Container>
  );
}