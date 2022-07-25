import PROTECTED_ROUTES from "../constants/protectedRoutes";
import {createContext, useContext, useEffect, useState} from "react";
import {refreshToken} from "../http/authService";
import {router} from "next/client";
import api from "../http/axiosConfig";
import axios from "axios";

type authenticationContextType = {
    accessToken: string,
    user: any, //TODO: Set User type
    setAuthenticationToken: (accessToken: string) => void,
    setAuthenticationUser: (user: any) => void
}


const defaultAuthenticationContextValues: authenticationContextType = {
    accessToken: "",
    user: {},
    setAuthenticationToken: (accessToken: string) => {},
    setAuthenticationUser: (user: any) => {}
}

export const AuthenticationContext = createContext<authenticationContextType>(defaultAuthenticationContextValues);

export function useAuthentication(){
    return useContext(AuthenticationContext)
}

export function AuthProvider(props: {children: any, router: any}): any{

    const [accessToken, setAccessToken] = useState<string>(defaultAuthenticationContextValues.accessToken);
    const [user, setUser] = useState<any>(defaultAuthenticationContextValues.user);
    const [refreshingToken, setRefreshingToken] = useState<boolean>();

    const setAuthenticationToken = (authenticationToken: string) => {
        console.log("Set authentication", authenticationToken)
        setAccessToken(authenticationToken);
    }

    const setAuthenticationUser = (authUser: any) => {
        setAuthenticationUser(authUser);
    }

    const providerValue: authenticationContextType = {
        accessToken,
        user,
        setAuthenticationToken,
        setAuthenticationUser
    }

    // If path protected and not accessToken in redirect
    const pathIsProtected: boolean = protectedRoutes.indexOf(props.router.pathname) > -1;


    //TODO: Fix double request with axios interceptor
    useEffect(() =>{

        const  validateLoggedIn = async () => {
            console.log("AccessToken Refreshing", accessToken)
            if(!accessToken && pathIsProtected && !refreshingToken){
                setRefreshingToken(true);
                console.log("Refresh Login no token");
                const response: any = await refreshToken();

                if(response.status != 200){
                    setRefreshingToken(false);
                    pushIfNotLogin()
                    return;
                }

                setAccessToken(response.data.accessToken);

                if(response.data.accessToken != null && props.router.pathname == '/auth/login'){
                    setRefreshingToken(false);
                    props.router.push('/engine');
                }
            }
        }

        validateLoggedIn().catch(() => {
                pushIfNotLogin()
            }
        );

    },[props.router.pathname, accessToken])

    const pushIfNotLogin = () => {
        if(props.router.pathname != '/auth/login'){
            props.router.push("/auth/login");
        }
    }

    // Axios Interceptor
    api.interceptors.response.use((response) => {
        return response;
    }, async (error) => {

        const originalRequest = error.config;

        if(error.response.status === 403 && !originalRequest._retry && !refreshingToken){
            originalRequest._retry = true;

            console.log("Refreshing Token interceptor", refreshingToken);

            const response: any = await refreshToken();

            if(response.status != 200){
                await props.router.push("/auth/login")
            }

            setAccessToken(response.data.accessToken);

            originalRequest.headers['Authorization'] = 'Bearer ' + response.data.accessToken;

            return api(originalRequest);
        }

        return Promise.reject(error);
    })


    const content = () => {
        if(pathIsProtected && !accessToken){
            return null;
        }

        return props.children
    }


    return (
        <AuthenticationContext.Provider value={providerValue}>
            {content()}
        </AuthenticationContext.Provider>
    )
}

const protectedRoutes = [
    "/engine",
    "/auth/login",
    "/engine/new-story",
    "/engine/stories/[id]/edit-story",
    "/engine/stories/[id]/edit-chapters",
]