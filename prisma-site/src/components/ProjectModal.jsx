// src/components/ProjectModal.jsx

import { useState, useEffect } from 'react';

function ProjectModal({ project, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Efeito para permitir fechar o modal com a tecla 'Esc'
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  if (!project) return null;

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? project.image_urls.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === project.image_urls.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    // O onClick aqui permite fechar o modal clicando no fundo escuro
    <div className="modal-overlay" onClick={onClose}>
      {/* e.stopPropagation() impede que o clique dentro do modal feche o modal */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* O botão de fechar */}
        <button onClick={onClose} className="modal-close">&times;</button>
        
        <div className="modal-gallery">
          {project.image_urls.length > 1 && (
            <button onClick={goToPrevious} className="modal-arrow left">❮</button>
          )}
          <img src={project.image_urls[currentIndex]} alt={`${project.title} - Imagem ${currentIndex + 1}`} />
          {project.image_urls.length > 1 && (
            <button onClick={goToNext} className="modal-arrow right">❯</button>
          )}
        </div>
        <h3>{project.title}</h3>
        <p>{project.description || project.category}</p>
      </div>
    </div>
  );
}

export default ProjectModal;