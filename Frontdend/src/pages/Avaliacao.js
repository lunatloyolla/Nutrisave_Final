import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api'; // Importe o serviço api
import './Avaliacao.css';

const Avaliacao = () => {
  const { alimento } = useParams();
  const [comentario, setComentario] = useState('');
  const navigate = useNavigate();

  const handlePublicar = () => {
    // Envia o comentário para o backend
    api.post('/comentarios', { alimento, comentario })
      .then(() => {
        alert('Comentário publicado!');
        navigate(`/alimento/${alimento}`);
      })
      .catch(error => console.error(error));
  };

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
        <h2>AVALIE A RECEITA</h2>
        <textarea
          placeholder="Digite um comentário..."
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
        />
        <button onClick={handlePublicar}>Publicar</button>
      </section>

      <footer>
        <button onClick={() => navigate(`/alimento/${alimento}`)}>Voltar</button>
      </footer>
    </div>
  );
};

export default Avaliacao;