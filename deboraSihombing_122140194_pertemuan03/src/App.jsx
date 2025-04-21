import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BookProvider } from './context/BookContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Stats from './pages/Stats';
import NotFound from './pages/NotFound';
import './App.css';

/**
 * Komponen utama aplikasi
 */
function App() {
  return (
    <BookProvider>
      <BrowserRouter>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/stats" element={<Stats />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </BookProvider>
  );
}

export default App;