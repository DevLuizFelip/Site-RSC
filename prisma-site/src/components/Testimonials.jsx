// src/components/Testimonials.jsx

import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { supabase } from '../supabaseClient'; // Importe o Supabase

function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTestimonials() {
      setLoading(true);
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('status', 'approved'); // Puxa APENAS os aprovados

      if (error) {
        console.error(error);
      } else {
        setTestimonials(data);
      }
      setLoading(false);
    }
    fetchTestimonials();
  }, []);

  const settings = {
    // ... (as configurações do Slider continuam as mesmas)
    dots: true, infinite: true, speed: 500, slidesToShow: 1, slidesToScroll: 1, autoplay: true, autoplaySpeed: 5000, arrows: false
  };

  if (loading) return <div className="container"><p>Carregando depoimentos...</p></div>;
  if (testimonials.length === 0) return null; // Não mostra a seção se não houver depoimentos

  return (
    <section className="testimonials-section">
      <div className="container">
        <h2 className="section-title">O Que Nossos Clientes Dizem</h2>
        <Slider {...settings}>
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <p className="quote">"{testimonial.quote}"</p>
              <p className="author">{testimonial.name}</p>
              <p className="company">{testimonial.company_or_project}</p>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

export default Testimonials;