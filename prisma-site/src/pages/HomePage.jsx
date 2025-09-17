// src/pages/HomePage.jsx

import { FaDraftingCompass, FaHardHat, FaRegBuilding } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Testimonials from '../components/Testimonials';

const ServiceCard = ({ icon, title, description }) => (
  <div className="service-card">
    <div className="service-icon">{icon}</div>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

function HomePage() {
  return (
    <>
      {/* SEÇÃO HERO */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <h1>Soluções em Engenharia</h1>
          <p>Projetamos e construímos o futuro, unindo criatividade e precisão técnica para entregar resultados excepcionais.</p>
          <Link to="/projetos" className="btn btn-primary">Conheça Nossos Projetos</Link>
          <div className="hero-stats">
            <div className="stat">
              <strong>+20</strong>
              <span>Anos de experiência</span>
            </div>
            <div className="stat">
              <strong>+280</strong>
              <span>Projetos Entregues</span>
            </div>
            <div className="stat">
              <strong>100%</strong>
              <span>Satisfação Garantida</span>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO DE SERVIÇOS */}
      <section className="container services-section">
        <h2 className="section-title">Nossos Serviços</h2>
        <p className="section-subtitle">Oferecemos uma gama completa de soluções para atender a todas as etapas do seu projeto.</p>
        <div className="services-grid">
          <ServiceCard 
            icon={<FaHardHat />} 
            title="Gestão de Obras" 
            description="Acompanhamento e supervisão completa da construção, do planejamento à entrega, assegurando qualidade e cumprimento de prazos." 
          />
          <ServiceCard 
            icon={<FaDraftingCompass />} 
            title="Projetos Arquitetônicos" 
            description="Criação de projetos residenciais, comerciais e industriais com foco em design, funcionalidade e aproveitamento de espaço." 
          />
          <ServiceCard 
            icon={<FaRegBuilding />} 
            title="Cálculo Estrutural" 
            description="Análise e dimensionamento de estruturas em concreto armado e metálicas, garantindo segurança e otimização de materiais." 
          />
          
        </div>
      </section>

      {/* SEÇÃO DE DEPOIMENTOS (no lugar correto) */}
      <Testimonials />
    </>
  );
}

export default HomePage;