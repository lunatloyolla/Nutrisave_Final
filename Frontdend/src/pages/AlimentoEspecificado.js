import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api'; // Serviço API
import './AlimentoEspecificado.css';

const AlimentoEspecificado = () => {
  const { alimento } = useParams();
  const [dadosAlimento, setDadosAlimento] = useState(null);
  const [dadosReceita, setDadosReceita] = useState(null);
  const [dadosTabela, setDadosTabela] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Buscar todos os alimentos
        const alimentosResponse = await api.get('/alimentos');
        const alimentoEncontrado = alimentosResponse.data.find(item => item.nome === alimento);

        if (!alimentoEncontrado) {
          console.warn("Alimento não encontrado");
          return;
        }

        setDadosAlimento(alimentoEncontrado);

        // Buscar tabela nutricional correspondente
        const tabelasResponse = await api.get('/tabelas');
        const tabelaNutricional = tabelasResponse.data.find(tabela => tabela._id === alimentoEncontrado.tabela);
        setDadosTabela(tabelaNutricional);

        // Buscar a receita correspondente
        const receitasResponse = await api.get('/receitas');
        const receitaEncontrada = receitasResponse.data.find(receita => receita._id === alimentoEncontrado.receita);
        setDadosReceita(receitaEncontrada);

      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, [alimento]);

  if (!dadosAlimento) return <div>Carregando...</div>;

  return (
    <div>
      <header>
        <input placeholder="Pesquise uma receita..." /> 
        <button>
        <img src="./assets/image1.svg" alt="Lupa" />
        </button>
        <img src="./assets/folha.svg" alt="Logo" />
      </header>

      <section>
        <div className="CardAlimento">
          <img src={dadosAlimento.imagem} alt={dadosAlimento.nome} />
          <h3>{dadosAlimento.nome}</h3>
        </div>

        <button
          className="botaoTabela"
          onClick={() => window.location.href = dadosTabela.url}
        >
          Clique aqui para ver a tabela
        </button>
      </section>

      <footer>
        <button onClick={() => navigate('/inicial')}>Voltar</button>
        <button onClick={() => navigate(`/avaliacao/${alimento}`)}>Avaliar Receita</button>
        {dadosReceita && (
          <button onClick={() => window.open(dadosReceita.link, '_blank')}>
            Ver Receita
          </button>
        )}
      </footer>
    </div>
  );
};

export default AlimentoEspecificado;
