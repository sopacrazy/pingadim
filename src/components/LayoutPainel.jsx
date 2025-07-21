// components/LayoutPainel.jsx
import React from "react";
import { Box, Container, VStack } from "@chakra-ui/react";
import TopBar from "./TopBar";
import Footer from "./Footer";

const LayoutPainel = ({ children }) => {
  return (
    <VStack minH="100vh" spacing={0} align="stretch">
      <TopBar />
      <Container flex="1" py={8} maxW="container.lg">
        {children}
      </Container>
      <Footer />
    </VStack>
  );
};

export default LayoutPainel;
