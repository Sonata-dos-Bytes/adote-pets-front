import { Icon } from '@iconify/react';

interface InputWithIconProps {
  icon: string;
  type?: string;
  placeholder?: string;
}

export default function InputWithIcon({
  icon,
  type = 'text',
  placeholder,
}: InputWithIconProps) {
  return (
    <div className='relative flex-1'>
      <Icon
        icon={icon}
        className='absolute left-2.5 top-1/2 transform -translate-y-1/2 text-orange-600 text-lg pointer-events-none'
      />
      <input
        type={type}
        placeholder={placeholder}
        className='w-full py-2 px-3 pl-10 border border-gray-300 rounded focus:outline-none focus:border-orange-600'
      />
    </div>
  );
}
