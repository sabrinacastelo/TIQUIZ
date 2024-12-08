import React from 'react';
import '../style/footer.css';
import { NavLink } from 'react-router-dom'


export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© 2024 TIQUIZ. Todos os direitos reservados.</p>
        <nav className="footer-links">
          <NavLink to="/about" className="footer-link">Sobre</NavLink>
          <NavLink href="/contato" className="footer-link">Contato</NavLink>
          <NavLink href="/politica" className="footer-link">Política de Privacidade</NavLink>
        </nav>
      </div>
    </footer>
  );
}
