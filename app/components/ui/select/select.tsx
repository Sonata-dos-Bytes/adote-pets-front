import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface FilterOption {
  value: string;
  label: string;
}

interface FilterSelectProps {
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  searchable?: boolean;
  allowClear?: boolean;
}

export const Select = ({
  options,
  value,
  onChange,
  placeholder = 'Selecionar...',
  searchable = false,
  allowClear = false,
}: FilterSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filterText, setFilterText] = useState('');

  const selectedLabel: string | undefined = value
    ? options.find((option: FilterOption) => option.value === value)?.label
    : undefined;

  return (
    <div className='relative font-sans'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={'w-full border border-gray-300 rounded-lg px-4 py-3 bg-white appearance-none focus:ring-2 focus:ring-primary focus:border-primary font-sans text-sm flex items-center justify-between'}
      >
        <span className={selectedLabel ? 'text-gray-900 font-sans' : 'text-gray-500 font-sans'}>
          {selectedLabel || placeholder}
        </span>
        <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className='absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto'>
          <div className='py-1'>
            <div className='px-3 pb-2 flex items-center gap-2'>
              {searchable && (
                <input
                  value={filterText}
                  onChange={(e) => setFilterText(e.target.value)}
                  autoFocus
                  className={'w-full border border-gray-300 rounded-lg px-4 py-3 bg-white appearance-none focus:ring-2 focus:ring-primary focus:border-primary font-sans text-sm rounded-md text-sm flex-1'}
                  placeholder='Pesquisar...'
                />
              )}
              {allowClear && value && (
                <button
                  onClick={() => {
                    onChange('');
                    setIsOpen(false);
                    setFilterText('');
                  }}
                  className='text-sm text-gray-500 hover:text-gray-700 px-2 py-1 rounded'
                  aria-label='Limpar seleção'
                >
                  Limpar
                </button>
              )}
            </div>
            {(!searchable || !filterText) && (
              <div className='px-4 py-2 text-sm text-gray-500 font-bold'>{placeholder}</div>
            )}
            {options
              .filter((option) => {
                if (!filterText) return true;
                const txt = filterText.toLowerCase();
                return (
                  option.label.toLowerCase().includes(txt) || option.value.toLowerCase().includes(txt)
                );
              })
              .map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                    setFilterText('');
                  }}
                  className={`${
                    'w-full text-left px-4 py-2 text-sm font-sans ' +
                    (value === option.value ? 'bg-orange-50 text-orange-700' : 'text-gray-900')
                  } hover:bg-gray-50`}
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