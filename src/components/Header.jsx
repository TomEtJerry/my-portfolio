// src/Header.jsx
import React from 'react';
import styled from "styled-components";
import { Link } from 'react-router-dom';  // ← importe Link

const HeaderContainer = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 2dvw;
  position: fixed;
  z-index: 1000;
      @media (max-width: 1000px) {
    padding: 5dvw;
  }
`;

const LogoLink = styled(Link)`      /* ← styled Link */
  display: inline-block;
`;

const Logo = styled.img`
  height: 3.5vw; /* Ajuste la taille du logo */
  width: auto;
  cursor: pointer;
    @media (max-width: 1400px) {
    height: 4dvw;
    width: auto;
  }
    @media (max-width: 1000px) {
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
      <LogoLink to="/">
        <Logo src="/logo.svg" alt="Mon Logo" /> {/* Change le chemin du logo */}
      </LogoLink>
    </HeaderContainer>
  );
}

export default Header;