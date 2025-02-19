import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Inicial from './pages/Inicial';
import AlimentoEspecificado from './pages/AlimentoEspecificado';
import ReceitasSalvas from './pages/ReceitasSalvas';
import Avaliacao from './pages/Avaliacao';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/inicial" element={<Inicial />} />
        <Route path="/alimento/:alimento" element={<AlimentoEspecificado />} />
        <Route path="/salvos" element={<ReceitasSalvas />} />
        <Route path="/avaliacao/:alimento" element={<Avaliacao />} />
      </Routes>
    </Router>
  );
};

export default App;