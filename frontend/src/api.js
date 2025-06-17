import axios from 'axios';

const API = axios.create({
    baseURL: 'https://canvabuilder.onrender.com/api/canvas',
});

export default API;
