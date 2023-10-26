import React, { useEffect, useState } from 'react';
import usePatients from '../../hooks/usePatients';
import PatientCard from '../PatientCard';
import PatientModal from '../PatientModal';
import { IPatient } from '../../types/Patient';

const PatientList: React.FC = () => {
    const { patients: initialPatients, isLoading, error } = usePatients();
    const [patients, setPatients] = useState<IPatient[]>([]);
    const [selectedPatient, setSelectedPatient] = useState<IPatient | null>(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (initialPatients) {
            setPatients(initialPatients);
        }
    }, [initialPatients]);

    const handleEditPatient = (patient: IPatient) => {
        setSelectedPatient(patient);
        setShowModal(true);
    };

    const handleAddPatient = () => {
        setSelectedPatient(null);
        setShowModal(true);
    };

    const handleSubmit = (patientData: IPatient) => {
        if (patientData.id) {
            setPatients((prevPatients) =>
                prevPatients.map((patient) => (patient.id === patientData.id ? patientData : patient))
            );
        } else {
            const newPatient = {
                ...patientData,
                id: Date.now().toString(),
                createdAt: new Date().toISOString(),
            };
            setPatients((prevPatients) => [...prevPatients, newPatient]);
        }
        setShowModal(false);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        const errorMessage = (error as Error).message || 'An error occurred';
        return <div>Something went wrong: {errorMessage}</div>;
    }

    if (! patients || patients.length === 0) {
        return <div>No patients found.</div>;
    }

    return (
        <div>
            {patients.map((patient) => (
                <PatientCard key={patient.id} patient={patient} onEdit={() => handleEditPatient(patient)} />
            ))}
            <button
                onClick={handleAddPatient}
                className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded shadow"
            >
                Add Patient
            </button>
            {showModal && (
                <PatientModal
                    patient={selectedPatient}
                    onSubmit={handleSubmit}
                    onClose={() => setShowModal(false)}
                />
            )}
        </div>
    );
};

export default PatientList;