import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Tarefa } from "../../models/Tarefa";

function TarefaAlterar() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5206/tarefas/alterar/${id}`)
        .then((resposta) => {
          if (resposta.ok) {
            return resposta.json();
          }
          throw new Error("Falha ao buscar a tarefa");
        })
        .then((tarefa: Tarefa) => {
          setStatus(tarefa.Status);
        })
        .catch((error) => {
          console.error("Erro ao buscar a tarefa:", error);
        });
    }
  }, [id]);

  function alterarTarefa(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    let novoStatus = "";
    switch (status) {
      case "Não iniciada":
        novoStatus = "Em andamento";
        break;
      case "Em andamento":
        novoStatus = "Concluída";
        break;
      default:
        novoStatus = status;
        break;
    }

    const tarefa: Tarefa = {
      TarefaId: id,
      titulo: "", 
      descricao: "",
      Categoria: "", 
      Status: novoStatus,
    };

    fetch(`http://localhost:5206/tarefas/alterar/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tarefa),
    })
      .then((resposta) => {
        if (resposta.ok) {
          return resposta.json();
        }
        throw new Error("Falha ao alterar a tarefa");
      })
      .then((tarefa: Tarefa) => {
        navigate("/pages/tarefa/listar");
      })
      .catch((error) => {
        console.error("Erro ao alterar a tarefa:", error);
      });
  }

  return (
    <div>
      <h1>Alterar Tarefa</h1>
      <form onSubmit={alterarTarefa}>
        <label>Status:</label>
        <input
          type="text"
          value={status}
          placeholder="Digite o status"
          onChange={(e) => setStatus(e.target.value)}
          required
        />
        <br />
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default TarefaAlterar;
