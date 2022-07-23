import {FormValidationProvider} from "../../context/FormValidationContext";
import React, {useState} from "react";
import InputField from "../../components/InputField/InputField";
import PasswordField from "../../components/PasswordField/PasswordField";
import {login, LoginRequest} from "../../http/authService";
import {useAuthentication} from "../../context/AuthContext";
import {useRouter} from "next/router";

export default function LonginForm(props: any){

    //TODO: Set user info

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const {setAuthenticationToken, accessToken} = useAuthentication();
    const router = useRouter();

    const handleLogin = async () => {
        const data: LoginRequest = {
            email,
            password
        }

        console.log("Hellast");

        const loginResponse = await login(data);

        console.log("Going there", loginResponse.data)

        if(loginResponse.status == 200){
            await setAuthenticationToken(loginResponse.data.accessToken);
            await router.push('/engine') //TODO: move to stories first
        }

        console.log(loginResponse.data.access_token);
    }

    const requiredValidator = (val: string | number) => {
        if(!val){
            return ["This field is required"]
        }

        return [];
    }

    return(
        <>
            <div className={'absolute h-[90vh] flex justify-center items-center   w-full'}>
                <div className={'bg-white px-4 py-10 rounded-xl w-1/3'}>
                    <FormValidationProvider onSubmit={handleLogin} id={'login-form'}>
                        <h1 className={'text-2xl'}>Log in</h1>
                        <hr/>
                        <div className="flex flex-col items-center ">
                            <InputField
                                data={email}
                                setData={setEmail}
                                placeholder={'Email'}
                                name={'email'}
                                validators={[requiredValidator]}
                            />
                            <PasswordField
                                data={password}
                                setData={setPassword}
                                placeholder={'Password'}
                                name={'password'}
                                validators={[requiredValidator]}
                            />
                            <button type={'submit'} className={'btn btn-primary'}>Log In</button>
                        </div>
                    </FormValidationProvider>
                </div>
            </div>
        </>
    )
}