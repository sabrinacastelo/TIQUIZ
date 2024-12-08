import React, { useEffect, useState } from 'react';
import axios from 'axios';
import QuizResult from './QuizResult';
import '../src/style/quizanswering.css';

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
        event.returnValue = 'Você tem certeza de que deseja sair do quiz? Seu progresso será perdido.';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [quizFinalizado]);

  const handleAnswer = (perguntaId, resposta, respostaCorreta, explicacao) => {
    if (!respostaSelecionada) {
      const isCorreta = resposta === respostaCorreta;

      setResultados((prevResultados) => ({
        ...prevResultados,
        [perguntaId]: { correta: isCorreta, explicacao },
      }));

      if (isCorreta) {
        setPontuacao((prevPontuacao) => prevPontuacao + 10);
      }

      setRespostaSelecionada(resposta);
    }
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < perguntas.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setRespostaSelecionada(null);
      setResultados({});
    } else {
      setQuizFinalizado(true);
    }
  };

  const currentQuestion = perguntas[currentQuestionIndex];
  const currentResult = resultados[currentQuestion?.id];
  const progresso = ((currentQuestionIndex + 1) / perguntas.length) * 100;

  return (
    <div className="container-quiz">
      {!quizFinalizado ? (
        <div className="question-container">
          {/* Barra de Progresso */}
          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{ width: `${progresso}%` }}
            ></div>
          </div>

          {currentQuestion && (
            <>
              <p className="question-text">{currentQuestion.pergunta}</p>
              <ul className="answer-list">
                {[...currentQuestion.respostas_incorretas, currentQuestion.resposta_correta]
                  .sort()
                  .map((resposta, idx) => {
                    const isCorrect = resposta === currentQuestion.resposta_correta;
                    const isSelected = resposta === respostaSelecionada;

                    return (
                      <li
                        key={idx}
                        className={`answer-item ${isSelected
                          ? isCorrect
                            ? 'correct'
                            : 'incorrect'
                          : respostaSelecionada
                            ? isCorrect
                              ? 'correct'
                              : 'disabled'
                            : ''
                          }`}
                        onClick={() =>
                          handleAnswer(
                            currentQuestion.id,
                            resposta,
                            currentQuestion.resposta_correta,
                            currentQuestion.explicacao
                          )
                        }
                        style={{ pointerEvents: respostaSelecionada ? 'none' : 'auto' }}
                      >
                        {resposta}
                      </li>
                    );
                  })}
              </ul>

              {currentResult && (
                <div className={`feedback ${currentResult.correta ? 'correct' : 'incorrect'}`}>
                  <p>
                    {currentResult.correta
                      ? 'Resposta Correta!'
                      : 'Resposta Incorreta.'}
                  </p>
                  <p>
                    <strong>Explicação:</strong> {currentResult.explicacao}
                  </p>
                </div>
              )}

              <button
                className="next-button"
                onClick={goToNextQuestion}
                disabled={!respostaSelecionada}
              >
                {currentQuestionIndex < perguntas.length - 1 ? 'Próxima' : 'Finalizar Quiz'}
              </button>
            </>
          )}
        </div>
      ) : (
        <QuizResult pontuacao={pontuacao} resultados={resultados} perguntas={perguntas} />
      )}
    </div>
  );
}
