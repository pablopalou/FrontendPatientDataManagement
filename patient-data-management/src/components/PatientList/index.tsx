import usePatients from '../../hooks/usePatients';
import PatientCard from '../PatientCard';

const PatientList: React.FC = () => {
    const { patients, isLoading, error } = usePatients();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        const errorMessage = (error as Error).message || 'An error occurred';
        return <div>Something went wrong: {errorMessage}</div>;
    }

    if (!patients || patients.length === 0) {
        return <div>No patients found.</div>;
    }

    return (
        <div>
            {patients.map((patient) => (
                <PatientCard key={patient.id} patient={patient} />
            ))}
        </div>
    );
};

export default PatientList;