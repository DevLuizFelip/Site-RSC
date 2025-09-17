import React from 'react';

function ContactModal({ contact, onClose }) {
  if (!contact) {
    return null;
  }

  // Função para limpar o número de telefone, removendo caracteres não numéricos
  // Isso garante que os links 'tel:' e 'wa.me' funcionem corretamente
  const cleanPhoneNumber = (phone) => {
    return phone.replace(/[^0-9]/g, '');
  };

  const phoneNumber = contact.phone ? cleanPhoneNumber(contact.phone) : '';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="contact-modal-content" onClick={(e) => e.stopPropagation()}>
        <header className="contact-modal-header">
          <h3>Detalhes do Contato</h3>
          <button onClick={onClose} className="modal-close">&times;</button>
        </header>
        <div className="contact-modal-body">
          <p><strong>Nome:</strong> {contact.name}</p>
          <p><strong>Email:</strong> {contact.email}</p>
          {contact.phone && <p><strong>Telefone:</strong> {contact.phone}</p>}
          <p><strong>Mensagem:</strong></p>
          <p className="message-text">{contact.message}</p>
        </div>
        <footer className="contact-modal-footer">
          {phoneNumber && (
            <>
              {/* O href 'tel:' abre o discador do celular ou app de chamada no desktop */}
              <a href={`tel:${phoneNumber}`} className="action-btn call-btn">
                Ligar
              </a>
              {/* O link wa.me abre uma conversa no WhatsApp. Assumimos DDI 55 para o Brasil. */}
              <a 
                href={`https://wa.me/55${phoneNumber}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="action-btn whatsapp-btn"
              >
                Chamar no WhatsApp
              </a>
            </>
          )}
        </footer>
      </div>
    </div>
  );
}

export default ContactModal;