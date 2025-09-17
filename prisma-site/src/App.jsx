import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ReviewPage from './pages/ReviewPage';
import ProtectedRoute from './auth/ProtectedRoute';
import './App.css';

// Componente para decidir qual layout usar (com ou sem Header/Footer)
const MainLayout = ({ children }) => (
  <>
    <Header />
    <main>{children}</main>
    <Footer />
  </>
);

const AboutPage = () => <div className="container"><h1>Sobre o Escritório</h1><p>Em construção...</p></div>;
const ServicesPage = () => <div className="container"><h1>Serviços</h1><p>Em construção...</p></div>;


function App() {
  return (
    <Router>
      <Routes>
        {/* Rotas com Header e Footer */}
        <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
        <Route path="/sobre" element={<MainLayout><AboutPage /></MainLayout>} />
        <Route path="/servicos" element={<MainLayout><ServicesPage /></MainLayout>} />
        <Route path="/projetos" element={<MainLayout><ProjectsPage /></MainLayout>} />
        <Route path="/contato" element={<MainLayout><ContactPage /></MainLayout>} />
        <Route path="/avaliar" element={<MainLayout><ReviewPage /></MainLayout>} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* Rotas sem Header e Footer */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;