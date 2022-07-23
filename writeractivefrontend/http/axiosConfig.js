import axios from 'axios';
import getConfig from "next/config";
const {publicRuntimeConfig} = getConfig()

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
    headers: {
        'Access-Control-Allow-Origin':"*",
        'Accept': 'application/json',
        "Access-Control-Allow-Credentials": true
    },
    withCredentials: true
})

export default api;