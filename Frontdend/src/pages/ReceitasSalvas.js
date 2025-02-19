import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ReceitasSalvas.css';

const ReceitasSalvas = () => {
  const navigate = useNavigate();

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
        <div className="card">
          <img src="assets/mousse.svg" alt="Mousse de Cupuaçu" />
          <p>Mousse de Cupuaçu</p>
          <a href="https://www.tudogostoso.com.br/receita/77491-creme-de-cupuacu.html">Ver Receita</a>
        </div>
        {/* Repetir para outras receitas */}
      </section>

      <footer>
        <button onClick={() => navigate('/inicial')}>Voltar</button>
      </footer>
    </div>
  );
};

export default ReceitasSalvas;