import axios from 'axios';

const API_URL = 'https://63bedcf7f5cfc0949b634fc8.mockapi.io/users';

export const fetchPatients = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};