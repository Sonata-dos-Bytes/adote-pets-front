import { useState } from "react";
import "./header.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      <div className="box_white">
        {/* Logo */}
        <div>
          <img
            src="/assets/images/logo-header.png"
            alt="Logo"
            className="logo"
          />
        </div>

        {/* Botão hambúrguer (só aparece no mobile) */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Links */}
        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          <ul className="links">
            <li>Início</li>
            <li>Adote</li>
            <li>Guias</li>
            <li>Sobre nós</li>
          </ul>
        </nav>

        {/* Usuário */}
        {/* <div className="user">user</div> */}
      </div>

      <div className="box_orange"></div>
    </header>
  );
}

