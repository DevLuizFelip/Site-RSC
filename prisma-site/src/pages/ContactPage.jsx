import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'; // Ícones

function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState('');

  // ... (funções handleChange e handleSubmit continuam as mesmas)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Enviando...');
    const { error } = await supabase.from('contacts').insert([formData]);
    if (error) {
      console.error('Erro ao enviar mensagem:', error);
      setStatus('Ocorreu um erro. Tente novamente.');
    } else {
      setStatus('Mensagem enviada com sucesso! Entraremos em contato em breve.');
      setFormData({ name: '', email: '', phone: '', message: '' });
    }
  };

  return (
    <div className="container contact-page-container">
      <h1 className="section-title">Vamos Conversar sobre seu Projeto</h1>
      <div className="contact-layout">
        <div className="contact-info-section">
          <h3>Informações de Contato</h3>
          <p>Entre em contato conosco por qualquer um dos canais abaixo ou preencha o formulário ao lado.</p>
          <ul className="contact-list">
            <li><FaMapMarkerAlt /> <span>São Paulo, SP</span></li>
            <li><FaPhone /> <span>(11) 99648-4696</span></li>
            <li><FaEnvelope /> <span>rsceng@outlook.com</span></li>
          </ul>
        </div>
        <div className="contact-form-wrapper">
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Nome Completo</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Telefone / WhatsApp</label>
              <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="message">Fale sobre o seu projeto</label>
              <textarea id="message" name="message" rows="5" value={formData.message} onChange={handleChange} required></textarea>
            </div>
            <button type="submit" className="btn btn-primary full-width">Enviar Mensagem</button>
          </form>
          {status && <p style={{ textAlign: 'center', marginTop: '1rem' }}>{status}</p>}
        </div>
      </div>
    </div>
  );
}

export default ContactPage;