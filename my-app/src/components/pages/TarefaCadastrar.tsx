import { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";


function TarefaAlterar() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    carregarCategorias();
    carregarTarefa();
  }, [id]);

  function carregarCategorias() {
    fetch("http://localhost:5225/api/categoria/listar")
      .then((resposta) => resposta.json())
      .then((categorias: Categoria[]) => {
        setCategorias(categorias);
      })
      .catch((error) => {
        console.error("Erro ao carregar categorias:", error);
      });
  }

  function carregarTarefa() {
    fetch(`http://localhost:5225/api/tarefa/${id}`)
      .then((resposta) => resposta.json())
      .then((tarefa: Tarefa) => {
        setTitulo(tarefa.titulo);
        setDescricao(tarefa.descricao);
        setCategoriaId(tarefa.CategoriaId ?? "");
        setStatus(tarefa.Status);
      })
      .catch((error) => {
        console.error("Erro ao carregar tarefa:", error);
      });
  }

  function alterarTarefa(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const tarefaAtualizada: Tarefa = {
      TarefaId: id,
      titulo: titulo,
      descricao: descricao,
      CategoriaId: categoriaId,
      Status: status,
    };

    fetch("http://localhost:5225/api/tarefa/alterar", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tarefaAtualizada),
    })
      .then((resposta) => {
        if (!resposta.ok) {
          throw new Error("Erro ao alterar tarefa");
        }
        return resposta.json();
      })
      .then((tarefa: Tarefa) => {
        navigate("/pages/tarefa/listar");
      })
      .catch((error) => {
        console.error("Erro ao alterar tarefa:", error);
      });
  }

  return (
    <div>
      <h1>Alterar Tarefa</h1>
      <form onSubmit={alterarTarefa}>
        <label>Título:</label>
        <input
          type="text"
          placeholder="Digite o título"
          value={titulo}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitulo(e.target.value)}
          required
        />
        <br />
        <label>Descrição:</label>
        <input
          type="text"
          placeholder="Digite a descrição"
          value={descricao}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescricao(e.target.value)}
        />
        <br />
        <label>Categoria:</label>
        <select value={categoriaId} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCategoriaId(e.target.value)}>
          {categorias.map((categoria) => (
            <option value={categoria.CategoriaId} key={categoria.CategoriaId}>
              {categoria.nome}
            </option>
          ))}
        </select>
        <br />
        <label>Status:</label>
        <input
          type="text"
          placeholder="Digite o status"
          value={status}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStatus(e.target.value)}
        />
        <br />
        <button type="submit">Alterar</button>
      </form>
    </div>
  );
}

export default TarefaAlterar;

// Definição das interfaces Tarefa e Categoria

export interface Tarefa {
  TarefaId?: string;
  titulo: string;
  descricao: string;
  CriadoEm?: number;
  CategoriaId?: string;
  Status: string;
}

export interface Categoria {
  CategoriaId?: string;
  nome: string;
  CriadoEm?: number;
}
