import { useState } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      <div className='bg-white w-full h-22 flex flex-row items-center justify-between relative px-5'>
        {/* Logo */}
        <div>
          <img
            src='/assets/images/logo-header.png'
            alt='Logo'
            className='w-36 h-12'
          />
        </div>

        {/* Botão hambúrguer (só aparece no mobile) */}
        <button
          className='hidden md:hidden text-3xl bg-transparent border-none cursor-pointer max-md:block'
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Links */}
        <nav
          className={`md:flex ${menuOpen ? 'flex' : 'hidden'} absolute md:relative top-22 md:top-auto left-0 md:left-auto w-full md:w-auto bg-white md:bg-transparent p-5 md:p-0 shadow-md md:shadow-none justify-center md:justify-start`}
        >
          <ul className='flex flex-col md:flex-row gap-5 md:gap-8 list-none m-0 p-0'>
            <li>
              <a href='/' className='font-sans font-bold text-secondary'>
                Início
              </a>
            </li>
            <li>
              <a href='/adoption' className='font-sans font-bold text-secondary'>
                Adote
              </a>
            </li>
            <li>
              <a href='/guides' className='font-sans font-bold text-secondary'>
                Guias
              </a>
            </li>
            <li>
              <a href='/about' className='font-sans font-bold text-secondary'>
                Sobre nós
              </a>
            </li>
          </ul>
        </nav>

        {/* Usuário */}
        {/* <div className="w-35 h-12 flex items-center justify-center">user</div> */}
      </div>

      <div className='bg-primary w-full h-8'></div>
    </header>
  );
}
