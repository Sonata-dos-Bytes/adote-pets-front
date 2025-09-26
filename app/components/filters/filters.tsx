import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import Button from '../ui/button/button';
interface FilterOption {
  value: string;
  label: string;
}

interface FilterSelectProps {
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const FilterSelect = ({
  options,
  value,
  onChange,
  placeholder = 'Selecionar...',
}: FilterSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedLabel: string | undefined = value
    ? options.find((option: FilterOption) => option.value === value)?.label
    : undefined;

  return (
    <div className='relative font-sans'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='w-full border border-gray-300 rounded-lg px-4 py-3 text-left bg-white hover:border-gray-400 focus:ring-2 focus:ring-primary focus:border-primary flex items-center justify-between font-sans'
      >
        <span
          className={
            selectedLabel
              ? 'text-gray-900 font-sans'
              : 'text-gray-500 font-bold font-sans'
          }
        >
          {selectedLabel || placeholder}
        </span>
        <ChevronDown
          className={`h-5 w-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className='absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10'>
          <div className='py-1'>
            <button
              onClick={() => {
                onChange('');
                setIsOpen(false);
              }}
              className='w-full px-4 py-2 text-left hover:bg-gray-50 text-gray-500 font-bold font-sans'
            >
              {placeholder}
            </button>
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2 text-left hover:bg-gray-50 font-sans ${
                  value === option.value
                    ? 'bg-orange-50 text-orange-700'
                    : 'text-gray-900'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const AdoptionFilters = () => {
  const [filters, setFilters] = useState({
    animal: '',
    idade: '',
    genero: '',
    cidade: '',
  });

  const animais = [
    { value: 'cachorro', label: 'Cachorro' },
    { value: 'gato', label: 'Gato' },
    { value: 'coelho', label: 'Coelho' },
    { value: 'passaro', label: 'Pássaro' },
  ];

  const idades = [
    { value: 'filhote', label: 'Filhote (0-1 ano)' },
    { value: 'jovem', label: 'Jovem (1-3 anos)' },
    { value: 'adulto', label: 'Adulto (3-7 anos)' },
    { value: 'senior', label: 'Senior (7+ anos)' },
  ];

  const generos = [
    { value: 'macho', label: 'Macho' },
    { value: 'femea', label: 'Fêmea' },
  ];

  const cidades = [
    { value: 'balsas', label: 'Balsas, Maranhão' },
    { value: 'mangabeiras', label: 'S. R. Mangabeiras, Maranhão' },
  ];

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      animal: '',
      idade: '',
      genero: '',
      cidade: '',
    });
  };

  const applyFilters = () => {
    console.log('Filtros aplicados:', filters);
  };

  return (
    <div className='w-full  bg-white font-sans'>
      {/* Header dos Filtros */}
      <div className='flex items-center justify-between mb-6 pb-4 border-b border-gray-200'>
        <h2 className='text-lg font-medium text-primary font-sans'>Filtro</h2>
        <button
          onClick={resetFilters}
          className='text-sm text-gray-500 hover:text-gray-700 font-sans'
        >
          Resetar Filtros
        </button>
      </div>

      {/* Filtros */}
      <div className='space-y-6'>
        {/* Filtro Animal */}
        <div>
          <FilterSelect
            label='Animal'
            options={animais}
            value={filters.animal}
            onChange={(value: string) => updateFilter('animal', value)}
            placeholder='Selecione o tipo'
          />
        </div>

        {/* Filtro Idade */}
        <div>
          <FilterSelect
            options={idades}
            value={filters.idade}
            onChange={(value: string) => updateFilter('idade', value)}
            placeholder='Selecione a idade'
          />
        </div>

        {/* Filtro Gênero */}
        <div>
          <div className='p-1 rounded-lg'>
            <FilterSelect
              options={generos}
              value={filters.genero}
              onChange={(value: string) => updateFilter('genero', value)}
              placeholder='Selecione o gênero'
            />
          </div>
        </div>

        {/* Filtro Cidade */}
        <div>
          <h3 className='text-lg font-medium text-gray-900 mb-3 font-sans'>
            Localização
          </h3>
          <FilterSelect
            options={cidades}
            value={filters.cidade}
            onChange={(value: string) => updateFilter('cidade', value)}
            placeholder='Selecione a cidade'
          />
        </div>

        {/* Botão Aplicar Filtros */}
        <div className='pt-4'>
          <Button onClick={applyFilters}>Aplicar Filtros</Button>
        </div>
      </div>
    </div>
  );
};

export default AdoptionFilters;
