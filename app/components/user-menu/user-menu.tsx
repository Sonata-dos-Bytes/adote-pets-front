import { useAuth } from '@/contexts/auth-context';
import { getInitials } from '@/utils';
import { Home, LogOut, User } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';

export default function UserMenu() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, signOut } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    signOut();
    setDropdownOpen(false);
    navigate('/');
  };

  const handleNavigation = (path: string) => {
    setDropdownOpen(false);
    navigate(path);
  };

  if (!user) return null;

  return (
    <div className='relative' ref={dropdownRef}>
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className='flex items-center gap-2 hover:opacity-80 transition-opacity'
        aria-label='Menu do usuário'
      >
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className='w-10 h-10 rounded-full object-cover border-2 border-primary'
          />
        ) : (
          <div className='w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm border-2 border-primary'>
            {getInitials(user.name)}
          </div>
        )}
        <svg
          className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
            dropdownOpen ? 'rotate-180' : ''
          }`}
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M19 9l-7 7-7-7'
          />
        </svg>
      </button>

      {dropdownOpen && (
        <div className='absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-[9999]'>
          <div className='px-4 py-3 border-b border-gray-100'>
            <p className='text-sm font-semibold text-gray-900 truncate'>
              {user.name}
            </p>
            <p className='text-xs text-gray-500 truncate'>{user.email}</p>
          </div>

          <button
            onClick={() => handleNavigation('/painel')}
            className='w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors'
          >
            <Home className='w-4 h-4' /> Meu Painel
          </button>

          <button
            onClick={() => handleNavigation('/perfil')}
            className='w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors'
          >
            <User className='w-4 h-4' /> Meu Perfil
          </button>

          <hr className='my-2 border-gray-100' />

          <button
            onClick={handleLogout}
            className='w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors'
          >
            <LogOut className='w-4 h-4' /> Sair
          </button>
        </div>
      )}
    </div>
  );
}
