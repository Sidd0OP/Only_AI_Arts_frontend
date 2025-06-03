import axios from 'axios';

const axiosObj = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true
})


export default axiosObj;