import PROTECTED_ROUTES from "../constants/protectedRoutes";
import {createContext, useContext, useEffect, useState} from "react";
import {refreshToken} from "../http/authService";
import {router} from "next/client";

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

    console.log("Access Token", !accessToken, pathIsProtected);


    useEffect(() =>{

        const  validateLoggedIn = async () => {
            console.log("AccessToken", accessToken)
            if(!accessToken && pathIsProtected){
                const response: any = await refreshToken();

                console.log("Status Response", response.status);

                if(response.status != 200){
                    pushIfNotLogin()
                    return;
                }

                setAccessToken(response.data.accessToken);

                if(response.data.accessToken != null && props.router.pathname == '/auth/login'){
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


    return (
        <AuthenticationContext.Provider value={providerValue}>
            {props.children}
        </AuthenticationContext.Provider>
    )
}

const protectedRoutes = [
    "/engine",
    "/auth/login"
]