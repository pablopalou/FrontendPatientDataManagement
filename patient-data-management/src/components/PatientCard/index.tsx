import React, { useState } from 'react';
import { IPatient } from '../../types/Patient';

interface PatientCardProps {
  patient: IPatient;
}

const PatientCard: React.FC<PatientCardProps> = ({ patient }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="bg-white shadow-2xl rounded-lg p-6 mb-4 border border-gray-200">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">{patient.name}</h2>
        <button onClick={toggleDetails} className="text-blue-500">
          {showDetails ? 'Hide Details' : 'Show Details'}
        </button>
      </div>
      {showDetails && (
        <div className="mt-4">
          <img src={patient.avatar} alt={`${patient.name}'s avatar`} className="w-24 h-24 rounded-full mb-4" />
          <div className="text-left">
            <p>{patient.description}</p>
            <p className="mt-2">
              <a href={patient.website} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                {patient.website}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientCard;