import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import ContactModal from './ContactModal';

function ViewContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);

  async function getContacts() {
    setLoading(true);
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('is_completed', { ascending: true }) // Ordena para mostrar não concluídos primeiro
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error("Erro ao buscar contatos:", error);
    } else {
      setContacts(data);
    }
    setLoading(false);
  }

  useEffect(() => {
    getContacts();
  }, []);

  // NOVO: Função para marcar um contato como concluído/pendente
  const handleToggleComplete = async (contact) => {
    const { error } = await supabase
      .from('contacts')
      .update({ is_completed: !contact.is_completed })
      .eq('id', contact.id);

    if (error) {
      alert('Erro ao atualizar o status do contato.');
      console.error(error);
    } else {
      // Atualiza a lista localmente para refletir a mudança instantaneamente
      setContacts(contacts.map(c => 
        c.id === contact.id ? { ...c, is_completed: !c.is_completed } : c
      ));
    }
  };

  const handleContactClick = (contact) => setSelectedContact(contact);
  const handleCloseModal = () => setSelectedContact(null);

  if (loading) return <p>Carregando contatos...</p>;

  return (
    <div className="contacts-list">
      <h2>Mensagens Recebidas</h2>
      {contacts.length === 0 ? (
        <p>Nenhuma mensagem recebida ainda.</p>
      ) : (
        <ul>
          {contacts.map(contact => (
            // NOVO: Adiciona uma classe 'completed' para estilização
            <li key={contact.id} className={contact.is_completed ? 'contact-item completed' : 'contact-item'}>
              <div onClick={() => handleContactClick(contact)} className="contact-info">
                <p><strong>Nome:</strong> {contact.name}</p>
                <p className="meta">Recebido em: {new Date(contact.created_at).toLocaleDateString('pt-BR')}</p>
              </div>
              {/* NOVO: Botão para concluir/reabrir */}
              <button onClick={() => handleToggleComplete(contact)} className="complete-btn">
                {contact.is_completed ? 'Reabrir' : 'Concluir'}
              </button>
            </li>
          ))}
        </ul>
      )}
      <ContactModal contact={selectedContact} onClose={handleCloseModal} />
    </div>
  );
}

export default ViewContacts;