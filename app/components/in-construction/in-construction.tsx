export const InConstruction = () => {
  return (
    <div className='flex flex-1 f-full flex-col items-center justify-center my-10'>
      <img
        src='/public/assets/images/dog.svg'
        alt='Cão em construção'
        className='w-96'
      />
      <div>
        <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-secondary text-center'>
          Página em construção
        </h1>

        <p className='mt-4 text-lg md:text-md lg:text-xl text-center text-gray-600'>
          Estamos trabalhando para trazer novidades em breve. Por favor, volte
          mais tarde para conferir!
        </p>
      </div>
    </div>
  );
};
