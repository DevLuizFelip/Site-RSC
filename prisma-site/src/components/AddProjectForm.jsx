// src/components/AddProjectForm.jsx

import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

function AddProjectForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Residencial');
  const [files, setFiles] = useState([]); // Agora vamos gerenciar isso como um array
  const [status, setStatus] = useState('');
  const [uploading, setUploading] = useState(false);

  // NOVO ESTADO: para guardar as URLs de pré-visualização das imagens
  const [imagePreviews, setImagePreviews] = useState([]);

  // NOVO: useEffect para limpar as URLs de pré-visualização da memória.
  // Isso é uma boa prática para evitar "memory leaks" (vazamentos de memória).
  useEffect(() => {
    // Retorna uma função de limpeza que será executada quando o componente for desmontado
    return () => {
      imagePreviews.forEach(url => URL.revokeObjectURL(url));
    };
  }, [imagePreviews]);

  const handleFileChange = (e) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles(selectedFiles);

      // Limpa pré-visualizações antigas antes de criar novas
      imagePreviews.forEach(url => URL.revokeObjectURL(url));
      
      // Cria as URLs de pré-visualização para os novos arquivos
      const newImagePreviews = selectedFiles.map(file => URL.createObjectURL(file));
      setImagePreviews(newImagePreviews);
    }
  };

  // NOVO: Função para remover uma imagem da seleção antes do upload
  const handleRemoveImage = (indexToRemove) => {
    // Remove a URL de pré-visualização
    const newImagePreviews = imagePreviews.filter((_, index) => index !== indexToRemove);
    setImagePreviews(newImagePreviews);

    // Remove o arquivo correspondente da lista de arquivos para upload
    const newFiles = files.filter((_, index) => index !== indexToRemove);
    setFiles(newFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length === 0) {
      setStatus('Por favor, selecione pelo menos uma imagem.');
      return;
    }
    setUploading(true);
    setStatus('Enviando imagens...');

    const uploadPromises = files.map(async (file) => {
      const fileName = `${Date.now()}_${file.name}`;
      const { error } = await supabase.storage.from('project-images').upload(fileName, file);
      if (error) throw error;
      return fileName;
    });

    try {
      const fileNames = await Promise.all(uploadPromises);
      const imageUrls = fileNames.map(fileName => {
        const { data } = supabase.storage.from('project-images').getPublicUrl(fileName);
        return data.publicUrl;
      });

      setStatus('Salvando projeto...');
      const { error: insertError } = await supabase.from('projects').insert([{
        title, description, category, image_urls: imageUrls
      }]);
      if (insertError) throw insertError;

      setStatus('Projeto adicionado com sucesso!');
      setTitle('');
      setDescription('');
      setCategory('Residencial');
      setFiles([]);
      setImagePreviews([]); // Limpa as pré-visualizações
      e.target.reset();

    } catch (error) {
      console.error("Erro ao adicionar projeto:", error);
      setStatus(`Erro: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h2>Adicionar Novo Projeto</h2>
      <form onSubmit={handleSubmit} className="contact-form add-project-form">
        <div className="form-group">
          <label>Título do Projeto</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Categoria</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="Residencial">Residencial</option>
            <option value="Comercial">Comercial</option>
            <option value="Agronegócio">Agronegócio</option>
          </select>
        </div>
        <div className="form-group">
          <label>Descrição</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows="4" required></textarea>
        </div>
        <div className="form-group">
          <label>Imagens do Projeto (selecione múltiplas)</label>
          <input type="file" onChange={handleFileChange} multiple accept="image/*" />
        </div>
        
        {/* NOVO: Seção para renderizar as pré-visualizações das imagens */}
        {imagePreviews.length > 0 && (
          <div className="image-preview-container">
            {imagePreviews.map((previewUrl, index) => (
              <div key={index} className="preview-item">
                <img src={previewUrl} alt={`Pré-visualização ${index + 1}`} className="preview-image" />
                <button type="button" onClick={() => handleRemoveImage(index)} className="remove-image-btn">
                  &times;
                </button>
              </div>
            ))}
          </div>
        )}

        <button type="submit" className="submit-btn" disabled={uploading} style={{marginTop: '1.5rem'}}>
          {uploading ? 'Enviando...' : 'Adicionar Projeto'}
        </button>
        {status && <p style={{ marginTop: '1rem', textAlign: 'center' }}>{status}</p>}
      </form>
    </div>
  );
}

export default AddProjectForm;