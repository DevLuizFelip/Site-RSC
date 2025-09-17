// src/pages/ProjectsPage.jsx

import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import ProjectModal from '../components/ProjectModal'; // Verifique se o caminho está correto

function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('Todos');
  
  // Estado que controla qual projeto está no modal. Se for 'null', o modal está fechado.
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    setLoading(true);
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erro ao buscar projetos:', error);
    } else {
      setProjects(data);
      setFilteredProjects(data);
    }
    setLoading(false);
  }

  const handleFilter = (category) => {
    setActiveFilter(category);
    if (category === 'Todos') {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(p => p.category === category);
      setFilteredProjects(filtered);
    }
  };

  const categories = ['Todos', ...new Set(projects.map(p => p.category))];

  if (loading) return <p className="container">Carregando projetos...</p>;

  return (
    <div className="container projects-page">
      <h1 className="section-title">Nosso Portfólio</h1>
      <div className="filters">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => handleFilter(category)}
            className={activeFilter === category ? 'active' : ''}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="projects-grid">
        {filteredProjects.map(project => (
          // A MÁGICA ACONTECE AQUI: Este é um DIV clicável, não um link.
          // O onClick ativa a função que abre o modal com os dados do projeto clicado.
          <div key={project.id} className="project-card-styled" onClick={() => setSelectedProject(project)}>
            <div className="project-image-container">
              <img src={project.image_urls[0]} alt={project.title} />
            </div>
            <div className="project-card-content">
              <h3>{project.title}</h3>
              <span>{project.category}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Renderiza o modal APENAS se houver um projeto selecionado */}
      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} // A função onClose fecha o modal
        />
      )}
    </div>
  );
}

export default ProjectsPage;