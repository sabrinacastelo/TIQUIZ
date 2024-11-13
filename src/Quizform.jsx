// QuizForm.js
import React, { useState } from 'react';
import QuizSelect from './QuizSelect';
import QuizAnswering from './QuizAnswering';

export default function QuizForm() {
  const [config, setConfig] = useState(null);

  const handleStartQuiz = (quizConfig) => {
    setConfig(quizConfig);
  };

  return (
    <div className="quiz-container">
      {!config ? (
        <QuizSelect onStartQuiz={handleStartQuiz} />
      ) : (
        <QuizAnswering config={config} />
      )}
    </div>
  );
}
