import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { CONTROL_BUTTON, CONTROL_BASE } from '../styles';

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
}

export const Select = ({
  options,
  value,
  onChange,
  placeholder = 'Selecionar...',
  searchable = false,
}: FilterSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filterText, setFilterText] = useState('');

  const selectedLabel: string | undefined = value
    ? options.find((option: FilterOption) => option.value === value)?.label
    : undefined;

  return (
    <div className='relative font-sans'>
      <button onClick={() => setIsOpen(!isOpen)} className={CONTROL_BUTTON}>
        <span className={selectedLabel ? 'text-gray-900 font-sans' : 'text-gray-500 font-bold font-sans'}>
          {selectedLabel || placeholder}
        </span>
        <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className='absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto'>
          <div className='py-1'>
            {searchable && (
              <div className='px-3 pb-2'>
                <input
                  value={filterText}
                  onChange={(e) => setFilterText(e.target.value)}
                  autoFocus
                  className={`${CONTROL_BASE} rounded-md px-3 py-2 text-sm`}
                  placeholder='Pesquisar...'
                />
              </div>
            )}
            <button
              onClick={() => {
                onChange('');
                setIsOpen(false);
                setFilterText('');
              }}
              className='w-full px-4 py-2 text-left hover:bg-gray-50 text-gray-500 font-bold font-sans'
            >
              {placeholder}
            </button>
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
                  className={`w-full px-4 py-2 text-left hover:bg-gray-50 font-sans ${
                    value === option.value ? 'bg-orange-50 text-orange-700' : 'text-gray-900'
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