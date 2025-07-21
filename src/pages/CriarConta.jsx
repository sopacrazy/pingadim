import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
  HStack,
  Divider,
  RadioGroup,
  Radio,
  Stack,
  Checkbox,
  Link,
  IconButton,
  Flex,
  Image,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import InputMask from "react-input-mask";

const CriarConta = () => {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirma, setMostrarConfirma] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {/* Topo com logo */}
      <Flex
        h="72px"
        px={6}
        bg="white"
        color="gray.800"
        align="center"
        justify="start"
        boxShadow="sm"
      >
        <Image
          src="/src/img/logo2.png"
          alt="Pingadim"
          height="30px"
          cursor="pointer"
          onClick={() => navigate("/")}
        />
      </Flex>

      {/* Conteúdo com fundo branco e centralizado */}
      <Box
        bg="white"
        minH="calc(100vh - 72px)"
        display="flex"
        alignItems="center"
        justifyContent="center"
        py={10}
      >
        <Container maxW="lg" bg="white" p={8} rounded="lg">
          <Heading textAlign="center" mb={2} fontSize="2xl" color="teal.700">
            Bem-vindo ao Pingadim
          </Heading>
          <Text textAlign="center" color="gray.500" mb={6}>
            Bora criar sua conta e começar a pingar juntos? 💧
          </Text>

          <HStack justify="center" spacing={4} mb={4}>
            <IconButton icon={<FaGoogle />} aria-label="Google" />
            <IconButton icon={<FaFacebook />} aria-label="Facebook" />
          </HStack>

          <HStack my={4}>
            <Divider />
            <Text fontSize="sm" color="gray.500">
              Ou
            </Text>
            <Divider />
          </HStack>

          <RadioGroup defaultValue="br">
            <Stack direction="row" spacing={4} mb={4} justify="center">
              <Radio value="br">Brasileiro(a)</Radio>
              <Radio value="estrangeiro">Estrangeiro(a)</Radio>
            </Stack>
          </RadioGroup>

          <HStack spacing={4}>
            <Input placeholder="Nome" />
            <Input placeholder="Sobrenome" />
          </HStack>

          <VStack spacing={4} mt={4}>
            <Input placeholder="Email" type="email" />
            <Input
              as={InputMask}
              mask="999.999.999-99"
              placeholder="CPF"
              type="text"
            />

            <InputGroup>
              <Input
                type={mostrarSenha ? "text" : "password"}
                placeholder="Senha"
              />
              <InputRightElement>
                <Button
                  variant="ghost"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                >
                  {mostrarSenha ? <ViewOffIcon /> : <ViewIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
            <InputGroup>
              <Input
                type={mostrarConfirma ? "text" : "password"}
                placeholder="Confirme sua senha"
              />
              <InputRightElement>
                <Button
                  variant="ghost"
                  onClick={() => setMostrarConfirma(!mostrarConfirma)}
                >
                  {mostrarConfirma ? <ViewOffIcon /> : <ViewIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
            <Text fontSize="xs" color="gray.500" align="left" w="100%">
              A senha deve ter pelo menos 8 caracteres, incluindo letra
              maiúscula, minúscula, número e símbolo.
            </Text>

            <Checkbox alignSelf="start" colorScheme="teal">
              Eu li e aceito os{" "}
              <Link color="teal.500" href="#">
                termos e condições
              </Link>
            </Checkbox>

            <Button colorScheme="teal" size="lg" w="100%">
              Criar conta
            </Button>

            <Text fontSize="sm" color="gray.600">
              Já tem uma conta?{" "}
              <Link
                color="teal.600"
                fontWeight="bold"
                onClick={() => navigate("/login")}
              >
                Entrar
              </Link>
            </Text>
          </VStack>
        </Container>
      </Box>
    </>
  );
};

export default CriarConta;
