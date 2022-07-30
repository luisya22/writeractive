import {useRouter} from "next/router";
import {useEffect} from "react";
import {logout} from "../../http/authService";
import {useAuthentication} from "../../context/AuthContext";

export default function Logout(props: any){

    const router = useRouter();
    const {setAuthenticationToken, setAuthenticationUser} = useAuthentication();

    useEffect(() => {
        const logoutRequest = async () => {
            const logoutResponse = await logout();

            if(logoutResponse.status == 200){
                setAuthenticationToken(null);
                setAuthenticationUser({});
                await router.push('/auth/login');
            }
        }
        logoutRequest().catch(console.error);
    },[]);
}