import React from "react";
import { Container } from "../../components/Container";
import { FooterComponent } from "../../components/Footer";
import { H1 } from "../../components/H1";

export const NotFoundScreen = () => {
  return (
    <Container>
      <H1 title="Not Found" />
      <FooterComponent color="primary" />
    </Container>
  )
}
