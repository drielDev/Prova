import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Tarefa } from "../../models/Tarefa";

function TarefaListar() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    carregarTarefas();
  }, []);

  function carregarTarefas() {
    fetch("http://localhost:5206/tarefas/listar")
      .then((resposta) => {
        if (resposta.ok) {
          return resposta.json();
        }
        throw new Error("Falha ao carregar as tarefas");
      })
      .then((data: Tarefa[]) => {
        console.table(data);
        setTarefas(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao carregar tarefas:", error);
        setLoading(false);
      });
  }

  return (
    <div>
      <h1>Listar Tarefas</h1>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <table className="tabela-tarefas">
          <thead>
            <tr>
              <th>#</th>
              <th>Título</th>
              <th>Descrição</th>
              <th>Criado em</th>
              <th>Categoria</th>
              <th>Categoria ID</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {tarefas.map((tarefa, index) => (
              <tr key={tarefa.TarefaId}>
                <td>{index + 1}</td>
                <td>{tarefa.titulo}</td>
                <td>{tarefa.descricao}</td>
                <td>{tarefa.CriadoEm}</td>
                <td>{tarefa.CategoriaId}</td>
                <td>{tarefa.Status}</td>
                <td>
                  <Link to={`/pages/tarefa/alterar/${tarefa.TarefaId}`}>
                    Alterar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TarefaListar;

