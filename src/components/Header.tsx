import React from 'react';

interface HeaderProps {
  text: string;
}

export const Header = ({ text }) => {
  return <h2 className="header">{text}</h2>;
};
