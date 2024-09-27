import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListaHoteis from './components/ListaHoteis';
import AdicionarHotel from './components/AdicionarHotel';
import EditarHotel from './components/EditarHotel';
import HotelDetalhes from './components/HotelDetalhes';
import './App.css'; // Para garantir o uso do CSS

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedDarkMode = JSON.parse(localStorage.getItem('darkMode'));
    if (savedDarkMode) {
      setIsDarkMode(savedDarkMode);
      document.body.classList.add('dark-mode');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('darkMode', JSON.stringify(newMode));
    if (newMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  };

  return (
    <Router>
      <div className={`app-container ${isDarkMode ? 'dark-mode' : ''}`}>
        <button className="theme-toggle-btn" onClick={toggleDarkMode}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7.5 7.5 0 0021 12.79z" />
          </svg>
        </button>

        <Routes>
          <Route path="/" element={<ListaHoteis />} />
          <Route path="/adicionar" element={<AdicionarHotel />} />
          <Route path="/editar/:id" element={<EditarHotel />} />
          <Route path="/detalhes/:id" element={<HotelDetalhes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
