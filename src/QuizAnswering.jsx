import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../src/style/quizform.css';

export default function QuizAnswering({ config }) {
  const [perguntas, setPerguntas] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [resultados, setResultados] = useState({});
  const [pontuacao, setPontuacao] = useState(0);
  const [quizFinalizado, setQuizFinalizado] = useState(false);
  const [respostaSelecionada, setRespostaSelecionada] = useState(null);

  useEffect(() => {
    async function fetchPerguntas() {
      try {
        const { data } = await axios.get('http://localhost:27017/api', {
          params: {
            materia: config.materia,
            dificuldade: config.dificuldade,
            tipo: config.tipo,
            limit: config.numeroDeQuestoes,
          },
        });
        setPerguntas(data.results);
      } catch (error) {
        console.error('Erro ao buscar perguntas:', error);
      }
    }
    fetchPerguntas();
  }, [config]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (!quizFinalizado) {
        event.preventDefault();
        event.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [quizFinalizado]);

  const handleAnswer = (perguntaId, resposta, respostaCorreta, explicacao) => {
    if (!respostaSelecionada) {  // Verifica se já foi selecionada uma resposta
      const isCorreta = resposta === respostaCorreta;

      setResultados({
        [perguntaId]: { correta: isCorreta, explicacao: explicacao }
      });
      
      if (isCorreta) {
        setPontuacao((prevPontuacao) => prevPontuacao + 10);
      }

      setRespostaSelecionada(resposta); // Marca a resposta como selecionada
    }
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < perguntas.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setRespostaSelecionada(null); // Limpa a resposta selecionada para a próxima pergunta
      setResultados({});
    } else {
      setQuizFinalizado(true);
    }
  };

  const currentQuestion = perguntas[currentQuestionIndex];
  const currentResult = resultados[currentQuestion?.id];
  const progresso = ((currentQuestionIndex + 1) / perguntas.length) * 100;

  return (
    <div className="question-container">
      {/* Barra de Progresso */}
      <div className="progress-bar-container">
        <div 
          className="progress-bar" 
          style={{ width: `${progresso}%` }}
        ></div>
      </div>

      {!quizFinalizado ? (
        currentQuestion && (
          <>
            <p className="question-text">{currentQuestion.pergunta}</p>
            <ul className="answer-list">
              {[...currentQuestion.respostas_incorretas, currentQuestion.resposta_correta]
                .sort()
                .map((resposta, idx) => (
                  <li 
                    key={idx} 
                    className={`answer-item ${respostaSelecionada ? 'disabled' : ''}`} 
                    onClick={() => handleAnswer(currentQuestion.id, resposta, currentQuestion.resposta_correta, currentQuestion.explicacao)}
                    style={{ pointerEvents: respostaSelecionada ? 'none' : 'auto' }}
                  >
                    {resposta}
                  </li>
                ))}
            </ul>

            {currentResult && (
              <div className={`feedback ${currentResult.correta ? 'correct' : 'incorrect'}`}>
                <p>{currentResult.correta ? 'Resposta Correta!' : 'Resposta Incorreta.'}</p>
                <p><strong>Explicação:</strong> {currentResult.explicacao}</p>
              </div>
            )}

            <button 
              className="next-button" 
              onClick={goToNextQuestion}
              disabled={!respostaSelecionada} // Desabilita o botão até que uma resposta seja selecionada
            >
              {currentQuestionIndex < perguntas.length - 1 ? 'Próxima' : 'Finalizar Quiz'}
            </button>
          </>
        )
      ) : (
        <div className="quiz-complete-message">
          <h2>Quiz Completo!</h2>
          <p>Sua pontuação final: <strong>{pontuacao}</strong> pontos</p>
          <p>Obrigado por participar!</p>
        </div>
      )}
    </div>
  );
}
