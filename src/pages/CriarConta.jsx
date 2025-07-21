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
  Checkbox,
  Link,
  IconButton,
  Flex,
  Image,
  useToast,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import InputMask from "react-input-mask";
import axios from "axios";

// Função para validar CPF
function validarCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, "");
  if (!cpf || cpf.length !== 11) return false;
  if (/^(\d)\1+$/.test(cpf)) return false;

  let soma = 0;
  for (let i = 1; i <= 9; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }

  let resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(9, 10))) return false;

  soma = 0;
  for (let i = 1; i <= 10; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }

  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(10, 11))) return false;

  return true;
}

// 🔐 Função para verificar os requisitos da senha
function verificarRequisitosSenha(senha) {
  return {
    comprimento: senha.length >= 8,
    maiuscula: /[A-Z]/.test(senha),
    minuscula: /[a-z]/.test(senha),
    numero: /[0-9]/.test(senha),
    simbolo: /[\W_]/.test(senha),
  };
}

function validarSenha(senha) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  return regex.test(senha);
}

const CriarConta = () => {
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirma, setMostrarConfirma] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const [cpfExistente, setCpfExistente] = useState(false);
  const [senhaValida, setSenhaValida] = useState({
    comprimento: false,
    maiuscula: false,
    minuscula: false,
    numero: false,
    simbolo: false,
  });

  const handleCriarConta = async () => {
    if (!nome || !sobrenome || !email || !cpf || !senha || !confirmaSenha) {
      toast({
        title: "Preencha todos os campos",
        description: "Todos os campos são obrigatórios.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!validarCPF(cpf)) {
      toast({
        title: "CPF inválido",
        description: "Digite um CPF válido antes de continuar.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (cpfExistente) {
      toast({
        title: "CPF já cadastrado",
        description: "Use outro CPF ou faça login.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (senha !== confirmaSenha) {
      toast({
        title: "Senhas diferentes",
        description: "A senha e a confirmação devem ser iguais.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!validarSenha(senha)) {
      toast({
        title: "Senha fraca",
        description:
          "A senha deve ter pelo menos 8 caracteres, incluindo letra maiúscula, minúscula, número e símbolo.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    try {
      await axios.post(`${API_URL}/api/auth/register`, {
        nome,
        sobrenome,
        email,
        cpf,
        senha,
      });

      toast({
        title: "Conta criada com sucesso!",
        description: "Agora é só fazer o login.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      navigate("/login");
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      toast({
        title: "Erro ao cadastrar",
        description: error.response?.data?.error || "Erro interno no servidor.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  const verificarCpfExistente = async () => {
    const cpfLimpo = cpf.replace(/[^\d]/g, "");
    if (cpfLimpo.length !== 11) return;

    try {
      const response = await axios.get(
        `${API_URL}/api/auth/verificar-cpf/${cpfLimpo}`
      );
      if (response.data.existe) {
        setCpfExistente(true);
        toast({
          title: "CPF já cadastrado",
          description: "Este CPF já está em uso. Faça login ou use outro.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      } else {
        setCpfExistente(false);
      }
    } catch (error) {
      console.error("Erro ao verificar CPF:", error);
      toast({
        title: "Erro ao verificar CPF",
        description: "Não foi possível validar o CPF.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

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

          <HStack spacing={4}>
            <Input
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <Input
              placeholder="Sobrenome"
              value={sobrenome}
              onChange={(e) => setSobrenome(e.target.value)}
            />
          </HStack>

          <VStack spacing={4} mt={4}>
            <Input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              as={InputMask}
              mask="999.999.999-99"
              placeholder="CPF"
              type="text"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              onBlur={verificarCpfExistente}
            />

            <InputGroup>
              <Input
                type={mostrarSenha ? "text" : "password"}
                placeholder="Senha"
                value={senha}
                onChange={(e) => {
                  setSenha(e.target.value);
                  setSenhaValida(verificarRequisitosSenha(e.target.value));
                }}
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
                value={confirmaSenha}
                onChange={(e) => setConfirmaSenha(e.target.value)}
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

            <Box w="100%" fontSize="sm" color="gray.600">
              <Text mb={1}>Sua senha deve conter:</Text>
              <VStack align="start" spacing={1}>
                <Text color={senhaValida.comprimento ? "green.500" : "red.500"}>
                  • Pelo menos 8 caracteres
                </Text>
                <Text color={senhaValida.maiuscula ? "green.500" : "red.500"}>
                  • Uma letra maiúscula
                </Text>
                <Text color={senhaValida.minuscula ? "green.500" : "red.500"}>
                  • Uma letra minúscula
                </Text>
                <Text color={senhaValida.numero ? "green.500" : "red.500"}>
                  • Um número
                </Text>
                <Text color={senhaValida.simbolo ? "green.500" : "red.500"}>
                  • Um símbolo (ex: @, #, !)
                </Text>
              </VStack>
            </Box>

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

            <Button
              colorScheme="teal"
              size="lg"
              w="100%"
              onClick={handleCriarConta}
            >
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
