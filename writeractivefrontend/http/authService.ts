import api from "./axiosConfig";

export type LoginRequest = {
    email:string,
    password:string
}

export type RegisterRequest = {
    email: string,
    password: string,
    username: string,
    name: string
}

export const login = async (data: LoginRequest) => {
    return await api.post(`/auth/login`, data);
}

export const register = async (data: RegisterRequest) => {
    return await api.post('/auth/signup', data);
}

export const refreshToken = async () => {
    return await api.post("/auth/refreshtoken");
}

export const logout = async () => {
    return await api.post("/auth/logout");
}