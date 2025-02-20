import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; 
import './ReceitasSalvas.css';
import lupa from './assets/lupa.svg'
import folha from './assets/folha.svg'

const ReceitasSalvas = () => {
  const [receitas, setReceitas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/receitas/salvas')
      .then(response => {
        console.log("Dados recebidos:", response.data); 
        setReceitas(response.data);
    })
      .catch(error => console.error("Erro ao buscar receitas salvas:", error));
  }, []);

  return (
    <div>
      <header>
        <h1>Receitas Salvas</h1>
        <input placeholder="Pesquise uma receita..." />
        <button>
          <img src={lupa} alt="Lupa" />
        </button>
        <img src={folha} alt="Logo" />
      </header>

      <section>
        {receitas.length > 0 ? (
          receitas.map((receita) => (
            <div key={receita._id} className="card">
              <img src={receita.imagem} alt={receita.nome} />
              <p>{receita.nome}</p>
              <a href={receita.link} target="_blank" rel="noopener noreferrer">Ver Receita</a>
            </div>
          ))
        ) : (
          <p>Nenhuma receita salva encontrada.</p>
        )}
      </section>

      <footer>
        <button onClick={() => navigate('/inicial')}>Voltar</button>
      </footer>
    </div>
  );
};

export default ReceitasSalvas;