// src/components/Header.jsx

import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa'; // Ícones de hambúrguer e 'X'

function Header() {
  // NOVO: Estado para controlar a abertura do menu mobile
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // NOVO: Função para alternar o estado do menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <Link to="/" className="logo">
        <img src="/rsc-logo.png" alt="RSC & Engenharia Logo" className="logo-img" />
      </Link>

      {/* NOVO: Classe condicional para abrir/fechar o menu */}
      <nav className={isMenuOpen ? "nav nav-open" : "nav"}>
        {/* Usamos NavLink para poder estilizar o link ativo, se desejar */}
        <NavLink to="/" onClick={toggleMenu}>Home</NavLink>
        <NavLink to="/sobre" onClick={toggleMenu}>O Escritório</NavLink>
        <NavLink to="/servicos" onClick={toggleMenu}>Serviços</NavLink>
        <NavLink to="/projetos" onClick={toggleMenu}>Projetos</NavLink>
        <NavLink to="/contato" onClick={toggleMenu}>Contato</NavLink>
      </nav>

      {/* NOVO: Botão Hambúrguer que só aparece no mobile */}
      <button className="hamburger-btn" onClick={toggleMenu}>
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </button>
    </header>
  );
}

export default Header;