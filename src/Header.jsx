// src/Header.jsx
import React from 'react';
import styled from "styled-components";

const HeaderContainer = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 2dvw;
  position: fixed;
  z-index: 1000;
      @media (max-width: 1100px) {
    padding: 5dvw;
  }
`;

const Logo = styled.img`
  height: 4vw; /* Ajuste la taille du logo */
  width: auto;
    @media (max-width: 1100px) {
    height: 9dvw;
    width: auto;
  }
    @media (max-width: 700px) {
    height: 12dvw;
    width: auto;
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Logo src="/logo.svg" alt="Mon Logo" /> {/* Change le chemin du logo */}
    </HeaderContainer>
  );
}

export default Header;