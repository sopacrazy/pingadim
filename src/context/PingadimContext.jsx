import React, { createContext, useContext, useState, useEffect } from "react";

// Cria o contexto
const PingadimContext = createContext();

// Hook personalizado para usar o contexto
export const usePingadim = () => useContext(PingadimContext);

// Provider que envolve as rotas de criação
export const PingadimProvider = ({ children }) => {
  const [dados, setDados] = useState(() => {
    // Recupera do localStorage se tiver
    const local = localStorage.getItem("pingadimDraft");
    return local ? JSON.parse(local) : {};
  });

  // Atualiza o localStorage sempre que dados mudam
  useEffect(() => {
    localStorage.setItem("pingadimDraft", JSON.stringify(dados));
  }, [dados]);

  // Reseta o contexto e o localStorage (depois que salva no banco)
  const resetDados = () => {
    setDados({});
    localStorage.removeItem("pingadimDraft");
  };

  return (
    <PingadimContext.Provider value={{ dados, setDados, resetDados }}>
      {children}
    </PingadimContext.Provider>
  );
};
