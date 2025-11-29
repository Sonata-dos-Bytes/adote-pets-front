import { useAuth } from '@/contexts/auth-context';
import { useState } from 'react';

import { Link, useNavigate } from 'react-router';
import AdotePetSignin from '../auth-form-dialogs/login-form-dialog copy';
import AdotePetSignup from '../auth-form-dialogs/register-form-dialog';
import Button from '../ui/button/button';
import UserMenu from '../user-menu/user-menu';
import { Home, LogOut, User } from 'lucide-react';
import { getInitials } from '@/utils';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const { isAuthenticated, user, signOut } = useAuth();
  const navigate = useNavigate();

  const onSwitchToRegister = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(true);
  };

  const onSwitchToLogin = () => {
    setIsRegisterOpen(false);
    setIsLoginOpen(true);
  };

  const handleLogout = () => {
    signOut();
    setMenuOpen(false);
    navigate('/');
  };

  const handleNavigation = (path: string) => {
    setMenuOpen(false);
    navigate(path);
  };

  return (
    <header className='w-full border-b-8 border-primary'>
      <div className='container mx-auto'>
        <div className='bg-white w-full h-22 flex items-center justify-between relative px-5 py-4'>
          <Link to='/'>
            <img
              src='/assets/images/logo-header.png'
              alt='Logo'
              className='w-36 h-12'
            />
          </Link>

          <button
            className='md:hidden flex flex-col justify-center items-center w-10 h-10 bg-transparent border-none cursor-pointer z-50'
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label='Menu'
          >
            <span
              className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${
                menuOpen ? 'rotate-45 translate-y-1.5' : ''
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-gray-800 my-1 transition-all duration-300 ${
                menuOpen ? 'opacity-0' : ''
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${
                menuOpen ? '-rotate-45 -translate-y-1.5' : ''
              }`}
            ></span>
          </button>

          <nav className='hidden md:flex items-center gap-8'>
            <ul className='flex items-center gap-8 list-none m-0 p-0'>
              <li>
                <Link
                  to='/'
                  className='font-sans font-bold text-secondary hover:underline underline-offset-4 decoration-transparent hover:decoration-current transition-all duration-300'
                >
                  Início
                </Link>
              </li>
              <li>
                <Link
                  to='/adoption'
                  className='font-sans font-bold text-secondary hover:underline underline-offset-4 decoration-transparent hover:decoration-current transition-all duration-300'
                >
                  Adote
                </Link>
              </li>
              <li>
                <Link
                  to='/guides'
                  className='font-sans font-bold text-secondary hover:underline underline-offset-4 decoration-transparent hover:decoration-current transition-all duration-300'
                >
                  Guias
                </Link>
              </li>
              <li>
                <Link
                  to='/about'
                  className='font-sans font-bold text-secondary hover:underline underline-offset-4 decoration-transparent hover:decoration-current transition-all duration-300'
                >
                  Sobre nós
                </Link>
              </li>
            </ul>

            <div className='flex items-center gap-3'>
              {isAuthenticated && user ? (
                <UserMenu />
              ) : (
                <>
                  <Button
                    variant='outlined'
                    className='w-full'
                    onClick={() => setIsLoginOpen(true)}
                  >
                    Entrar
                  </Button>
                  <Button
                    className='w-full'
                    onClick={() => setIsRegisterOpen(true)}
                  >
                    Cadastrar
                  </Button>
                </>
              )}
            </div>
          </nav>

          <nav
            className={`md:hidden fixed top-0 left-0 w-full h-screen bg-white z-40 transition-transform duration-300 ${
              menuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className='flex flex-col items-center justify-center h-full gap-8'>
              <ul className='flex flex-col items-center gap-6 list-none m-0 p-0'>
                <li>
                  <Link
                    to='/'
                    className='font-sans font-bold text-2xl text-gray-700 hover:underline underline-offset-4 decoration-transparent hover:decoration-current transition-all duration-300'
                    onClick={() => setMenuOpen(false)}
                  >
                    Início
                  </Link>
                </li>
                <li>
                  <Link
                    to='/adoption'
                    className='font-sans font-bold text-2xl text-gray-700 hover:underline underline-offset-4 decoration-transparent hover:decoration-current transition-all duration-300'
                    onClick={() => setMenuOpen(false)}
                  >
                    Adote
                  </Link>
                </li>
                <li>
                  <Link
                    to='/guides'
                    className='font-sans font-bold text-2xl text-gray-700 hover:underline underline-offset-4 decoration-transparent hover:decoration-current transition-all duration-300'
                    onClick={() => setMenuOpen(false)}
                  >
                    Guias
                  </Link>
                </li>
                <li>
                  <Link
                    to='/about'
                    className='font-sans font-bold text-2xl text-gray-700 hover:underline underline-offset-4 decoration-transparent hover:decoration-current transition-all duration-300'
                    onClick={() => setMenuOpen(false)}
                  >
                    Sobre nós
                  </Link>
                </li>
              </ul>

              <div className='flex flex-col items-center gap-4 mt-8'>
                {isAuthenticated && user ? (
                  <>
                    <div className='flex flex-col items-center gap-3 mb-4'>
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className='w-16 h-16 rounded-full object-cover border-2 border-primary'
                        />
                      ) : (
                        <div className='w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl border-2 border-primary'>
                          {getInitials(user.name)}
                        </div>
                      )}
                      <div className='text-center'>
                        <p className='font-semibold text-gray-900'>
                          {user.name}
                        </p>
                        <p className='text-sm text-gray-500'>{user.email}</p>
                      </div>
                    </div>

                    <Button
                      variant='outlined'
                      className='w-48 flex items-center justify-center gap-2'
                      onClick={() => handleNavigation('/painel')}
                    >
                      <Home /> Meu Painel
                    </Button>

                    <Button
                      variant='outlined'
                      className='w-48 flex items-center justify-center gap-2'
                      onClick={() => handleNavigation('/perfil')}
                    >
                      <User /> Meu Perfil
                    </Button>

                    <Button
                      onClick={handleLogout}
                      className='w-48 flex items-center justify-center gap-2'
                    >
                      <LogOut /> Sair
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant='outlined'
                      onClick={() => {
                        setIsLoginOpen(true);
                        setMenuOpen(false);
                      }}
                    >
                      Entrar
                    </Button>
                    <Button
                      onClick={() => {
                        setIsRegisterOpen(true);
                        setMenuOpen(false);
                      }}
                    >
                      Cadastrar
                    </Button>
                  </>
                )}
              </div>
            </div>
          </nav>
        </div>
      </div>

      <AdotePetSignin
        isOpen={isLoginOpen}
        setIsOpen={setIsLoginOpen}
        onSwitchToRegister={onSwitchToRegister}
      />
      <AdotePetSignup
        isOpen={isRegisterOpen}
        setIsOpen={setIsRegisterOpen}
        onSwitchToLogin={onSwitchToLogin}
      />
    </header>
  );
}
