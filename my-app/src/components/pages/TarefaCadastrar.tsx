import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Categoria } from "../../models/Categoria";
import { Tarefa } from "../../models/Tarefa";

function TarefaCadastrar() {
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    carregarCategorias();
  }, []);

  function carregarCategorias() {
    fetch("http://localhost:5206/api/categoria/listar")
      .then((resposta) => resposta.json())
      .then((categorias: Categoria[]) => {
        setCategorias(categorias);
      })
      .catch((error) => {
        console.error("Erro ao carregar categorias:", error);
      });
  }

  function cadastrarTarefa(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const novaTarefa: Tarefa = {
      titulo: titulo,
      descricao: descricao,
      CategoriaId: categoriaId,
      Status: "Não iniciada",
    };

    fetch("http://localhost:5206/api/tarefa/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(novaTarefa),
    })
      .then((resposta) => {
        if (!resposta.ok) {
          throw new Error("Erro ao cadastrar tarefa");
        }
        return resposta.json();
      })
      .then((tarefa: Tarefa) => {
        navigate("/pages/tarefa/listar");
      })
      .catch((error) => {
        console.error("Erro ao cadastrar tarefa:", error);
      });
  }

  return (
    <div>
      <h1>Cadastrar Tarefa</h1>
      <form onSubmit={cadastrarTarefa}>
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
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default TarefaCadastrar;
