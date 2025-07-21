import React from "react";
import { Flex, Image, Button, Spacer } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import logo from "../img/logo.png";

const TopBar = () => {
  const navigate = useNavigate();

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
      <Button colorScheme="whiteAlpha" size="sm" onClick={handleLogout}>
        Sair
      </Button>
    </Flex>
  );
};

export default TopBar;
