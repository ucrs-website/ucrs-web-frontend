import React from "react";
import HeaderNavigation from "./HeaderNavigation";

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  transparent?: boolean;
}

const Header: React.FC<HeaderProps> = () => {
  return <HeaderNavigation />;
};

export default Header;
