import { ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import Button from '../ui/button/button';
import Field from '../ui/field/field';
import { Select } from '../ui/select/select';
import { CONTROL_BASE } from '../ui/styles';

type FiltersState = {
  species: string;
  startAge: string;
  endAge: string;
  gender: string;
  city: string;
  state: string;
  uf: string;
  breed: string;
  startDate: string;
  endDate: string;
  isCastrated: string;
};

interface AdoptionFiltersProps {
  onApply?: (
    query: Partial<Record<string, string | number | boolean | undefined>>,
  ) => void;
}

const AdoptionFilters = ({ onApply }: AdoptionFiltersProps) => {
  const [filters, setFilters] = useState<FiltersState>({
    species: '',
    startAge: '',
    endAge: '',
    gender: '',
    city: '',
    state: '',
    uf: '',
    breed: '',
    startDate: '',
    endDate: '',
    isCastrated: '',
  });

  const [states, setStates] = useState<
    Array<{ id: number; nome: string; sigla: string }>
  >([]);
  const [cities, setCities] = useState<string[]>([]);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);

  const animais = [
    { value: 'dog', label: 'Cachorro' },
    { value: 'cat', label: 'Gato' },
    { value: 'coelho', label: 'Coelho' },
    { value: 'passaro', label: 'Pássaro' },
  ];
  const idades = [
    { value: 'filhote', label: 'Filhote (0-1 ano)' },
    { value: 'jovem', label: 'Jovem (1-3 anos)' },
    { value: 'adulto', label: 'Adulto (3-7 anos)' },
    { value: 'senior', label: 'Senior (7+ anos)' },
  ];
  const genders = [
    { value: 'male', label: 'Macho' },
    { value: 'female', label: 'Fêmea' },
  ];
  const cidades = cities.map((c) => ({ value: c, label: c }));

  const updateFilter = (key: keyof FiltersState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      species: '',
      startAge: '',
      endAge: '',
      gender: '',
      city: '',
      state: '',
      uf: '',
      breed: '',
      startDate: '',
      endDate: '',
      isCastrated: '',
    });
  };

  const applyFilters = () => {
    const q: any = {};
    if (filters.species) q.species = filters.species;
    if (filters.gender) q.gender = filters.gender;
    if (filters.breed) q.breed = filters.breed;
    if (filters.city) q.city = filters.city;
    if (filters.state) q.state = filters.state;
    if (filters.uf) q.uf = filters.uf;
    if (filters.startAge && filters.startAge !== '') q.startAge = Number(filters.startAge);
    if (filters.endAge && filters.endAge !== '') q.endAge = Number(filters.endAge);
    if (filters.startDate) q.startDate = filters.startDate;
    if (filters.endDate) q.endDate = filters.endDate;
    if (filters.isCastrated === 'true') q.isCastrated = true;
    if (filters.isCastrated === 'false') q.isCastrated = false;

    if (onApply) onApply(q);
    else console.log('Filtros aplicados:', q);
  };

  useEffect(() => {
    (async () => {
      try {
        setLoadingStates(true);
        const res = await fetch(
          'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
        );
        const data = await res.json();
        data.sort((a: any, b: any) => a.nome.localeCompare(b.nome));
        setStates(data);
      } catch (err) {
      } finally {
        setLoadingStates(false);
      }
    })();
  }, []);
  const handleStateChange = async (stateIdOrSigla: string) => {
    const stateObj = states.find(
      (s) => s.sigla === stateIdOrSigla || String(s.id) === stateIdOrSigla,
    );
    if (!stateObj) return;
    updateFilter('state', stateObj.nome);
    updateFilter('uf', stateObj.sigla);
    try {
      setLoadingCities(true);
      const res = await fetch(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateObj.id}/municipios`,
      );
      const data = await res.json();
      const names = data
        .map((c: any) => c.nome)
        .sort((a: string, b: string) => a.localeCompare(b));
      setCities(names);
    } catch (err) {
      setCities([]);
    } finally {
      setLoadingCities(false);
    }
  };

  return (
    <div className='w-full  bg-white font-sans'>
      <div className='flex items-center justify-between mb-6 pb-4 border-b border-gray-200'>
        <h2 className='text-lg font-medium text-primary font-sans'>Filtro</h2>
        <button
          onClick={resetFilters}
          className='text-sm text-gray-500 hover:text-gray-700 font-sans'
        >
          Resetar Filtros
        </button>
      </div>

      <div className='space-y-6'>
        <h3 className='text-lg font-medium text-gray-900 mb-3 font-sans'>
            Pet
          </h3>
        <div>
          <Field label='Tipo'>
            <Select
              options={animais}
              value={filters.species}
              onChange={(value: string) => updateFilter('species', value)}
              placeholder='Selecione o tipo'
              searchable
              allowClear
            />
          </Field>
        </div>

        <div className='flex gap-3'>
          <div className='w-1/2'>
            <Field label='Idade mínima (anos)'>
              <input
                type='number'
                min={0}
                className={`${CONTROL_BASE}`}
                value={filters.startAge}
                onChange={(e) => updateFilter('startAge', e.target.value)}
                placeholder='Ex: 1'
              />
            </Field>
          </div>
          <div className='w-1/2'>
            <Field label='Idade máxima (anos)'>
              <input
                type='number'
                min={0}
                className={`${CONTROL_BASE}`}
                value={filters.endAge}
                onChange={(e) => updateFilter('endAge', e.target.value)}
                placeholder='Ex: 7'
              />
            </Field>
          </div>
        </div>

        <div>
          <Field label='Genêro'>
            <Select
              options={genders}
              value={filters.gender}
              onChange={(value: string) => updateFilter('gender', value)}
              placeholder='Selecione o gênero'
              searchable
              allowClear
            />
          </Field>
        </div>

        <div className='mb-3'>
          <Field label='Raça'>
              <input
                type='text'
                className={`${CONTROL_BASE}`}
                value={filters.breed}
                onChange={(e) => updateFilter('breed', e.target.value)}
                placeholder='Digite a raça'
              />
          </Field>
        </div>

        <div className='flex gap-3 mb-3'>
          <div className='w-1/2'>
            <Field label='Criado a partir'>
              <input
                type='date'
                className={`${CONTROL_BASE}`}
                value={filters.startDate}
                onChange={(e) => updateFilter('startDate', e.target.value)}
              />
            </Field>
          </div>
          <div className='w-1/2'>
            <Field label='Criado até'>
              <input
                type='date'
                className={`${CONTROL_BASE}`}
                value={filters.endDate}
                onChange={(e) => updateFilter('endDate', e.target.value)}
              />
            </Field>
          </div>
        </div>

        <div className='mb-4'>
          <label className='block text-sm text-gray-600 mb-1'>Castrado</label>
          <Select
            options={[
              { value: '', label: 'Indiferente' },
              { value: 'true', label: 'Sim' },
              { value: 'false', label: 'Não' },
            ]}
            value={filters.isCastrated}
            onChange={(value: string) => updateFilter('isCastrated', value)}
            placeholder='Selecione'
            allowClear
          />
        </div>

        <div>
          <h3 className='text-lg font-medium text-gray-900 mb-3 font-sans'>
            Localização
          </h3>
          <div className='space-y-3'>
            <div>
              <Field label='Estado'>
                <Select
                  options={states.map((s) => ({
                    value: s.sigla,
                    label: `${s.nome} (${s.sigla})`,
                  }))}
                  value={filters.uf}
                  onChange={(value: string) => handleStateChange(value)}
                  placeholder={
                    loadingStates
                      ? 'Carregando estados...'
                      : 'Selecione o estado'
                  }
                  searchable
                  allowClear
                />
              </Field>
            </div>

            <div>
              <Field label='Cidade'>
                <Select
                  options={cidades}
                  value={filters.city}
                  onChange={(value: string) => updateFilter('city', value)}
                  placeholder={
                    loadingCities
                      ? 'Carregando cidades...'
                      : 'Selecione a cidade'
                  }
                  searchable
                  allowClear
                />
              </Field>
            </div>
          </div>
        </div>

        <div className='pt-4'>
          <Button onClick={applyFilters}>Aplicar Filtros</Button>
        </div>
      </div>
    </div>
  );
};

export default AdoptionFilters;
