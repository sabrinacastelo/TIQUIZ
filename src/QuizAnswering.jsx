import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../src/style/quizform.css';

export default function QuizAnswering({ config }) {
  const [perguntas, setPerguntas] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [resultados, setResultados] = useState({});
  const [pontuacao, setPontuacao] = useState(0);
  const [quizFinalizado, setQuizFinalizado] = useState(false);

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
    // Função para prevenir a saída da página enquanto o quiz não for finalizado
    const handleBeforeUnload = (event) => {
      if (!quizFinalizado) {
        event.preventDefault();
        event.returnValue = ''; // Necessário para mostrar o aviso em navegadores modernos
      }
    };

    // Adiciona o evento antes de sair
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Remove o evento ao finalizar o quiz ou desmontar o componente
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [quizFinalizado]);

  const handleAnswer = (perguntaId, respostaSelecionada, respostaCorreta, explicacao) => {
    const isCorreta = respostaSelecionada === respostaCorreta;
    
    setResultados({
      [perguntaId]: { correta: isCorreta, explicacao: explicacao }
    });
    
    if (isCorreta) {
      setPontuacao((prevPontuacao) => prevPontuacao + 10); // Incrementa a pontuação em 10 para cada resposta correta
    }
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < perguntas.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setResultados({}); // Limpa o feedback ao avançar para a próxima pergunta
    } else {
      setQuizFinalizado(true); // Marca o quiz como finalizado quando chega à última pergunta
    }
  };

  const currentQuestion = perguntas[currentQuestionIndex];
  const currentResult = resultados[currentQuestion?.id];

  return (
    <div className="question-container">
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
                    className="answer-item" 
                    onClick={() => handleAnswer(currentQuestion.id, resposta, currentQuestion.resposta_correta, currentQuestion.explicacao)}
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

            <button className="next-button" onClick={goToNextQuestion}>
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
