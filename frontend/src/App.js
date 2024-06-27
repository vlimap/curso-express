import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import HomePage from './pages/HomePage/HomePage';
import AboutPage from './pages/AboutPage/AboutPage';
import ContactPage from './pages/ContactPage/ContactPage';
import CadastrarUsuario from './modulos/usuario/services/CadastrarUsuario';
import LoginUsuario from './modulos/usuario/services/LoginUsuario';
import CadastrarAdministrador from './modulos/administrador/services/CadastrarAdministrador';
import LoginAdministrador from './modulos/administrador/services/LoginAdministrador';
import TipoLogin from './pages/LoginPage/TipoLogin';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <main className='container mt-5'>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/cadastrar-usuario" element={<CadastrarUsuario />} />
          <Route path="/login-usuario" element={<LoginUsuario />} />
          <Route path="/cadastrar-administrador" element={<CadastrarAdministrador />} />
          <Route path="/login-administrador" element={<LoginAdministrador />} />
          <Route path="/tipo-login" element={<TipoLogin />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
