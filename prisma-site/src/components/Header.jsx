// src/components/Header.jsx

import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <Link to="/" className="logo">
        <img src="/rsc-logo.png" alt="RSC & Engenharia Logo" className="logo-img" />
      </Link>
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/sobre">O Escritório</Link>
        <Link to="/servicos">Serviços</Link>
        <Link to="/projetos">Projetos</Link>
        <Link to="/contato">Contato</Link>
      </nav>
    </header>
  );
}

export default Header;