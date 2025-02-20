import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api'; 
import './AlimentoEspecificado.css';
import lupa from './assets/lupa.svg'
import folha from './assets/folha.svg'

const AlimentoEspecificado = () => {
  const { alimento } = useParams();
  const [dadosAlimento, setDadosAlimento] = useState(null);
  const [dadosReceita, setDadosReceita] = useState(null);
  const [dadosTabela, setDadosTabela] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const alimentosResponse = await api.get('/alimentos');
        const alimentoEncontrado = alimentosResponse.data.find(item => item.nome === alimento);

        if (!alimentoEncontrado) {
          console.warn("Alimento não encontrado");
          return;
        }

        setDadosAlimento(alimentoEncontrado);
        
        const tabelasResponse = await api.get('/tabelas');
        const tabelaNutricional = tabelasResponse.data.find(tabela => tabela._id === alimentoEncontrado.tabela);
        setDadosTabela(tabelaNutricional);

        const receitasResponse = await api.get('/receitas');
        const receitaEncontrada = receitasResponse.data.find(receita => receita._id === alimentoEncontrado.receita);
        setDadosReceita(receitaEncontrada);

      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, [alimento]);

  const handleSalvarReceita = async () => {
    try {
      const receitaSalva = {
        nome: dadosReceita.nome,
        link: dadosReceita.link,
        imagem: dadosReceita.imagem,
      };

      await api.post('/receitas/salvar', receitaSalva);
      alert("Receita salva com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar receita:", error);
      alert("Erro ao salvar receita.");
    }
  };

  if (!dadosAlimento) return <div>Carregando...</div>;

  return (
    <div>
      <header>
        <input placeholder="Pesquise uma receita..." /> 
        <button>
          <img src={lupa} alt="Lupa" />
        </button>
        <img src={folha} alt="Logo" />
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
          <>
            <button onClick={() => window.open(dadosReceita.link, '_blank')}>
              Ver Receita
            </button>
            <button onClick={handleSalvarReceita}>
              Salvar Receita
            </button>
          </>
        )}
      </footer>
    </div>
  );
};

export default AlimentoEspecificado;