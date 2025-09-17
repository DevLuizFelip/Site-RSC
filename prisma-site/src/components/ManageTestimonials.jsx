// src/components/ManageTestimonials.jsx

import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

function ManageTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchTestimonials() {
    setLoading(true);
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) console.error(error);
    else setTestimonials(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleUpdateStatus = async (id, newStatus) => {
    const { error } = await supabase
      .from('testimonials')
      .update({ status: newStatus })
      .eq('id', id);

    if (error) {
      alert('Erro ao atualizar status.');
      console.error(error);
    } else {
      setTestimonials(testimonials.map(t => t.id === id ? { ...t, status: newStatus } : t));
    }
  };

  // NOVO: Função para remover um depoimento permanentemente
  const handleDelete = async (testimonialId) => {
    // Passo 1: Confirmação para evitar remoção acidental
    if (!window.confirm("Tem certeza que deseja remover esta avaliação permanentemente? Esta ação não pode ser desfeita.")) {
      return;
    }

    try {
      // Passo 2: Comando para remover do Supabase
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', testimonialId);
      
      if (error) throw error;

      // Passo 3: Atualiza a lista na tela para remover o item deletado
      setTestimonials(testimonials.filter(t => t.id !== testimonialId));
      alert("Avaliação removida com sucesso!");

    } catch (error) {
      alert("Ocorreu um erro ao remover a avaliação.");
      console.error(error);
    }
  };


  const pending = testimonials.filter(t => t.status === 'pending');
  const other = testimonials.filter(t => t.status !== 'pending');

  if (loading) return <p>Carregando depoimentos...</p>;

  return (
    <div>
      <h2>Gerenciar Avaliações</h2>
      
      <h3>Pendentes de Aprovação ({pending.length})</h3>
      {pending.length > 0 ? pending.map(item => (
        <div key={item.id} className="testimonial-manage-item">
          <div className="details">
            <strong>{item.name}</strong> ({'★'.repeat(item.rating)}{'☆'.repeat(5 - item.rating)})
            <p><em>"{item.quote}"</em></p>
          </div>
          <div className="actions">
            <button onClick={() => handleUpdateStatus(item.id, 'approved')} className="approve-btn">Aprovar</button>
            <button onClick={() => handleUpdateStatus(item.id, 'rejected')} className="reject-btn">Rejeitar</button>
            {/* NOVO: Botão de remover */}
            <button onClick={() => handleDelete(item.id)} className="delete-btn">Remover</button>
          </div>
        </div>
      )) : <p>Nenhum depoimento pendente.</p>}

      <h3 style={{marginTop: '2rem'}}>Aprovados / Rejeitados ({other.length})</h3>
      {other.map(item => (
        <div key={item.id} className="testimonial-manage-item" style={{ opacity: 0.8 }}>
           <div className="details">
            <strong>{item.name}</strong> ({'★'.repeat(item.rating)}{'☆'.repeat(5 - item.rating)})
            <p><em>"{item.quote}"</em></p>
          </div>
          <div className="actions">
            <span className={`status-${item.status}`}>{item.status}</span>
            {/* NOVO: Botão de remover também para itens já moderados */}
            <button onClick={() => handleDelete(item.id)} className="delete-btn">Remover</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ManageTestimonials;