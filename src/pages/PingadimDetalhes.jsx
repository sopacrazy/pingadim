import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Flex,
  Button,
  Image,
  useToast,
  Avatar,
  Progress,
  Spinner,
  Container,
  Stack,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../config";

import Topo from "../components/TopBar";
import Rodape from "../components/Footer";
import bannerPadrao from "../../src/img/banner-padrao.png";

const PingadimDetalhes = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const cleanId = id.split(":")[0]; // garante que só pegue o número antes dos ":"

  const toast = useToast();
  const [pingadim, setPingadim] = useState(null);

  useEffect(() => {
    const fetchPingadim = async () => {
      try {
        const res = await fetch(`${API_URL}/api/pingadinhos/${cleanId}`);
        const data = await res.json();
        setPingadim(data);
      } catch (err) {
        toast({
          title: "Erro",
          description: "Não foi possível carregar os detalhes.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };

    fetchPingadim();
  }, [cleanId]);

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

  const arrecadado = parseFloat(pingadim.valor_arrecadado || 0);
  const meta = parseFloat(pingadim.valor_meta || 1);
  const percentual = Math.min((arrecadado / meta) * 100, 100).toFixed(0);

  return (
    <>
      <Topo />

      <Box bg="gray.50" py={10}>
        <Container maxW="4xl">
          {/* Cabeçalho com avatar e título */}
          <Flex align="center" mb={4} gap={4}>
            <Avatar name={pingadim.nome_usuario} />
            <Box>
              <Heading size="md">{pingadim.titulo}</Heading>
              <Text fontSize="sm" color="gray.500">
                {pingadim.categoria || "Categoria não definida"}
              </Text>
            </Box>
          </Flex>

          {/* Progresso financeiro */}
          <Box
            borderRadius="md"
            p={4}
            bg="white"
            boxShadow="md"
            mb={6}
            textAlign="center"
          >
            <Heading size="lg" color="orange.500">
              R$ {arrecadado.toFixed(2)}
            </Heading>
            <Text color="gray.600" mb={2}>
              Arrecadados de R$ {meta.toFixed(2)} —{" "}
              {pingadim.qtd_colaboradores || 0} Colaboradores
            </Text>
            <Progress
              value={percentual}
              colorScheme="orange"
              height="10px"
              borderRadius="full"
            />
            <Text fontSize="xs" color="gray.500" mt={1}>
              {percentual}% da meta
            </Text>
          </Box>

          {/* Botões de ação */}
          <Flex justify="center" gap={4} mb={6}>
            <Button
              size="lg"
              colorScheme="orange"
              px={8}
              onClick={() => navigate(`/pingadim/${id}/contribuir`)}
            >
              Contribuir ❤️
            </Button>
            <Button size="lg" variant="outline" colorScheme="orange" px={8}>
              Compartilhe 🔗
            </Button>
          </Flex>
          {/* Banner grande */}
          <Box
            overflow="hidden"
            borderRadius="lg"
            mb={6}
            height={{ base: "200px", md: "400px" }}
            bg="gray.100"
            border="1px solid #CBD5E0" // cor cinza clara do Chakra UI (gray.300)
          >
            <Image
              src={pingadim.imagem || bannerPadrao}
              alt="Banner do Pingadim"
              objectFit="cover"
              width="100%"
              height="100%"
              borderRadius="lg"
              mb={4}
            />
          </Box>

          {/* Descrição */}
          <Box mb={10}>
            <Heading size="md" mb={2}>
              Sobre esse Pingadim
            </Heading>
            <Text fontSize="md" color="gray.700">
              {pingadim.descricao}
            </Text>
          </Box>

          {/* Apoiadores */}
          <Box mt={8}>
            <Heading size="md" mb={2}>
              Apoiadores
            </Heading>
            <Text fontSize="sm" color="gray.500">
              ❤️ Obrigado!
            </Text>
          </Box>
        </Container>
      </Box>

      <Rodape />
    </>
  );
};

export default PingadimDetalhes;
