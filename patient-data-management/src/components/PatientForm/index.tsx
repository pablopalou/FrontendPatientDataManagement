// src/components/PatientForm/index.tsx
import React from 'react';
import { IPatient } from '~/types/Patient';
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import InputField from './InputField';

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
      <InputField
        label="Name"
        register={register}
        name="name"
        errors={errors}
      />
      <InputField
        label="Avatar URL"
        register={register}
        name="avatar"
        errors={errors}
      />
      <InputField
        label="Description"
        register={register}
        name="description"
        errors={errors}
      />
      <InputField
        label="Website"
        register={register}
        name="website"
        errors={errors}
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
        Save
      </button>
    </form>
  );
};

export default PatientForm;