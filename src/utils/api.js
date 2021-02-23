import axios from 'axios';
import env from 'dotenv';

// Initialize axios with host info

export default axios.create({
    baseURL: env.API_PROTOCOL + "://" + env.API_HOST + (env.API_PORT !== null ? ":" + env.API_PORT : ""),
    responseType: "json",
    timeout: 5000
});