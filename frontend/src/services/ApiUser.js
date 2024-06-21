// localhost:3001/api e os endpoints usuario, usuario:id

import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export const fecthData = async (endpoint) => {
    try {
        const dados = await axios.get(`${API_URL}/${endpoint}`);
        return dados.data;
    } catch (error) {
        console.error("Erro ao buscar dados",error);
    }
};