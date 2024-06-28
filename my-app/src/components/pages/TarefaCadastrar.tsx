import { useEffect, useState } from "react";
import { Tarefa } from "../../models/Tarefa"; 
import { useNavigate } from "react-router-dom";
import { Categoria } from "../../models/Categoria";

function ProdutoCadastrar() {
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    carregarCategorias();
  }, []);

  function carregarCategorias() {
    //FETCH ou AXIOS
    fetch("http://localhost:5225/api/categoria/listar")
      .then((resposta) => resposta.json())
      .then((categorias: Categoria[]) => {
        setCategorias(categorias);
      });
  }

  function cadastrarTarefa(e: any) {
    const Tarefa: Tarefa = {
      titulo: titulo,
      descricao: descricao,
      CategoriaId: categoriaId,
        Status: "Não iniciada",
    };

    //FETCH ou AXIOS
    fetch("http://localhost:5225/api/produto/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Tarefa),
    })
      .then((resposta) => resposta.json())
      .then((tarefa: Tarefa) => {
        navigate("/pages/tarefa/listar");
      });
    e.preventDefault();
  }
  return (
    <div>
      <h1>Cadastrar Produto</h1>
      <form onSubmit={cadastrarTarefa}>
        <label>Nome:</label>
        <input
          type="text"
          placeholder="Digite o titulo"
          onChange={(e: any) => setTitulo(e.target.value)}
          required
        />
        <br />
        <label>Descricao:</label>
        <input
          type="text"
          placeholder="Digite o descrição"
          onChange={(e: any) => setDescricao(e.target.value)}
        />
        <br />
        <label>Categorias:</label>
        <select onChange={(e: any) => setCategoriaId(e.target.value)}>
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

export default ProdutoCadastrar;
