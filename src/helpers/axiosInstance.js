import axios from 'axios';
import { apirl } from './urls';

const axiosInstance = axios.create({
    baseURL: apirl,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
    },
});

axiosInstance.interceptors.response.use(
    (response) => {
        console.log(response, 2324);
        
        return response
    },
    (error) => {
        console.log(error,'hello');
        
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            localStorage.removeItem('access_token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
