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
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const CriarPingadimEtapa2 = () => {
  const [titulo, setTitulo] = useState("");
  const [link, setLink] = useState("");
  const [descricao, setDescricao] = useState("");
  const navigate = useNavigate();

  const handleProximo = () => {
    if (titulo.length < 3 || link.length < 3 || descricao.length < 50) return;

    const info = { titulo, link, descricao };
    localStorage.setItem("pingadim_info", JSON.stringify(info));

    navigate("/criar/etapa3");
  };

  return (
    <Box bg="gray.50" minH="100vh" py={10}>
      <Container maxW="4xl">
        <VStack spacing={6} align="start" mb={10}>
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
              {descricao.length < 50
                ? `Faltam ${50 - descricao.length} caracteres...`
                : "Beleza! Tá tudo certo com o texto 🎉"}
            </FormHelperText>
          </FormControl>
        </VStack>

        <Box textAlign="right">
          <Button colorScheme="teal" onClick={handleProximo}>
            Próximo
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default CriarPingadimEtapa2;
