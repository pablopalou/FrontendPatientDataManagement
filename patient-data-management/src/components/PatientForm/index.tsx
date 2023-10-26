// src/components/PatientForm/index.tsx
import React from 'react';
import { IPatient } from '../../types/Patient';
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

interface PatientFormProps {
  patient: IPatient;
  onChange: (patientData: IPatient) => void;
  onSubmit: (patientData: IPatient) => void,
}

export const PatientSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  avatar: z.string().url('Invalid URL'),
  description: z.string().min(1, 'Description is required'),
  website: z.string().url('Invalid URL'),
});

type FormSchemaType = z.infer<typeof PatientSchema>;

const PatientForm: React.FC<PatientFormProps> = ({ patient, onChange, onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormSchemaType>({
    resolver: zodResolver(PatientSchema),
    defaultValues: patient,
  });

  const handleFormSubmit = (data: FormSchemaType) => {
    onChange({ ...patient, ...data });
    onSubmit({ ...patient, ...data });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <label className="block mb-2 text-left">
        Name:
        <input
          type="text"
          {...register("name")}
          className={`border ${errors.name ? 'border-red-500' : 'border-gray-300'} p-2 w-full`}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </label>
      <label className="block mb-2 text-left">
        Avatar URL:
        <input
          type="text"
          {...register("avatar")}
          className={`border ${errors.avatar ? 'border-red-500' : 'border-gray-300'} p-2 w-full`}
        />
        {errors.avatar && <p className="text-red-500 text-sm">{errors.avatar.message}</p>}
      </label>
      <label className="block mb-2 text-left">
        Description:
        <input
          type="text"
          {...register("description")}
          className={`border ${errors.description ? 'border-red-500' : 'border-gray-300'} p-2 w-full`}
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
      </label>
      <label className="block mb-2 text-left">
        Website:
        <input
          type="text"
          {...register("website")}
          className={`border ${errors.website ? 'border-red-500' : 'border-gray-300'} p-2 w-full`}
        />
        {errors.website && <p className="text-red-500 text-sm">{errors.website.message}</p>}
      </label>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
        Save
      </button>
    </form>
  );
};

export default PatientForm;