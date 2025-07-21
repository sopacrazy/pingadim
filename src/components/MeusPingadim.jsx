import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  useToast,
  Flex,
  Progress,
  Avatar,
} from "@chakra-ui/react";
import { FaCoins } from "react-icons/fa";

const MeusPingadim = () => {
  const [pingadins, setPingadins] = useState([]);
  const toast = useToast();

  useEffect(() => {
    const fetchPingadins = async () => {
      const usuario = JSON.parse(localStorage.getItem("usuario"));
      if (!usuario) return;

      try {
        const res = await fetch(
          `${API_URL}/api/pingadinhos/usuario/${usuario.id}`
        );
        const data = await res.json();
        setPingadins(data);
      } catch (error) {
        toast({
          title: "Erro",
          description: "Não foi possível carregar seus Pingadim.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };

    fetchPingadins();
  }, []);

  return (
    <Box>
      <Heading fontSize="2xl" mb={6} color="teal.600">
        Meus Pingadim
      </Heading>

      <Flex flexWrap="wrap" gap={6} justify="center">
        {pingadins.map((p) => {
          const arrecadado = parseFloat(p.valor_arrecadado || 0);
          const meta = parseFloat(p.valor_meta || 1);
          const percentual = Math.min((arrecadado / meta) * 100, 100).toFixed(
            0
          );

          return (
            <Box
              key={p.id}
              width="320px"
              borderRadius="2xl"
              overflow="hidden"
              bg="white"
              boxShadow="lg"
              transition="0.2s"
              _hover={{ transform: "scale(1.02)", boxShadow: "xl" }}
            >
              {/* Topo ilustrativo */}
              <Box bg="teal.50" height="100px" position="relative">
                <Avatar
                  size="lg"
                  icon={<FaCoins />}
                  position="absolute"
                  bottom="-20px"
                  left="50%"
                  transform="translateX(-50%)"
                  bg="orange.400"
                  color="white"
                  border="3px solid white"
                />
              </Box>

              <Box p={5} pt={8}>
                <Text fontWeight="bold" fontSize="lg" mb={1}>
                  {p.titulo}
                </Text>

                <Text fontSize="sm" color="gray.500" mb={2}>
                  R$ {arrecadado.toFixed(2)} arrecadado de R$ {meta.toFixed(2)}
                </Text>

                <Progress
                  value={percentual}
                  colorScheme="orange"
                  borderRadius="full"
                  height="8px"
                  mb={2}
                />

                <Text fontSize="xs" color="gray.400" mb={3}>
                  {percentual}% da meta — 0 apoiadores
                </Text>

                <Button
                  width="100%"
                  colorScheme="orange"
                  borderRadius="full"
                  onClick={() => (window.location.href = `/pingadim/${p.id}`)}
                >
                  Ver detalhes
                </Button>
              </Box>
            </Box>
          );
        })}
      </Flex>
    </Box>
  );
};

export default MeusPingadim;
