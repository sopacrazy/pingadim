import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  Heading,
  Textarea,
  Container,
  VStack,
  Text,
  Image,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const CriarPingadimEtapa2 = () => {
  const [titulo, setTitulo] = useState("");
  const [link, setLink] = useState("");
  const [descricao, setDescricao] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  const handleProximo = () => {
    if (titulo.length < 3) {
      toast({
        title: "Eita!",
        description:
          "O título do Pingadim precisa ter pelo menos 3 caracteres.",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    if (link.length < 5) {
      toast({
        title: "Link curto demais!",
        description: "O link precisa ter no mínimo 5 caracteres.",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    // ...
    if (descricao.length < 15) {
      toast({
        title: "Descrição muito curta!",
        description: `Faltam ${15 - descricao.length} caracteres.`,
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    if (descricao.length > 50) {
      toast({
        title: "Descrição muito longa!",
        description: `A descrição deve ter no máximo 50 caracteres.`,
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    const info = { titulo, link, descricao };
    localStorage.setItem("pingadim_info", JSON.stringify(info));
    navigate("/criar/etapa3");
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

      <Box bg="gray.50" minH="100vh" py={12} px={4}>
        <Container maxW="4xl">
          <VStack spacing={6} align="start">
            <Heading color="teal.600">Etapa 2 de 3</Heading>
            <Text fontSize="xl" fontWeight="bold">
              Defina os detalhes do seu Pingadim:
            </Text>

            <FormControl isRequired>
              <FormLabel>Título do Pingadim</FormLabel>
              <Input
                placeholder="Ex: Quero um x-tudo na saída da escola"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Link personalizado</FormLabel>
              <Input
                placeholder="ex: lanche-do-pedro"
                value={link}
                onChange={(e) => setLink(e.target.value.replace(/\s/g, "-"))}
              />
              <FormHelperText>
                O link ficará assim: www.pingadim.com/vaquinha/
                <strong>{link || "seu-link"}</strong>
              </FormHelperText>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Descrição</FormLabel>
              <Textarea
                rows={5}
                placeholder="Conte mais sobre o motivo do seu pingadim. Mínimo de 50 caracteres."
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
              <FormHelperText>
                {descricao.length < 15
                  ? `Faltam ${15 - descricao.length} caracteres...`
                  : descricao.length > 50
                  ? `Você ultrapassou ${descricao.length - 50} caracteres 😬`
                  : "Beleza! Tá tudo certo com o texto 🎉"}
              </FormHelperText>
            </FormControl>
          </VStack>

          <Flex justify="space-between" mt={4}>
            <Button
              variant="ghost"
              colorScheme="gray"
              onClick={() => navigate("/criar")}
            >
              ← Voltar
            </Button>

            <Button colorScheme="teal" onClick={handleProximo}>
              Próximo →
            </Button>
          </Flex>
        </Container>
      </Box>
    </>
  );
};

export default CriarPingadimEtapa2;
