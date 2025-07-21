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
} from "@chakra-ui/react";
import { FaUser, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const FinalizarPingadim = () => {
  const navigate = useNavigate();
  const [destinatario, setDestinatario] = useState("voce");
  const toast = useToast();

  const handlePublicar = () => {
    // Simula salvar tudo (em um projeto real, enviaria para API)
    const dadosFinais = {
      categoria: localStorage.getItem("pingadim_categoria"),
      ...JSON.parse(localStorage.getItem("pingadim_info")),
      ...JSON.parse(localStorage.getItem("pingadim_meta")),
      destinatario,
    };

    console.log("Pingadim criado:", dadosFinais);

    toast({
      title: "Pingadim criado com sucesso! 🎉",
      description: "Seu link está pronto pra receber contribuições!",
      status: "success",
      duration: 4000,
      isClosable: true,
    });

    // Limpa localStorage se quiser
    // localStorage.clear();
  };

  return (
    <Box bg="gray.50" minH="100vh" py={10}>
      <Container maxW="4xl">
        <VStack spacing={6} align="start">
          <Heading color="teal.600">Último passo!</Heading>
          <Text fontSize="lg" color="gray.600">
            Quem vai receber os pingadinhos dessa vaquinha?
          </Text>

          <HStack spacing={6} flexWrap="wrap">
            <Box
              borderWidth="2px"
              borderColor={destinatario === "voce" ? "orange.400" : "gray.200"}
              bg={destinatario === "voce" ? "orange.50" : "white"}
              p={5}
              borderRadius="md"
              cursor="pointer"
              onClick={() => setDestinatario("voce")}
              w={{ base: "100%", md: "48%" }}
            >
              <HStack spacing={3}>
                <FaUser
                  size={24}
                  color={destinatario === "voce" ? "#DD6B20" : "#A0AEC0"}
                />
                <Box>
                  <Text fontWeight="bold">Você</Text>
                  <Text fontSize="sm" color="gray.600">
                    Está arrecadando para você mesmo
                  </Text>
                </Box>
              </HStack>
            </Box>

            <Box
              borderWidth="2px"
              borderColor={destinatario === "outro" ? "orange.400" : "gray.200"}
              bg={destinatario === "outro" ? "orange.50" : "white"}
              p={5}
              borderRadius="md"
              cursor="pointer"
              onClick={() => setDestinatario("outro")}
              w={{ base: "100%", md: "48%" }}
            >
              <HStack spacing={3}>
                <FaHeart
                  size={24}
                  color={destinatario === "outro" ? "#DD6B20" : "#A0AEC0"}
                />
                <Box>
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
  );
};

export default FinalizarPingadim;
