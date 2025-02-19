import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AlimentoEspecificado.css';

const AlimentoEspecificado = () => {
  const { alimento } = useParams();
  const [dadosAlimento, setDadosAlimento] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/alimentos/${alimento}`)
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
          <img src={`assets/${alimento}.svg`} alt={alimento} />
          <h3>{alimento}</h3>
        </div>
        <div className="InfoAlimento">
          <table>
            <thead>
              <tr>
                <th>Componente</th>
                <th>Quantidade (100g)</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(dadosAlimento.componentes).map(([componente, quantidade]) => (
                <tr key={componente}>
                  <td>{componente}</td>
                  <td>{quantidade}</td>
                </tr>
              ))}
            </tbody>
          </table>
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