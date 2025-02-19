import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Avaliacao.css';

const Avaliacao = () => {
  const { alimento } = useParams();
  const [comentario, setComentario] = useState('');
  const navigate = useNavigate();

  const handlePublicar = () => {
    // Simulação de publicação de comentário
    alert('Comentário publicado!');
    navigate(`/alimento/${alimento}`);
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