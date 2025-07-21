import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Heading,
  VStack,
  FormHelperText,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const CriarPingadimEtapa3 = () => {
  const [meta, setMeta] = useState("");
  const [dataEncerramento, setDataEncerramento] = useState("");
  const [privada, setPrivada] = useState(false);
  const [comRecompensa, setComRecompensa] = useState(false);

  const navigate = useNavigate();
  const toast = useToast();

  const handleProximo = () => {
    if (!meta || isNaN(meta) || Number(meta) <= 0) {
      toast({
        title: "Informe uma meta válida em R$",
        status: "warning",
        duration: 2500,
        isClosable: true,
      });
      return;
    }

    // Salvar no localStorage
    localStorage.setItem(
      "pingadim_meta",
      JSON.stringify({
        meta,
        dataEncerramento,
        privada,
        comRecompensa,
      })
    );

    // Aqui você pode seguir para upload de imagem ou preview final
    navigate("/criar/finalizar");
  };

  return (
    <Box bg="gray.50" minH="100vh" py={10}>
      <Container maxW="4xl">
        <VStack spacing={6} align="start">
          <Heading color="teal.600">Etapa 3 de 3</Heading>

          <FormControl isRequired>
            <FormLabel>Seu objetivo</FormLabel>
            <Input
              placeholder="Ex: 6000"
              value={meta}
              onChange={(e) => setMeta(e.target.value)}
              type="number"
              min={1}
            />
            <FormHelperText>Meta da arrecadação em reais</FormHelperText>
          </FormControl>

          <FormControl>
            <FormLabel>Data de encerramento desejada</FormLabel>
            <Input
              type="date"
              value={dataEncerramento}
              onChange={(e) => setDataEncerramento(e.target.value)}
            />
          </FormControl>

          <Checkbox
            isChecked={privada}
            onChange={(e) => setPrivada(e.target.checked)}
          >
            Manter a campanha privada
          </Checkbox>

          <Checkbox
            isChecked={comRecompensa}
            onChange={(e) => setComRecompensa(e.target.checked)}
          >
            Oferecer categorias de suporte com recompensas
          </Checkbox>

          <Box textAlign="right" w="100%">
            <Button colorScheme="teal" onClick={handleProximo}>
              Finalizar
            </Button>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default CriarPingadimEtapa3;
