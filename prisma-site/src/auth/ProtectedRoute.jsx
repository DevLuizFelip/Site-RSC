// src/auth/ProtectedRoute.jsx

import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

function ProtectedRoute({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Busca a sessão do usuário de forma assíncrona
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);
    };

    fetchSession();

    // Ouve por mudanças na autenticação (login/logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // Limpa a inscrição quando o componente for desmontado
    return () => subscription.unsubscribe();
  }, []);

  // Enquanto a verificação está acontecendo, não mostramos nada (ou um spinner de loading)
  if (loading) {
    return null; // ou <p>Carregando...</p>
  }

  // Se não houver sessão (usuário não logado), redireciona para a página de login
  if (!session) {
    return <Navigate to="/login" />;
  }

  // Se houver sessão (usuário logado), mostra o conteúdo protegido (a página Dashboard)
  return children;
}

export default ProtectedRoute;