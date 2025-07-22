import React, { useState } from "react";
import {
  Box,
  Container,
  Heading,
  VStack,
  Text,
  Button,
  HStack,
  useToast,
  Image,
  Flex,
} from "@chakra-ui/react";
import { FaUser, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { usePingadim } from "../context/PingadimContext"; // 👈 importa o contexto
import { API_URL } from "../config"; // ou ajuste o caminho conforme o local

const FinalizarPingadim = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [destinatario, setDestinatario] = useState("voce");
  const { dados, setDados, resetDados } = usePingadim(); // 👈 pega contexto

  const handlePublicar = async () => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const linkCompleto = `https://www.pingadim.com/vaquinha/${dados.link_personalizado}`;

    const payload = {
      ...dados,
      quem_recebe: destinatario,
      link_personalizado: linkCompleto,
      criado_por: usuario?.id || 0,
      imagem: dados.imagem || "",
      cidade: dados.cidade || "Belém",
      estado: dados.estado || "PA",
      categoria: dados.categoria || "Outros",
    };

    // ✅ Validação simples
    const camposObrigatorios = [
      { campo: payload.titulo, nome: "Título" },
      { campo: payload.descricao, nome: "Descrição" },
      { campo: payload.link_personalizado, nome: "Link Personalizado" },
      { campo: payload.valor_meta, nome: "Valor da Meta" },
      { campo: payload.criado_por, nome: "Criado Por" },
      { campo: payload.categoria, nome: "Categoria" },
    ];

    const campoVazio = camposObrigatorios.find((item) => !item.campo);

    if (campoVazio) {
      toast({
        title: "Campo obrigatório não preenchido!",
        description: `Preencha o campo: ${campoVazio.nome}`,
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/pingadinhos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.message || "Erro ao salvar");

      toast({
        title: "Pingadim criado com sucesso! 🎉",
        description: "Seu link está pronto pra receber contribuições!",
        status: "success",
        duration: 4000,
        isClosable: true,
      });

      resetDados();
      navigate("/painel");
    } catch (err) {
      toast({
        title: "Erro",
        description: err.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Flex
        h="72px"
        p={4}
        bg="white"
        color="gray.800"
        align="center"
        position="sticky"
        top="0"
        zIndex="1000"
      >
        <Image
          src="/src/img/logo2.png"
          alt="Pingadim"
          height="30px"
          cursor="pointer"
          onClick={() => navigate("/")}
        />
      </Flex>

      <Box
        bg="gray.50"
        h="calc(100vh - 65px)"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Container maxW="4xl">
          <VStack spacing={6} align="start">
            <Heading color="teal.600">Último passo!</Heading>
            <Text fontSize="lg" color="gray.600">
              Quem vai receber os pingadinhos dessa vaquinha?
            </Text>

            <HStack spacing={6} flexWrap="wrap">
              <Box
                borderWidth="2px"
                borderColor={
                  destinatario === "voce" ? "orange.400" : "gray.200"
                }
                bg={destinatario === "voce" ? "orange.50" : "white"}
                p={5}
                borderRadius="md"
                cursor="pointer"
                onClick={() => setDestinatario("voce")}
                w={{ base: "100%", md: "48%" }}
                minH="120px"
              >
                <HStack spacing={3} align="flex-start" h="full">
                  <FaUser
                    size={24}
                    color={destinatario === "voce" ? "#DD6B20" : "#A0AEC0"}
                  />
                  <Box flexGrow={1}>
                    <Text fontWeight="bold">Você</Text>
                    <Text fontSize="sm" color="gray.600">
                      Está arrecadando para você mesmo
                    </Text>
                  </Box>
                </HStack>
              </Box>

              <Box
                borderWidth="2px"
                borderColor={
                  destinatario === "outro" ? "orange.400" : "gray.200"
                }
                bg={destinatario === "outro" ? "orange.50" : "white"}
                p={5}
                borderRadius="md"
                cursor="pointer"
                onClick={() => setDestinatario("outro")}
                w={{ base: "100%", md: "48%" }}
                minH="120px"
              >
                <HStack spacing={3} align="flex-start" h="full">
                  <FaHeart
                    size={24}
                    color={destinatario === "outro" ? "#DD6B20" : "#A0AEC0"}
                  />
                  <Box flexGrow={1}>
                    <Text fontWeight="bold">Alguém mais</Text>
                    <Text fontSize="sm" color="gray.600">
                      Está arrecadando para outra pessoa
                    </Text>
                  </Box>
                </HStack>
              </Box>
            </HStack>

            <Box textAlign="right" w="100%" pt={6}>
              <Button colorScheme="orange" size="lg" onClick={handlePublicar}>
                Criar Pingadim
              </Button>
            </Box>
          </VStack>
        </Container>
      </Box>
    </>
  );
};

export default FinalizarPingadim;
