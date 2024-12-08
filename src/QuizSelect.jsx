import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../src/style/quizform.css';
import Playing from '../src/images/playing-robot.png'

export default function QuizSelect({ onStartQuiz }) {
  const [materias, setMaterias] = useState([]);
  const [dificuldade, setDificuldade] = useState('');
  const [tipo, setTipo] = useState('');
  const [materiaSelecionada, setMateriaSelecionada] = useState('');
  const [numeroDeQuestoes, setNumeroDeQuestoes] = useState(10);

  useEffect(() => {
    async function fetchMaterias() {
      try {
        const { data } = await axios.get('http://localhost:27017/api/materia');
        setMaterias(data.materias);
      } catch (error) {
        console.error('Erro ao carregar as matérias:', error);
      }
    }
    fetchMaterias();
  }, []);

  const handleStartQuiz = () => {
    onStartQuiz({
      materia: materiaSelecionada === 'aleatoria' ? null : materiaSelecionada,
      dificuldade: dificuldade === 'aleatoria' ? null : dificuldade,
      tipo: tipo === 'aleatoria' ? null : tipo,
      numeroDeQuestoes: numeroDeQuestoes,
    });
  };

  // Verifica se todas as opções foram selecionadas
  const isStartDisabled = !materiaSelecionada || !dificuldade || !tipo;

  return (
    <div className="all">
      <div className="quiz-container">
        <h1 className="quiz-header">Configurar Quiz</h1>

        <label className="quiz-label">Matéria:</label>
        <select
          className="quiz-select"
          onChange={(e) => setMateriaSelecionada(e.target.value)}
          value={materiaSelecionada}
        >
          <option className="option" value="">Selecione uma matéria</option>
          <option className="option" value="aleatoria">Aleatória</option>
          {materias.map((materia, index) => (
            <option key={index} value={materia}>
              {materia}
            </option>
          ))}
        </select>

        <label className="quiz-label">Dificuldade:</label>
        <select
          className="quiz-select"
          onChange={(e) => setDificuldade(e.target.value)}
          value={dificuldade}
        >
          <option className="option" value="">Selecione a dificuldade</option>
          <option className="option" value="aleatoria">Aleatória</option>
          <option className="option" value="facil">Fácil</option>
          <option className="option" value="medio">Médio</option>
          <option className="option" value="dificil">Difícil</option>
        </select>

        <label className="quiz-label">Tipo:</label>
        <select
          className="quiz-select"
          onChange={(e) => setTipo(e.target.value)}
          value={tipo}
        >
          <option className="option" value="">Selecione o tipo</option>
          <option className="option" value="aleatoria">Aleatória</option>
          <option className="option" value="bool">Booleano</option>
          <option className="option" value="alternativa">Alternativa</option>
        </select>

        <label className="quiz-label">Número de Questões:</label>
        <input
          className="quiz-input"
          type="number"
          min="10"
          max="50"
          value={numeroDeQuestoes}
          onChange={(e) => setNumeroDeQuestoes(e.target.value)}
        />

        <button
          className="quiz-button-form"
          onClick={handleStartQuiz}
          disabled={isStartDisabled} 
        >
          Iniciar Quiz
        </button>
      </div>
      <img className='img-form' src={Playing} alt="" />
    </div>
  );
}
