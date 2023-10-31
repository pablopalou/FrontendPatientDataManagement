import { twMerge } from 'tailwind-merge';
import { UseFormRegister } from 'react-hook-form';

type InputFieldProps = {
  label: string;
  register: UseFormRegister<any>;
  name: string;
  errors: Record<string, any>;
  type?: string;
};

const InputField: React.FC<InputFieldProps> = ({ label, register, name, errors, type = 'text' }) => {
    const inputClasses = twMerge(
      'border p-2 w-full',
      errors[name] ? 'border-red-500' : 'border-gray-300'
    );

    return (
      <div className="block mb-2 text-left">
        <label htmlFor={name}>{label}:</label>
        <input
          id={name}
          type={type}
          {...register(name)}
          className={inputClasses}
        />
        {errors[name] && <p className="text-red-500 text-sm">{errors[name].message}</p>}
      </div>
    );
  };

export default InputField;