import React from "react";
import {
  Box,
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

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = React.useState(false);

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
            <Input placeholder="Email" type="email" />
            <InputGroup>
              <Input
                placeholder="Senha"
                type={showPassword ? "text" : "password"}
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
                <Link color="teal.600">Criar conta</Link>
              </Text>
            </HStack>

            <Button colorScheme="teal" w="100%">
              Entrar
            </Button>
          </VStack>
        </VStack>
      </Container>
    </>
  );
};

export default Login;
