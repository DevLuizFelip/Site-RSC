// src/components/Footer.jsx

import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-about">
          <h3 className="logo">RSC&ENGENHARIA</h3>
          <p>Arquitetura e Engenharia Integradas. Transformando ideias em realidade.</p>
        </div>
        <div className="footer-links">
          <h4>Navegação</h4>
          <ul>
            <li><Link to="/sobre">O Escritório</Link></li>
            <li><Link to="/servicos">Serviços</Link></li>
            <li><Link to="/projetos">Projetos</Link></li>
            <li><Link to="/contato">Contato</Link></li>
          </ul>
        </div>
        <div className="footer-social">
          <h4>Siga-nos</h4>
          <div className="social-icons">
            <a href="#" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="#" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="#" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} RSC&ENGENHARIA - Arquitetura & Engenharia. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;