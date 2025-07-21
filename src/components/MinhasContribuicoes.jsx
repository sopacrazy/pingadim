import React from "react";
import { Box, Heading, Text, VStack, Card, CardBody } from "@chakra-ui/react";

const MinhasContribuicoes = () => {
  // Mock de contribuições
  const contribs = [
    { nome: "Lari", motivo: "Milkshake", valor: 5 },
    { nome: "Tiago", motivo: "Churras", valor: 10 },
  ];

  return (
    <Box>
      <Heading fontSize="xl" mb={4}>
        Minhas Contribuições
      </Heading>
      <VStack spacing={4} align="stretch">
        {contribs.map((c, i) => (
          <Card key={i}>
            <CardBody>
              <Text>
                Contribuição para <strong>{c.nome}</strong>
              </Text>
              <Text color="gray.600">Motivo: {c.motivo}</Text>
              <Text>Valor: R${c.valor.toFixed(2)}</Text>
            </CardBody>
          </Card>
        ))}
      </VStack>
    </Box>
  );
};

export default MinhasContribuicoes;
