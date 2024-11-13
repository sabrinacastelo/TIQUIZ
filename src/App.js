import './App.css';
import Header from './components/Header';
import QuizForm from './Quizform';
// import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <QuizForm />
      {/* <Routes>
        <Route path="/" element={<QuizForm />} />
      </Routes> */}
    </>
  );
}

export default App;