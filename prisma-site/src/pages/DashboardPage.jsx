// src/pages/DashboardPage.jsx

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import ViewContacts from '../components/ViewContacts';
import AddProjectForm from '../components/AddProjectForm';
import ManageProjects from '../components/ManageProjects';
import ManageTestimonials from '../components/ManageTestimonials'; // 1. VERIFIQUE SE ESTE IMPORT ESTÁ AQUI
import '../Dashboard.css';

function DashboardPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [view, setView] = useState('contacts');

  useEffect(() => {
    async function checkUser() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/login');
      } else {
        setUser(session.user);
      }
    }
    checkUser();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="container dashboard-page">
      <header className="dashboard-header">
        <h2>Painel Administrativo</h2>
        <nav className="dashboard-nav">
          <button onClick={() => setView('contacts')} className={view === 'contacts' ? 'active' : ''}>
            Ver Contatos
          </button>
          <button onClick={() => setView('addProject')} className={view === 'addProject' ? 'active' : ''}>
            Adicionar Projeto
          </button>
          <button onClick={() => setView('manageProjects')} className={view === 'manageProjects' ? 'active' : ''}>
            Gerenciar Projetos
          </button>
          
          {/* 2. ESTE É O BOTÃO QUE ESTAVA FALTANDO 👇 */}
          <button onClick={() => setView('manageTestimonials')} className={view === 'manageTestimonials' ? 'active' : ''}>
            Moderar Avaliações
          </button>

          <button onClick={handleLogout} className="logout-btn">
            Sair
          </button>
        </nav>
      </header>
      
      <div className="dashboard-content">
        {view === 'contacts' && <ViewContacts />}
        {view === 'addProject' && <AddProjectForm />}
        {view === 'manageProjects' && <ManageProjects />}

        {/* 3. ESTA LINHA MOSTRA O COMPONENTE QUANDO O BOTÃO É CLICADO 👇 */}
        {view === 'manageTestimonials' && <ManageTestimonials />}
      </div>
    </div>
  );
}

export default DashboardPage;