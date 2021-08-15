import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { InputContainer } from "Components";

const Container = styled.div`
  display: flex;
  background-color: #ffffff;
  flex-direction: column;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  position: relative;
  align-items: center;
`;

export const Add = () => {
  const { replace } = useHistory();
  return (
    <Container>
      <InputContainer onAdd={() => replace("/")} />
    </Container>
  );
};
