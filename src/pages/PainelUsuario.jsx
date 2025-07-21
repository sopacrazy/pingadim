import React, { useEffect } from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import MinhaConta from "../components/MinhaConta";
import MeusPingadim from "../components/MeusPingadim";
import MinhasContribuicoes from "../components/MinhasContribuicoes";
import LayoutPainel from "../components/LayoutPainel";

const PainelUsuario = () => {
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const usuario = localStorage.getItem("usuario");
    if (!usuario) {
      toast({
        title: "Acesso não autorizado",
        description: "Faça login para acessar o painel.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      navigate("/login");
    }
  }, []);

  return (
    <LayoutPainel>
      <Tabs isFitted variant="enclosed" colorScheme="teal">
        <TabList mb="1em">
          <Tab>Minha conta</Tab>
          <Tab>Meus Pingadim</Tab>
          <Tab>Minhas contribuições</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <MinhaConta />
          </TabPanel>
          <TabPanel>
            <MeusPingadim />
          </TabPanel>
          <TabPanel>
            <MinhasContribuicoes />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </LayoutPainel>
  );
};

export default PainelUsuario;
