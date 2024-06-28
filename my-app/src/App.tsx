import React from "react";

import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import TarefaAlterar from "./components/pages/TarefaAlterar";
import TarefaListar from "./components/pages/TarefaListar";

function App() {
  return (
    <div>
      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/pages/tarefa/listar"}>
                Listar Tarefas{" "}
              </Link>
            </li>
            <li>
              <Link to={"/pages/tarefa/cadastrar"}>
                Cadastrar Tarefas{" "}
              </Link>
            </li>
            <li>
              <Link to={"/pages/tarefa/alterar/:id"}>Atualizar Tarefa </Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<TarefaListar />} />
          <Route
            path="/pages/tarefa/listar"
            element={<TarefaListar />}
          />
          <Route
            path="/pages/tarefa/alterar/:id"
            element={<TarefaAlterar />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;