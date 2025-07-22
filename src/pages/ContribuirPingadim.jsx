import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  Input,
  Checkbox,
  Grid,
  useToast,
  Spinner,
  Container,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import Topo from "../components/TopBar";
import Rodape from "../components/Footer";
import { API_URL } from "../config";

const valoresSugeridos = [1, 5, 10, 25, 50, 100];

const ContribuirPingadim = () => {
  const { id } = useParams();
  const [pingadim, setPingadim] = useState(null);
  const [valorSelecionado, setValorSelecionado] = useState(null);
  const [valorCustom, setValorCustom] = useState("");
  const [nome, setNome] = useState("");
  const [anonimo, setAnonimo] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPingadim = async () => {
      try {
        const res = await fetch(`${API_URL}/api/pingadinhos/${id}`);
        const data = await res.json();
        setPingadim(data);
      } catch (err) {
        toast({
          title: "Erro",
          description: "Erro ao carregar dados.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };
    fetchPingadim();
  }, [id]);

  const handleContribuir = async () => {
    const valorFinal = valorSelecionado || parseFloat(valorCustom);
    if (!valorFinal || valorFinal <= 0) {
      return toast({
        title: "Valor inválido",
        description: "Escolha ou digite um valor válido.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }

    const nomeFinal = anonimo ? "Anônimo" : nome;

    try {
      const res = await fetch(`${API_URL}/api/pingadinhos/contribuicoes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pingadim_id: id,
          nome: nomeFinal,
          valor: parseFloat(valorFinal),
          anonimo,
        }),
      });

      if (!res.ok) {
        throw new Error("Erro ao registrar contribuição");
      }

      toast({
        title: "Contribuição registrada!",
        description: `Valor: R$ ${valorFinal.toFixed(
          2
        )} — Obrigado, ${nomeFinal}!`,
        status: "success",
        duration: 4000,
        isClosable: true,
      });

      navigate("/pingadim/pix-gerado", {
        state: {
          valor: valorFinal,
          nome: nomeFinal,
        },
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro",
        description: "Não foi possível registrar sua contribuição.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (!pingadim) {
    return (
      <>
        <Topo />
        <Flex justify="center" align="center" minH="60vh">
          <Spinner size="xl" />
        </Flex>
        <Rodape />
      </>
    );
  }

  return (
    <>
      <Topo />
      <Box bg="gray.50" py={10} minH="70vh">
        <Container maxW="lg">
          <Button variant="link" mb={4} onClick={() => navigate(-1)}>
            &lt; Voltar
          </Button>
          <Heading size="lg" mb={4}>
            Com quanto você gostaria de contribuir?
          </Heading>

          <Grid templateColumns="repeat(3, 1fr)" gap={4} mb={6}>
            {valoresSugeridos.map((valor) => (
              <Button
                key={valor}
                variant={valorSelecionado === valor ? "solid" : "outline"}
                colorScheme="orange"
                onClick={() => {
                  setValorSelecionado(valor);
                  setValorCustom("");
                }}
              >
                R$ {valor.toFixed(2)}
              </Button>
            ))}
          </Grid>

          <Input
            placeholder="Outro valor"
            type="number"
            value={valorCustom}
            onChange={(e) => {
              setValorCustom(e.target.value);
              setValorSelecionado(null);
            }}
            mb={4}
          />

          <Checkbox
            isChecked={anonimo}
            onChange={(e) => setAnonimo(e.target.checked)}
            mb={2}
          >
            Contribuir como anônimo
          </Checkbox>

          {!anonimo && (
            <Input
              placeholder="Seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              mb={6}
            />
          )}

          <Button
            colorScheme="orange"
            size="lg"
            width="100%"
            onClick={handleContribuir}
          >
            Contribuir agora ❤️
          </Button>
        </Container>
      </Box>
      <Rodape />
    </>
  );
};

export default ContribuirPingadim;
