import React from "react";
import { Flex, Image, Button, Spacer, HStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import logo from "../img/logo.png";

const TopBar = () => {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Flex
      p={4}
      bg="teal.500"
      color="white"
      align="center"
      position="sticky"
      top="0"
      zIndex="1000"
      boxShadow="md"
    >
      <Image
        src={logo}
        alt="Pingadim"
        height="30px"
        cursor="pointer"
        onClick={() => navigate("/")}
      />
      <Spacer />
      {usuario ? (
        <HStack spacing={3}>
          <Button
            colorScheme="whiteAlpha"
            size="sm"
            onClick={() => navigate("/criar")}
          >
            Criar Pingadim
          </Button>

          <Button colorScheme="whiteAlpha" size="sm" onClick={handleLogout}>
            Sair
          </Button>
        </HStack>
      ) : (
        <Button
          colorScheme="whiteAlpha"
          size="sm"
          variant="outline"
          onClick={() =>
            navigate("/login", { state: { from: window.location.pathname } })
          }
        >
          Entrar
        </Button>
      )}
    </Flex>
  );
};

export default TopBar;
