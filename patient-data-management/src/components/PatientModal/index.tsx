import React, { useState } from 'react';
import { IPatient } from '../../types/Patient';
import PatientForm from '../PatientForm';

interface PatientModalProps {
  patient: IPatient | null;
  onSubmit: (patientData: IPatient) => void;
  onClose: () => void;
}

const PatientModal: React.FC<PatientModalProps> = ({ patient, onSubmit, onClose }) => {
  const [formData, setFormData] = useState<IPatient>(patient || {
    id: '',
    createdAt: '',
    name: '',
    avatar: '',
    description: '',
    website: '',
  });

  const handleSubmit = (updatedFormData: IPatient) => {
    onSubmit(updatedFormData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <button onClick={onClose} className="float-right text-gray-500">
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4">{patient ? 'Edit Patient' : 'Add Patient'}</h2>
        <PatientForm patient={formData} onChange={setFormData} onSubmit={handleSubmit}/>
      </div>
    </div>
  );
};

export default PatientModal;