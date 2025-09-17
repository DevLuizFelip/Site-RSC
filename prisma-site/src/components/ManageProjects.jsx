import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

function ManageProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProjects() {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) console.error("Erro ao buscar projetos:", error);
      else setProjects(data);
      setLoading(false);
    }
    getProjects();
  }, []);

  const handleDeleteProject = async (project) => {
    // Confirmação para evitar exclusão acidental
    if (!window.confirm(`Tem certeza que deseja remover o projeto "${project.title}"? Esta ação não pode ser desfeita.`)) {
      return;
    }

    try {
      // 1. Remover as imagens do Storage
      const filePaths = project.image_urls.map(url => {
        // Extrai o caminho do arquivo da URL completa
        return url.substring(url.lastIndexOf('/project-images/') + 15);
      });
      
      const { error: storageError } = await supabase.storage.from('project-images').remove(filePaths);
      if (storageError) throw storageError;

      // 2. Remover o projeto do banco de dados
      const { error: dbError } = await supabase.from('projects').delete().eq('id', project.id);
      if (dbError) throw dbError;

      // 3. Atualizar a lista na tela
      setProjects(projects.filter(p => p.id !== project.id));
      alert('Projeto removido com sucesso!');

    } catch (error) {
      alert('Ocorreu um erro ao remover o projeto.');
      console.error(error);
    }
  };

  if (loading) return <p>Carregando projetos...</p>;

  return (
    <div className="manage-projects-list">
      <h2>Gerenciar Projetos</h2>
      {projects.map(project => (
        <div key={project.id} className="project-manage-item">
          <img src={project.image_urls[0]} alt={project.title} className="project-thumbnail" />
          <div className="project-details">
            <h4>{project.title}</h4>
            <p>{project.category}</p>
          </div>
          <button onClick={() => handleDeleteProject(project)} className="delete-btn">
            Remover
          </button>
        </div>
      ))}
    </div>
  );
}

export default ManageProjects;