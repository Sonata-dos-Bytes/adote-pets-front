import { Icon } from '@iconify/react';
import InputWithIcon from '../ui/input-with-icon/input-with-icon';
import Button from '../ui/button/button';

export default function Footer() {
  return (
    <footer className='font-baloo bg-gray-50 font-semibold leading-6 text-base'>
      {/* BLOCO SUPERIOR */}
      <section className='grid grid-cols-1 md:grid-cols-3 gap-8 py-12 px-8 max-w-6xl mx-auto'>
        <div className='footer-col'>
          <h3 className='font-bold mb-4 text-gray-400'>Como podemos ajudar</h3>
          <ul className='list-none p-0 m-0'>
            <li className='mb-2 flex items-center gap-2'>
              <a
                href='#'
                className='no-underline text-primary font-semibold hover:underline'
              >
                Adotar um pet
              </a>
            </li>
            <li className='mb-2 flex items-center gap-2'>
              <a
                href='#'
                className='no-underline text-primary font-semibold hover:underline'
              >
                Doar um pet
              </a>
            </li>
            <li className='mb-2 flex items-center gap-2'>
              <a
                href='#'
                className='no-underline text-primary font-semibold hover:underline'
              >
                Adotar FAQ&apos;s
              </a>
            </li>
            <li className='mb-2 flex items-center gap-2'>
              <a
                href='#'
                className='no-underline text-primary font-semibold hover:underline'
              >
                Doar FAQ&apos;s
              </a>
            </li>
          </ul>
        </div>

        <div className='footer-col'>
          <h3 className='font-bold mb-4 text-gray-400'>Contatos</h3>
          <ul className='list-none p-0 m-0'>
            <li className='mb-2 flex items-center gap-2'>
              <Icon icon='mdi:map-marker' className='text-primary text-2xl' />
              <span className='text-primary'>
                123 Rua Brasil, Maranhão, Brasil
              </span>
            </li>
            <li className='mb-2 flex items-center gap-2'>
              <Icon icon='mdi:phone' className='text-primary text-2xl' />
              <span className='text-primary'>+55 (99) 98477-5124</span>
            </li>
            <li className='mb-2 flex items-center gap-2'>
              <Icon icon='mdi:email' className='text-primary text-2xl' />
              <span className='text-primary'>adotepets@gmail.com</span>
            </li>
          </ul>
        </div>

        <div className='footer-col'>
          <h3 className='font-bold mb-4 text-gray-400'>
            Mantenha contato conosco
          </h3>
          <p className='text-primary mb-3 font-semibold'>
            Junte-se à newsletter AdotePets e seja o primeiro a saber das
            novidades
          </p>
          <form className='flex gap-2 flex-col'>
            <InputWithIcon
              icon='mdi:email-outline'
              type='email'
              placeholder='Coloque seu e-mail'
            />
            <Button type='submit'>Inscreva-se</Button>
          </form>
        </div>
      </section>

      {/* BLOCO INFERIOR */}
      <section className='flex justify-between items-center py-4 px-12 text-white bg-primary'>
        <div>
          <p className='m-0 text-sm font-bold leading-relaxed'>
            ©2025 AdotePets
          </p>
        </div>
        <div className='flex gap-4'>
          <a
            href='#'
            className='text-white transition-all duration-200 hover:scale-110 hover:text-primary/50'
          >
            <Icon icon='ri:facebook-fill' width='24' height='24' />
          </a>
          <a
            href='#'
            className='text-white transition-all duration-200 hover:scale-110 hover:text-primary/50'
          >
            <Icon icon='ri:pinterest-fill' width='24' height='24' />
          </a>
          <a
            href='#'
            className='text-white transition-all duration-200 hover:scale-110 hover:text-primary/50'
          >
            <Icon icon='ri:tumblr-fill' width='24' height='24' />
          </a>
          <a
            href='#'
            className='text-white transition-all duration-200 hover:scale-110 hover:text-primary/50'
          >
            <Icon icon='ri:instagram-line' width='24' height='24' />
          </a>
          <a
            href='#'
            className='text-white transition-all duration-200 hover:scale-110 hover:text-primary/50'
          >
            <Icon icon='ri:youtube-fill' width='24' height='24' />
          </a>
        </div>
      </section>
    </footer>
  );
}
