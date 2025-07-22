import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Topo from "../components/TopBar";
import Rodape from "../components/Footer";
import { API_URL } from "../config";

const EsqueciSenha = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  const handleEnviar = async () => {
    if (!email) {
      toast({
        title: "Informe seu e-mail.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      // Aqui vai a chamada real pro backend
      await fetch(`${API_URL}/api/auth/esqueci-senha`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      toast({
        title: "Email enviado!",
        description: "Verifique sua caixa de entrada para redefinir sua senha.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Erro ao enviar e-mail.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Topo />

      <Container maxW="md" py={20} textAlign="center">
        <VStack spacing={6}>
          <Heading>Redefina sua senha</Heading>
          <Text color="gray.600">
            Um email será enviado para redefinir sua senha
          </Text>

          <Input
            placeholder="email@email.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button colorScheme="orange" width="100%" onClick={handleEnviar}>
            Enviar
          </Button>

          <Button variant="link" mt={4} onClick={() => navigate("/login")}>
            Voltar
          </Button>
        </VStack>
      </Container>

      <Rodape />
    </>
  );
};

export default EsqueciSenha;
