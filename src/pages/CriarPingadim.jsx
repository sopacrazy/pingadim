import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  SimpleGrid,
  Tag,
  VStack,
  Container,
  useToast,
  Flex,
  Image,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";

const categorias = [
  "Lanches",
  "Presentes",
  "Aniversário",
  "Pets",
  "Rolê",
  "Date",
  "Estudo",
  "Família",
  "Projetos",
  "Saúde",
  "Outros",
];

const CriarPingadim = () => {
  const navigate = useNavigate(); // ✅ define o navigate
  const [selecionado, setSelecionado] = useState(null);
  const toast = useToast();

  const handleSelecionar = (cat) => {
    setSelecionado(cat);
  };

  const handleProximo = () => {
    if (!selecionado) {
      toast({
        title: "Escolha uma categoria primeiro 😉",
        status: "warning",
        duration: 2500,
        isClosable: true,
      });
      return;
    }

    // Salvar no localStorage ou contexto
    localStorage.setItem("pingadim_categoria", selecionado);

    navigate("/criar/etapa2"); // vai para o passo 2
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
        h="calc(100vh - 65px)" // ajusta conforme a altura do topo real
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Container maxW="4xl">
          <VStack spacing={6} textAlign="center" mb={10}>
            <Heading color="teal.600">Criação do seu Pingadim 💸</Heading>
            <Text fontSize="lg" color="gray.600">
              Escolha uma categoria que representa seu Pingadim:
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 2, md: 3 }} spacing={4} mb={10}>
            {categorias.map((cat) => (
              <Tag
                size="lg"
                key={cat}
                variant={selecionado === cat ? "solid" : "subtle"}
                colorScheme={selecionado === cat ? "teal" : "gray"}
                p={3}
                borderRadius="md"
                cursor="pointer"
                onClick={() => handleSelecionar(cat)}
                textAlign="center"
                justifyContent="center"
              >
                {cat}
              </Tag>
            ))}
          </SimpleGrid>

          <Box textAlign="right">
            <Button colorScheme="teal" size="lg" onClick={handleProximo}>
              Próximo
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default CriarPingadim;
