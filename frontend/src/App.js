import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

import './App.css';

// componente
function App() {
  return (
    <Router>
      <Header />
      <main className='container mt-5'>
        <Routes>
           <Route exact path="/" element={ <HomePage /> } />
           <Route path="/about" element={ <AboutPage />} />
           <Route path="/contact" element={ <ContactPage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
