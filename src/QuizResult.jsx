import React from 'react';
import '../src/style/quizresult.css';
import Sucess from '../src/images/winner-robot.png';
import Failure from '../src/images/robot-happy.png';

export default function QuizResult({ pontuacao, perguntas }) {
  const totalQuestoes = perguntas.length;
  const desempenho = (pontuacao / (totalQuestoes * 10)) * 100;

  const imagemResultado =
    desempenho >= 70
      ? Sucess
      : Failure;

      const handleReload = () => {
        window.location.reload();
      };

  return (
    <div className="quiz-result-container">
      <h2 className='h2'>Quiz Completo!</h2>
      <p className='p'>Sua pontuação final: <strong>{pontuacao}</strong> pontos</p>
      <p className='p'>Desempenho: <strong>{desempenho.toFixed(2)}%</strong></p>

      <div className="result-image">
        <img className='result-img' src={imagemResultado} alt={desempenho >= 70 ? 'Sucesso' : 'Falha'} />
      </div>

      <button onClick={handleReload} className="btn-nxt">
        Faça outro quiz
      </button>
    </div>
  );
}
