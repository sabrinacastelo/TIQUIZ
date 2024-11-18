import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/home/Home';
import QuizForm from './Quizform';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<QuizForm />} />
        </Routes>
        <Footer />
      </>
    </Router>
  );
}

export default App;