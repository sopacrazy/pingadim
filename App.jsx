// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./src/pages/Home";
import CriarPingadim from "./src/pages/CriarPingadim";
import CriarPingadimEtapa2 from "./src/pages/CriarPingadimEtapa2";
import CriarPingadimEtapa3 from "./src/pages/CriarPingadimEtapa3";
import FinalizarPingadim from "./src/pages/FinalizarPingadim";
import Login from "./src/pages/Login";
import CriarConta from "./src/pages/CriarConta";
import PainelUsuario from "./src/pages/PainelUsuario";
import { PingadimProvider } from "./src/context/PingadimContext";
import PingadimDetalhes from "./src/pages/PingadimDetalhes";
import ContribuirPingadim from "./src/pages/ContribuirPingadim";
import PixGerado from "./src/pages/PixGerado";
import EsqueciSenha from "./src/pages/EsqueciSenha";

function App() {
  return (
    <Router>
      <PingadimProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/criar-conta" element={<CriarConta />} />
          <Route path="/painel" element={<PainelUsuario />} />
          <Route path="/criar" element={<CriarPingadim />} />
          <Route path="/criar/etapa2" element={<CriarPingadimEtapa2 />} />
          <Route path="/criar/etapa3" element={<CriarPingadimEtapa3 />} />
          <Route path="/criar/finalizar" element={<FinalizarPingadim />} />
          <Route path="/pingadim/:id" element={<PingadimDetalhes />} />
          <Route path="/pingadim/pix-gerado" element={<PixGerado />} />
          <Route path="/esqueci-senha" element={<EsqueciSenha />} />
          <Route
            path="/pingadim/:id/contribuir"
            element={<ContribuirPingadim />}
          />
        </Routes>
      </PingadimProvider>
    </Router>
  );
}

export default App;
