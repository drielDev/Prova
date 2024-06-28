import { useEffect, useState } from "react";
import { Tarefa } from "../../models/Tarefa";
import { useNavigate, useParams } from "react-router-dom";

function TarefaAlterar() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5206/tarefas/alterar/${id}`)
        .then((resposta) => resposta.json())
        .then((tarefa: Tarefa) => {
          setStatus(tarefa.Status);
        });
    }
  }, [id]);

  function alterarTarefa(e: any) {
    e.preventDefault();
    const tarefa: Tarefa = {
        titulo: "", // Provide a value for the 'titulo' property
        descricao: "", // Provide a value for the 'descricao' property
        Categoria: "", // Provide a value for the 'Categoria' property
        Status: status,
    };
    fetch(`http://localhost:5206/tarefas/alterar/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(tarefa),
    })
        .then((resposta) => resposta.json())
        .then((tarefa: Tarefa) => {
            navigate("/pages/tarefa/listar");
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
          onChange={(e: any) => setStatus(e.target.value)}
          required
        />
        <br />
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default TarefaAlterar;

export {};