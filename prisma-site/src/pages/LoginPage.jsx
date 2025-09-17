import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import '../Dashboard.css'; // Importando o CSS

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }
      navigate('/dashboard'); // Redireciona para a dashboard após o login
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-page">
        <div className="login-container">
            <div className="login-form-section">
                <h2>Acesso Restrito</h2>
                <form onSubmit={handleLogin} className="contact-form">
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Senha</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Entrar</button>
                    {error && <p className="error-message">{error}</p>}
                </form>
            </div>
            <div className="login-image-section">
                {/* Imagem de fundo via CSS */}
            </div>
        </div>
    </div>
  );
}

export default LoginPage;