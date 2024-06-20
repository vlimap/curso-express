import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/layout/header'
import Footer from './components/layout/footer'
import Homepage from './pages/homepage'
import Contact from './pages/contact'
import About from './pages/about'
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <main className='container mt-5'>
        <Routes>
          <Route exact path="/" element={ <Homepage/> } />
          <Route path="/contact" element={ <Contact/> } />
          <Route path="/about" element={ <About/> } />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;