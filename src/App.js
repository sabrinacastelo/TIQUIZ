import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/home/Home';
import QuizForm from './Quizform';
import About from './pages/about/About';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Logic from './pages/logic/Logic';

function App() {
  return (
    <Router>
      <>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<QuizForm />} />
          <Route path="/about" element={<About />} />
          <Route path="/programming" element={<Logic />} />
        </Routes>
        <Footer />
      </>
    </Router>
  );
}

export default App;