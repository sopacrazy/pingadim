import React from "react";
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Link,
  VStack,
  HStack,
  Icon,
} from "@chakra-ui/react";
import {
  FaInstagram,
  FaFacebook,
  FaXTwitter,
  FaLinkedin,
  FaTiktok,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <Box bg="gray.900" color="white" py={12} px={6} mt="auto">
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
              <Link href="#">Precisa de ajuda?</Link>
              <Link href="#">Espaço de imprensa</Link>
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
              <Link href="#">Política de cookies</Link>
              <Link href="#">Política de privacidade</Link>
              <Link href="#">Termos de uso</Link>
            </VStack>
          </Box>
        </Flex>

        <Text fontSize="sm" textAlign="center" mt={10} color="gray.400">
          Pingadim é uma fintech brasileira. Copyright ©{" "}
          {new Date().getFullYear()} Pingadim. Todos os direitos reservados.
        </Text>
      </Container>
    </Box>
  );
};

export default Footer;
