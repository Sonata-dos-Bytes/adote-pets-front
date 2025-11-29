import { useNavigate } from 'react-router';
import Button from '@/components/ui/button/button';
import welcomeBackground from '/assets/images/welcome-background.svg';
import welcomeImage from '/assets/images/welcome-picture.svg';
import { useAuth } from '@/contexts/auth-context';

export function Welcome() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  return (
    <main className='flex flex-col xl:flex-row items-center justify-between min-h-screen py-8 xl:py-12 px-[5%] xl:px-[5%] gap-16 xl:gap-16 overflow-x-hidden max-w-[1400px] xl:max-w-[1400px] mx-auto'>
      <section className='flex-1 flex flex-col justify-center gap-7 xl:gap-7 max-w-full xl:max-w-[520px] text-center xl:text-left items-center xl:items-start xl:pr-4'>
        <div>
          <h1 className='text-3xl sm:text-4xl lg:text-5xl mb-2 text-primary font-bold leading-tight'>
            O Novo <span className='text-secondary'>Melhor Amigo</span> da Sua
            Família!
          </h1>
        </div>
        <div>
          <p className='text-base sm:text-lg lg:text-xl mb-6 text-gray-700 leading-relaxed font-medium'>
            Encontre o pet perfeito para compartilhar momentos especiais. Cães e
            gatos estão prontos para levar alegria ao seu lar.
          </p>
        </div>
        <div className='flex flex-col sm:flex-row flex-wrap gap-4 w-full sm:w-auto justify-center xl:justify-start max-w-full sm:max-w-[400px] xl:max-w-none'>
          <div className='flex-1 min-w-[140px] flex w-full sm:w-auto'>
            <Button
              variant='outlined'
              onClick={() => navigate('/adoption')}
            >
              Adote Agora
            </Button>
          </div>
          {isAuthenticated && (
            <div className='flex-1 min-w-[140px] flex w-full sm:w-auto'>
              <Button onClick={() => navigate('/cadastro-pet')}>
                Doe Agora
              </Button>
            </div>
          )}
        </div>
      </section>

      <section className='relative flex-1 flex justify-center items-center max-w-full xl:max-w-[550px] w-full h-auto mt-4 xl:mt-0'>
        <img
          src={welcomeImage}
          alt='Welcome Figure'
          className='relative z-10 max-w-[220px] sm:max-w-[290px] md:max-w-[340px] xl:max-w-[400px] w-[75%] sm:w-[80%] md:w-[85%] xl:w-[90%] h-auto block'
        />
        <img
          className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[70%] sm:-translate-y-[65%] md:-translate-y-[68%] xl:-translate-y-[60%] z-0 w-[85%] sm:w-[90%] md:w-[95%] xl:w-full max-w-[200px] sm:max-w-[350px] md:max-w-[420px] xl:max-w-[500px] opacity-80 xl:opacity-80'
          src={welcomeBackground}
          alt='Welcome Background'
        />
      </section>
    </main>
  );
}
