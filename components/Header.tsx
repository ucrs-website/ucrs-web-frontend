"use client";

import React from "react";
import Container from "./Container";
import HeaderNavigation from "./HeaderNavigation";

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  transparent?: boolean;
}

const Header: React.FC<HeaderProps> = () => {
  return (
    <div className="flex-1">
      <Container>
        <HeaderNavigation />
      </Container>
    </div>
  );
};

export default Header;
