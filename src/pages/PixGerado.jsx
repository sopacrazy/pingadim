import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Text,
  useClipboard,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import Topo from "../components/TopBar";
import Rodape from "../components/Footer";
import qrFake from "../img/qr-fake.png";

const PixGerado = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const valor = state?.valor || 1;
  const nome = state?.nome || "Anônimo";

  // Exemplo de código pix (fixo por enquanto)
  const codigoPix = `00020126360014BR.GOV.BCB.PIX0114+5581999999995204000053039865802BR5925Pingadim do ${nome}6009SAO PAULO62270520SitePingadim6304ABCD`;

  const { hasCopied, onCopy } = useClipboard(codigoPix);

  const hoje = new Date();
  hoje.setDate(hoje.getDate() + 1);
  const validade = hoje.toLocaleDateString("pt-BR");

  return (
    <>
      <Topo />
      <Box bg="gray.50" py={10}>
        <Container maxW="lg" textAlign="center">
          <Button
            variant="link"
            mb={4}
            onClick={() => navigate(`/pingadim/${state?.id}`)}
          >
            &lt; Voltar
          </Button>

          <Heading mb={4}>Pix gerado com sucesso</Heading>
          <Image
            src={qrFake}
            alt="QR Code Pix Simulado"
            mx="auto"
            mb={6}
            boxSize="250px"
          />

          <Text mb={4}>
            Para finalizar sua contribuição, é só escanear o código QR Code.
            Você também pode clicar em “Copiar código Pix” e colar no app ou
            site do seu banco usando a opção "Pix copia e cola".
          </Text>

          <Text fontSize="sm" color="gray.500" mb={6}>
            Esse código expira em <b>{validade}</b>
          </Text>

          <Flex justify="center" gap={4} flexWrap="wrap">
            <Button variant="outline" colorScheme="orange" isDisabled>
              Baixar QR Code
            </Button>
            <Button colorScheme="orange" onClick={onCopy}>
              {hasCopied ? "Código copiado!" : "Copiar código Pix"}
            </Button>
          </Flex>
        </Container>
      </Box>
      <Rodape />
    </>
  );
};

export default PixGerado;
