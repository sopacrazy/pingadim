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
  Image,
  Flex,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { usePingadim } from "../context/PingadimContext"; // 👈 importa o contexto

const CriarPingadimEtapa3 = () => {
  const [meta, setMeta] = useState("");
  const [dataEncerramento, setDataEncerramento] = useState("");
  const [privado, setPrivada] = useState(false);
  const [comRecompensa, setComRecompensa] = useState(false);

  const navigate = useNavigate();
  const toast = useToast();
  const { dados, setDados } = usePingadim(); // 👈 usa o contexto

  const handleProximo = () => {
    const valorNumerico = Number(
      meta.replace("R$", "").replace(".", "").replace(",", ".")
    );

    if (!valorNumerico || isNaN(valorNumerico)) {
      toast({
        title: "Informe uma meta válida em R$",
        status: "warning",
        duration: 2500,
        isClosable: true,
      });
      return;
    }

    if (valorNumerico < 10) {
      toast({
        title: "Meta muito baixa!",
        description: "A meta mínima é de R$10,00.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (valorNumerico > 100) {
      toast({
        title: "Meta muito alta!",
        description: "A meta máxima permitida é de R$100,00.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // ✅ Salva no contexto
    setDados({
      ...dados,
      valor_meta: valorNumerico,
      data_fim: dataEncerramento,
      privado,
      tem_recompensas: comRecompensa,
    });

    navigate("/criar/finalizar");
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
            <Heading color="teal.600">Etapa 3 de 3</Heading>

            <FormControl isRequired>
              <FormLabel>Seu objetivo</FormLabel>
              <Input
                placeholder="Ex: R$ 60,00"
                value={meta}
                onChange={(e) => {
                  const raw = e.target.value.replace(/[^\d]/g, "");
                  const valor = Number(raw) / 100;

                  const formatted = valor.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  });

                  setMeta(formatted);
                }}
                inputMode="numeric"
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
              isChecked={privado}
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

            <Box w="100%" display="flex" justifyContent="space-between">
              <Button variant="ghost" onClick={() => navigate("/criar/etapa2")}>
                ← Voltar
              </Button>

              <Button colorScheme="teal" onClick={handleProximo}>
                Finalizar
              </Button>
            </Box>
          </VStack>
        </Container>
      </Box>
    </>
  );
};

export default CriarPingadimEtapa3;
