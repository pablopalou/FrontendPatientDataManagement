import { useQuery } from "react-query";
import { fetchPatients } from "../utils/api";
import { IPatient } from '~/types/Patient';

const usePatients = () => {
    const { data, isLoading, error } = useQuery<IPatient[]>('patients', fetchPatients);

    return {
        patients: data,
        isLoading,
        error,
    };
};

export default usePatients;