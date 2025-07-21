import React, { useState } from "react";
import {
  Box,
  useToast,
  Button,
  Container,
  Heading,
  Input,
  Text,
  VStack,
  HStack,
  Divider,
  Icon,
  Image,
  Flex,
  Link,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const handleLogin = async () => {
    console.log("🔁 Enviando dados de login:", email, senha);

    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        senha,
      });

      const { usuario, token } = response.data;

      // Salvar no localStorage ANTES de redirecionar
      localStorage.setItem("usuario", JSON.stringify(usuario));
      localStorage.setItem("token", token);

      toast({
        title: "Login realizado!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      // Agora sim redireciona
      navigate("/painel");
    } catch (error) {
      console.error("Erro no login:", error);
      toast({
        title: "Erro ao fazer login",
        description: error.response?.data?.message || "Erro inesperado.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
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

      <Container maxW="sm" py={20}>
        <VStack spacing={6} textAlign="center">
          <Heading fontSize="2xl">Bem-vindo ao Pingadim</Heading>
          <Text>
            Para continuar a experiência, faça login ou crie sua conta.
          </Text>

          <HStack spacing={4} w="100%" justify="center">
            <Button
              leftIcon={<FaGoogle />}
              colorScheme="red"
              variant="outline"
              w="full"
            >
              Google
            </Button>
            <Button
              leftIcon={<FaFacebook />}
              colorScheme="facebook"
              variant="outline"
              w="full"
            >
              Facebook
            </Button>
          </HStack>

          <HStack w="100%" align="center">
            <Divider />
            <Text fontSize="sm" whiteSpace="nowrap">
              Ou
            </Text>
            <Divider />
          </HStack>

          <VStack spacing={4} w="100%">
            <Input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <InputGroup>
              <Input
                placeholder="Senha"
                type={showPassword ? "text" : "password"}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
              <InputRightElement>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPassword((s) => !s)}
                >
                  {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>

            <HStack justify="space-between" w="100%">
              <Link fontSize="sm" color="teal.600">
                Esqueceu sua senha?
              </Link>
              <Text fontSize="sm" color="gray.500">
                <Link color="teal.600" onClick={() => navigate("/criar-conta")}>
                  Criar conta
                </Link>
              </Text>
            </HStack>

            <Button colorScheme="teal" w="100%" onClick={handleLogin}>
              Entrar
            </Button>
          </VStack>
        </VStack>
      </Container>
    </>
  );
};

export default Login;
