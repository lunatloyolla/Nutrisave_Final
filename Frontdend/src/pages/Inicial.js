import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; 
import './Inicial.css';
import lupa from './assets/lupa.svg'
import folha from './assets/folha.svg'

const Inicial = () => {
  const [alimentos, setAlimentos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/alimentos")
      .then(response => setAlimentos(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleAlimentoClick = (alimento) => {
    navigate(`/alimento/${alimento}`);
  };

  return (
    <div>
      <div className="inlineDiv">
        <input placeholder="Pesquise uma receita..." />
        <button>
          <img src={lupa} alt="Lupa" />
        </button>
        <img src={folha} alt="Logo" />
      </div>

      <div className="FlexDiv">
        <h1>Principais Informações</h1>
        <h1>Alimentos mais pesquisados</h1>
      </div>

      <div className="content">
        {alimentos.map((alimento) => (
          <div key={alimento._id} className="alimentos">
            <img src={alimento.imagem} alt={alimento.nome} />
            <button onClick={() => handleAlimentoClick(alimento.nome)}>{alimento.nome}</button>
          </div>
        ))}
      </div>

      <button onClick={() => navigate('/salvos')}>Receitas Salvas</button>
    </div>
  );
};

export default Inicial;