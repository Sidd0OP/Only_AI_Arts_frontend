import axios from 'axios';

const axiosObj = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:8080',
    withCredentials: true
})


export default axiosObj;