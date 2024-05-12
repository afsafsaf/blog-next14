'use client';

import { FormikHandlers } from 'formik';
import { Label } from './ui/label';
import { Input } from './ui/input';

interface FormInputProps {
  name: string;
  label: string;
  type: string;
  value: string;
  placeholder: string;
  isError: boolean;
  error: string | undefined;
  handleChange: FormikHandlers['handleChange'];
  handleBlur: FormikHandlers['handleBlur'];
}
const FormInput: React.FC<FormInputProps> = ({
  error,
  handleBlur,
  handleChange,
  isError,
  label,
  name,
  placeholder,
  type = 'text',
  value,
}) => {
  return (
    <>
      <div className="flex">
        <Label
          htmlFor={name}
          className={isError ? 'text-red-500' : 'text-black'}
        >
          {label}
        </Label>
        <Input
          name={name}
          type={type}
          placeholder={placeholder}
          onBlur={handleBlur}
          onChange={handleChange}
          value={value}
          className={isError ? 'border-red-500' : ''}
        />
        {isError ? <div className="text-xs text-red-500">{error}</div> : null}
      </div>
    </>
  );
};

export default FormInput;
