import React from 'react';
import '../style/footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© 2024 TIQUIZ. Todos os direitos reservados.</p>
        <nav className="footer-links">
          <a href="/sobre" className="footer-link">Sobre</a>
          <a href="/contato" className="footer-link">Contato</a>
          <a href="/politica" className="footer-link">Política de Privacidade</a>
        </nav>
      </div>
    </footer>
  );
}
