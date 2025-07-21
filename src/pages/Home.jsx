import React from "react";
import {
  Box,
  Grid,
  Heading,
  Link,
  VStack,
  HStack,
  Icon,
  Button,
  Flex,
  Text,
  Spacer,
  Avatar,
  SimpleGrid,
  Card,
  CardHeader,
  Progress,
  CardBody,
  Container,
  Image,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import {
  FaInstagram,
  FaFacebook,
  FaTiktok,
  FaXTwitter,
  FaLinkedin,
} from "react-icons/fa6";

import xtudoImg from "../img/x-tudo.png";
import milkshakeImg from "../img/milkshake.jpeg";
import cocaImg from "../img/coca.jpeg";
import bannerPingadim from "../img/banner-pingadim.png";
import logo from "../img/logo.png"; // ajusta o caminho conforme a pasta

const pingadinhos = [
  {
    id: 1,
    nome: "Pedro",
    motivo: "Quero um x-tudo na saída da escola 😩",
    valor: "R$9,00",
    cidade: "Belém - PA",
    imagem: xtudoImg,
    meta: 9,
    arrecadado: 4,
  },
  {
    id: 2,
    nome: "Lari",
    motivo: "Preciso de um milkshake hoje! 🥤",
    valor: "R$7,00",
    cidade: "Ananindeua - PA",
    imagem: milkshakeImg,
    meta: 7,
    arrecadado: 7,
  },
  {
    id: 3,
    nome: "Tiago",
    motivo: "Me ajuda com a Coca de 3L pro churras 🔥",
    valor: "R$10,00",
    cidade: "Marituba - PA",
    imagem: cocaImg,
    meta: 10,
    arrecadado: 6,
  },
];

const Home = () => {
  const navigate = useNavigate();
  return (
    <Box>
      {/* Header */}
      <Flex
        p={4}
        bg="teal.500"
        color="white"
        align="center"
        position="sticky"
        top="0"
        zIndex="1000"
        boxShadow="md"
      >
        <Image src={logo} alt="Pingadim" height="30px" />
        <Spacer />
        <HStack spacing={4}>
          <Button
            variant="ghost"
            color="white"
            onClick={() => navigate("/login")}
          >
            Entrar
          </Button>

          <Button colorScheme="whiteAlpha" onClick={() => navigate("/criar")}>
            Criar Pingadim
          </Button>
        </HStack>
      </Flex>

      {/* Hero */}
      <Box
        position="relative"
        width="100%"
        overflow="hidden"
        height={{ base: "300px", md: "400px", lg: "500px" }}
      >
        <Image
          src={bannerPingadim}
          alt="Banner Pingadim"
          objectFit="cover"
          width="100%"
          height="100%"
        />
        <Box
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          bg="rgba(0, 0, 0, 0.4)"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          color="white"
          px={4}
          textAlign="center"
        >
          <Heading mb={4} fontSize={{ base: "2xl", md: "3xl" }}>
            Bora pingar naquele lanche da escola? 🍔
          </Heading>
          <Text fontSize="lg" mb={6}>
            Crie ou apoie um Pingadim e fortaleça quem tá precisando daquele
            reforço!
          </Text>
          <HStack spacing={4}>
            <Button
              colorScheme="teal"
              size="lg"
              onClick={() => navigate("/criar")}
            >
              Criar Pingadim
            </Button>
            <Button variant="outline" colorScheme="whiteAlpha" size="lg">
              Explorar
            </Button>
          </HStack>
        </Box>
      </Box>

      {/* Impacto do Pingadim */}
      <Box bg="gray.100" py={{ base: 16, md: 20 }}>
        <Container maxW="6xl">
          <VStack spacing={10} textAlign="center">
            <Heading
              fontSize={{ base: "2xl", md: "4xl" }}
              fontWeight="bold"
              color="teal.700"
            >
              O poder do pouquinho junto 💚
            </Heading>

            <SimpleGrid
              columns={{ base: 1, md: 3 }}
              spacing={{ base: 8, md: 14 }}
            >
              <Box>
                <Heading fontSize={{ base: "3xl", md: "5xl" }} color="teal.600">
                  +12 mil
                </Heading>
                <Text fontSize="lg" color="gray.600">
                  Pessoas pingando juntas
                </Text>
              </Box>

              <Box>
                <Heading fontSize={{ base: "3xl", md: "5xl" }} color="teal.600">
                  +R$120 mil
                </Heading>
                <Text fontSize="lg" color="gray.600">
                  Já arrecadados
                </Text>
              </Box>

              <Box>
                <Heading fontSize={{ base: "3xl", md: "5xl" }} color="teal.600">
                  +2.000
                </Heading>
                <Text fontSize="lg" color="gray.600">
                  Pingadinhos criados
                </Text>
              </Box>
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      <Container maxW="6xl" py={10}>
        <Heading size="lg" mb={6} color="teal.600">
          Pingadinhos em Destaque
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          {pingadinhos.map((p) => (
            <Card key={p.id} overflow="hidden">
              <Image
                src={p.imagem}
                alt={p.motivo}
                objectFit="cover"
                height="180px"
                width="100%"
              />
              <CardHeader display="flex" alignItems="center" gap={3}>
                <Avatar name={p.nome} />
                <Box>
                  <Text fontWeight="bold">{p.nome}</Text>
                  <Text fontSize="sm" color="gray.500">
                    {p.cidade}
                  </Text>
                </Box>
              </CardHeader>
              <CardBody>
                <Text>{p.motivo}</Text>

                <Text mt={2} fontWeight="bold" color="teal.600">
                  Meta: R${p.meta},00
                </Text>

                {/* Barra de progresso */}
                <Box mt={3}>
                  <Progress
                    value={(p.arrecadado / p.meta) * 100}
                    colorScheme="teal"
                    size="sm"
                    borderRadius="md"
                  />
                  <Text fontSize="sm" mt={1} color="gray.600">
                    {Math.round((p.arrecadado / p.meta) * 100)}% arrecadado ( R$
                    {p.arrecadado.toFixed(2)})
                  </Text>
                </Box>

                <Button mt={4} colorScheme="teal" size="sm">
                  Pingar agora
                </Button>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      </Container>
      {/* Chamada Pingadim estilo Abacashi */}
      <Box
        bg="teal.600"
        color="white"
        textAlign="center"
        py={{ base: 16, md: 24 }}
        px={4}
      >
        <Heading fontSize={{ base: "2xl", md: "4xl" }} fontWeight="bold">
          Com o Pingadim, todo mundo consegue aquele reforço 💸
        </Heading>
        <Text fontSize={{ base: "md", md: "xl" }} mt={4} maxW="600px" mx="auto">
          Crie seu Pingadim em poucos minutinhos e compartilhe com a galera!
        </Text>
        <Button
          mt={8}
          size="lg"
          colorScheme="whiteAlpha"
          variant="outline"
          borderColor="white"
          _hover={{ bg: "whiteAlpha.300" }}
          onClick={() => navigate("/criar")}
        >
          Criar meu Pingadim agora →
        </Button>
      </Box>

      <Box bg="gray.50" py={16} px={4}>
        <Container maxW="6xl">
          <Heading
            fontSize={{ base: "2xl", md: "4xl" }}
            textAlign="center"
            mb={12}
            color="teal.600"
          >
            Quem já pingou falou 💬
          </Heading>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
            <Box bg="white" p={6} rounded="xl" shadow="md">
              <Text fontSize="md" mb={4}>
                “Consegui pagar meu Enem graças aos amigos que pingaram. Agora
                tô estudando com tudo pra conquistar minha vaga! Obrigado,
                Pingadim 🙏”
              </Text>
              <HStack spacing={4} align="center">
                <Avatar
                  name="Eduarda Silva"
                  src="https://randomuser.me/api/portraits/women/69.jpg"
                />
                <Box>
                  <Text fontWeight="bold">Eduarda Silva</Text>
                  <Text fontSize="sm" color="gray.500">
                    Estudante - Ananindeua/PA
                  </Text>
                </Box>
              </HStack>
            </Box>

            <Box bg="white" p={6} rounded="xl" shadow="md">
              <Text fontSize="md" mb={4}>
                “Meu tênis rasgou bem na semana da seletiva de atletismo. Em
                dois dias a vaquinha bateu a meta e consegui competir com tudo
                novo. Fui classificado! 💪🏽”
              </Text>
              <HStack spacing={4} align="center">
                <Avatar
                  name="Igor Lima"
                  src="https://randomuser.me/api/portraits/men/55.jpg"
                />
                <Box>
                  <Text fontWeight="bold">Igor Lima</Text>
                  <Text fontSize="sm" color="gray.500">
                    Atleta de base - Castanhal/PA
                  </Text>
                </Box>
              </HStack>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      <Box bg="white" py={16} px={4}>
        <Container maxW="6xl">
          <Heading
            fontSize={{ base: "2xl", md: "4xl" }}
            textAlign="center"
            mb={12}
            color="teal.600"
          >
            Perguntas Frequentes ❓
          </Heading>

          <Accordion
            allowMultiple
            maxW="4xl"
            mx="auto"
            bg="white"
            rounded="xl"
            shadow="base"
            border="1px solid"
            borderColor="gray.200"
          >
            {[
              {
                pergunta: "O que eu posso arrecadar com o Pingadim?",
                resposta:
                  "Desde ajudar alguém a pagar um curso, uma consulta médica ou material escolar, até levantar grana para um projeto social, equipamento de trabalho ou situação emergencial. O Pingadim é pra quem precisa de um reforço real.",
              },
              {
                pergunta: "É seguro receber contribuições por aqui?",
                resposta:
                  "Sim! Todas as contribuições são processadas com segurança e transparência. Você acompanha tudo em tempo real e pode sacar sempre que quiser, com taxas claras e sem surpresas.",
              },
              {
                pergunta: "Qual o custo para criar um Pingadim?",
                resposta:
                  "Criar e manter sua arrecadação é 100% gratuito. Só cobramos uma taxa de 6% no momento do saque, para ajudar a manter a plataforma no ar e segura pra todos.",
              },
              {
                pergunta: "Como aumentar as chances de bater a meta?",
                resposta:
                  "Conte uma boa história, com sinceridade e objetivo claro. Poste nas redes, agradeça quem já pingou e mantenha o pessoal atualizado. O engajamento vem da conexão com sua causa.",
              },
            ].map((item, index) => (
              <AccordionItem key={index} border="none">
                <h3>
                  <AccordionButton _expanded={{ bg: "teal.50" }} px={6} py={4}>
                    <Box
                      flex="1"
                      textAlign="left"
                      fontWeight="semibold"
                      color="teal.700"
                    >
                      {item.pergunta}
                    </Box>
                    <AccordionIcon color="teal.500" />
                  </AccordionButton>
                </h3>
                <AccordionPanel px={6} pb={4} color="gray.600" fontSize="sm">
                  {item.resposta}
                </AccordionPanel>
                {index < 3 && (
                  <Box borderBottom="1px solid" borderColor="gray.100" mx={6} />
                )}
              </AccordionItem>
            ))}
          </Accordion>
        </Container>
      </Box>
      {/* Rodapé estilo Abacashi */}
      <Box bg="gray.900" color="white" py={12} px={6}>
        <Container maxW="6xl">
          <Flex
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            align="start"
            wrap="wrap"
            gap={10}
          >
            {/* Coluna 1 */}
            <Box flex="1" minW="250px">
              <Heading size="md" mb={2}>
                pingadim
              </Heading>
              <Text mb={2}>
                A plataforma mais segura, com a menor taxa e o saque mais rápido
              </Text>
              <Text fontSize="sm" mb={1}>
                Fale com a gente:
              </Text>
              <Link href="mailto:contato@pingadim.com" color="teal.200">
                contato@pingadim.com
              </Link>
              <Text fontSize="sm">Seg à Sex, das 9h às 18h</Text>
              <Text fontSize="sm">+55 (11) 90000-0000</Text>
            </Box>

            {/* Coluna 2 */}
            <Box flex="1" minW="150px">
              <Heading size="sm" mb={3}>
                Sobre o Pingadim
              </Heading>
              <VStack align="start" spacing={2}>
                <Link>Precisa de ajuda?</Link>
                <Link>Espaço de imprensa</Link>
              </VStack>
            </Box>

            {/* Coluna 3 */}
            <Box flex="1" minW="150px">
              <Heading size="sm" mb={3}>
                Social
              </Heading>
              <VStack align="start" spacing={2}>
                <Link href="#" isExternal>
                  <HStack>
                    <Icon as={FaInstagram} />
                    <Text>Instagram</Text>
                  </HStack>
                </Link>
                <Link href="#" isExternal>
                  <HStack>
                    <Icon as={FaFacebook} />
                    <Text>Facebook</Text>
                  </HStack>
                </Link>
                <Link href="#" isExternal>
                  <HStack>
                    <Icon as={FaXTwitter} />
                    <Text>Twitter (X)</Text>
                  </HStack>
                </Link>
                <Link href="#" isExternal>
                  <HStack>
                    <Icon as={FaLinkedin} />
                    <Text>LinkedIn</Text>
                  </HStack>
                </Link>
                <Link href="#" isExternal>
                  <HStack>
                    <Icon as={FaTiktok} />
                    <Text>TikTok</Text>
                  </HStack>
                </Link>
              </VStack>
            </Box>

            {/* Coluna 4 */}
            <Box flex="1" minW="200px">
              <Heading size="sm" mb={3}>
                Informações
              </Heading>
              <VStack align="start" spacing={2}>
                <Link>Política de cookies</Link>
                <Link>Política de privacidade</Link>
                <Link>Termos de uso</Link>
              </VStack>
            </Box>
          </Flex>

          {/* Rodapé inferior */}
          <Text mt={10} textAlign="center" fontSize="xs" color="gray.400">
            Pingadim é uma fintech brasileira. Copyright ©{" "}
            {new Date().getFullYear()} Pingadim. Todos os direitos reservados.
          </Text>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
