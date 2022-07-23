import api from "./axiosConfig";

export type LoginRequest = {
    email:string,
    password:string
}

export const login = async (data: LoginRequest) => {
    return await api.post(`/auth/login`, data);
}

export const refreshToken = async () => {
    return await api.post("/auth/refreshtoken");
}