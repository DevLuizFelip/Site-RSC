// src/pages/ReviewPage.jsx

import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { FaStar } from 'react-icons/fa';

const StarRating = ({ rating, setRating }) => {
  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;
        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
            />
            <FaStar
              className="star"
              color={ratingValue <= rating ? "#ffc107" : "#e4e5e9"}
              size={30}
            />
          </label>
        );
      })}
    </div>
  );
};


function ReviewPage() {
  const [name, setName] = useState('');
  const [project, setProject] = useState('');
  const [quote, setQuote] = useState('');
  const [rating, setRating] = useState(0);
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      setStatus('Por favor, selecione uma nota de 1 a 5 estrelas.');
      return;
    }
    setStatus('Enviando sua avaliação...');

    const { error } = await supabase.from('testimonials').insert({
      name: name,
      company_or_project: project,
      quote: quote,
      rating: rating,
      status: 'pending' // Sempre entra como pendente para moderação
    });

    if (error) {
      setStatus('Ocorreu um erro. Por favor, tente novamente.');
      console.error(error);
    } else {
      setStatus('Obrigado! Sua avaliação foi enviada para aprovação.');
      setName('');
      setProject('');
      setQuote('');
      setRating(0);
    }
  };

  return (
    <div className="container">
      <h1 className="section-title">Deixe sua Avaliação</h1>
      <p className="section-subtitle">Ficamos felizes em ouvir sua opinião sobre nosso trabalho. Seu feedback é muito importante para nós.</p>

      <form onSubmit={handleSubmit} className="contact-form" style={{ maxWidth: '700px', margin: '0 auto' }}>
        <div className="form-group">
          <label>Seu Nome</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Empresa ou Projeto Realizado</label>
          <input type="text" value={project} onChange={(e) => setProject(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Sua Avaliação</label>
          <textarea value={quote} onChange={(e) => setQuote(e.target.value)} rows="5" required></textarea>
        </div>
        <div className="form-group">
            <label>Sua Nota</label>
            <StarRating rating={rating} setRating={setRating} />
        </div>
        <button type="submit" className="btn btn-primary full-width">Enviar Avaliação</button>
        {status && <p style={{ textAlign: 'center', marginTop: '1rem' }}>{status}</p>}
      </form>
    </div>
  );
}

export default ReviewPage;