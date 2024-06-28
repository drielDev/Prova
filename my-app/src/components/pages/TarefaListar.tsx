import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Tarefa } from "../../models/Tarefa";

function TarefaListar() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  useEffect(() => {
    carregarTarefas();
  }, []);

  function carregarTarefas() {
    fetch("http://localhost:5206/tarefa/listar")
      .then((resposta) => {
        if (!resposta.ok) {
          throw new Error(`HTTP error! status: ${resposta.status}`);
        }
        return resposta.json();
      })
      .then((tarefas: Tarefa[]) => {
        console.table(tarefas);
        setTarefas(tarefas);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <div>
      <h1>Listar Tarefas</h1>
      <table border={1}>
        <thead>
          <tr>
            <th>#</th>
            <th>titulo</th>
            <th>Descrição</th>
            <th>criado em</th>
            <th>categoria</th>
            <th>categoria id</th>
            <th>status</th>
          </tr>
        </thead>
        <tbody>
          {tarefas.map((tarefa) => (
            <tr key={tarefa.TarefaId}>
              <td>{tarefa.titulo}</td>
              <td>{tarefa.descricao}</td>
              <td>{tarefa.CriadoEm}</td>
              <td>{tarefa.Categoria}</td>
              <td>{tarefa.CategoriaId}</td>
              <td>{tarefa.Status}</td>
              <td>
              </td>
              <td>
                <Link to={`/pages/tarefa/alterar/${tarefa.TarefaId}`}>
                  Alterar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TarefaListar;

export {};
