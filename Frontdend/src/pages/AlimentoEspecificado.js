import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api'; // Importe o serviço API
import './AlimentoEspecificado.css';

const AlimentoEspecificado = () => {
  const { alimento } = useParams();
  const [dadosAlimento, setDadosAlimento] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Busca os dados do alimento no backend
       api.get(`/alimentos/${alimento}`)
      .then(response => setDadosAlimento(response.data))
      .catch(error => console.error(error));
  }, [alimento]);

  if (!dadosAlimento) return <div>Carregando...</div>;

  return (
    <div>
      <header>
        <input placeholder="Pesquise uma receita..." />
        <button>
          <img src="assets/image1.svg" alt="Lupa" />
        </button>
        <img src="assets/folha.svg" alt="Logo" />
      </header>

      <section>
        <div className="CardAlimento">
          <img src={dadosAlimento.imagem} alt={dadosAlimento.nome} />
          <h3>{dadosAlimento.nome}</h3>
        </div>
        <div className="InfoAlimento">
          <h3>Tabela Nutricional</h3>
          <img 
            src={dadosAlimento.tabela} 
            alt={`Tabela Nutricional de ${dadosAlimento.nome}`} 
            className="TabelaNutricional"
          />
        </div>
      </section>

      <footer>
        <button onClick={() => navigate('/inicial')}>Voltar</button>
        <button onClick={() => navigate(`/avaliacao/${alimento}`)}>Avaliar Receita</button>
      </footer>
    </div>
  );
};

export default AlimentoEspecificado;
