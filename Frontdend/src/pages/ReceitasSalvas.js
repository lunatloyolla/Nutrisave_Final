import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; // Importe o serviço api
import './ReceitasSalvas.css';

const ReceitasSalvas = () => {
  const [receitas, setReceitas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Busca as receitas salvas no backend
    api.get('/receitas/salvas')
      .then(response => setReceitas(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <header>
        <h1>Receitas Salvas</h1>
        <input placeholder="Pesquise uma receita..." />
        <button>
          <img src="assets/image1.svg" alt="Lupa" />
        </button>
        <img src="assets/folha.svg" alt="Logo" />
      </header>

      <section>
        {receitas.map((receita) => (
          <div key={receita._id} className="card">
            <img src={receita.imagem} alt={receita.nome} />
            <p>{receita.nome}</p>
            <a href={receita.link}>Ver Receita</a>
          </div>
        ))}
      </section>

      <footer>
        <button onClick={() => navigate('/inicial')}>Voltar</button>
      </footer>
    </div>
  );
};

export default ReceitasSalvas;