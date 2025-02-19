import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Inicial.css';

const Inicial = () => {
  const navigate = useNavigate();

  const handleAlimentoClick = (alimento) => {
    navigate(`/alimento/${alimento}`);
  };

  return (
    <div>
      <div className="inlineDiv">
        <input placeholder="Pesquise uma receita..." />
        <button>
          <img src="assets/image1.svg" alt="Lupa" />
        </button>
        <img src="assets/folha.svg" alt="Logo" />
      </div>

      <div className="FlexDiv">
        <h1>Principais Informações</h1>
        <h1>Alimentos mais pesquisados</h1>
      </div>

      <div className="content">
        <div className="alimentos">
          <img src="assets/cupuaçu.svg" alt="Cupuaçu" />
          <button onClick={() => handleAlimentoClick('Cupuaçu')}>Cupuaçu</button>
        </div>
        {/* Repetir para outros alimentos */}
      </div>

      <button onClick={() => navigate('/salvos')}>Receitas Salvas</button>
    </div>
  );
};

export default Inicial;