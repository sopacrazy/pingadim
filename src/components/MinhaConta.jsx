import React from "react";
import {
  Box,
  Heading,
  Text,
  Input,
  SimpleGrid,
  VStack,
  Button,
  FormLabel,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";

const MinhaConta = () => {
  const usuario = JSON.parse(localStorage.getItem("usuario")) || {};

  return (
    <Box
      bg="white"
      boxShadow="md"
      borderRadius="xl"
      p={6}
      maxW="700px"
      mx="auto"
      mt={6}
    >
      <Heading fontSize="lg" mb={6}>
        Meus dados
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={4}>
        <Box>
          <FormLabel>Nome</FormLabel>
          <Input value={usuario.nome || ""} isDisabled borderRadius="full" />
        </Box>

        <Box>
          <FormLabel>Sobrenome</FormLabel>
          <Input
            value={usuario.sobrenome || ""}
            isDisabled
            borderRadius="full"
          />
        </Box>

        <Box>
          <FormLabel>CPF</FormLabel>
          <Input
            value={usuario.cpf || ""}
            isDisabled
            borderRadius="full"
            color="gray.500"
          />
        </Box>

        <Box>
          <FormLabel>Data de nascimento</FormLabel>
          <Input
            placeholder="DD/MM/AAAA"
            type="text"
            isDisabled
            borderRadius="full"
            color="gray.400"
          />
        </Box>
      </SimpleGrid>

      <Box mb={6}>
        <FormLabel>Email</FormLabel>
        <Input
          value={usuario.email || ""}
          isDisabled
          borderRadius="full"
          color="gray.500"
        />
      </Box>

      <Button
        bg="orange.500"
        color="white"
        w="100%"
        size="lg"
        borderRadius="full"
        _hover={{ bg: "orange.600" }}
        isDisabled
      >
        Salvar alterações
      </Button>
    </Box>
  );
};

export default MinhaConta;
