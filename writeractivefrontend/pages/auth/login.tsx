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


        const loginResponse = await login(data);


        if(loginResponse.status == 200){
            await setAuthenticationToken(loginResponse.data.accessToken);
            await router.push('/stories') //TODO: move to stories first
        }
    }

    const requiredValidator = (val: string | number) => {
        if(!val){
            return ["This field is required"]
        }

        return [];
    }

    return(
        <>
            <div className={'absolute h-[90vh] flex justify-center items-center w-full px-2 sm:px-0'}>
                <div className={'bg-white px-4 py-10 rounded-xl xl:w-1/4'}>
                    <FormValidationProvider onSubmit={handleLogin} id={'login-form'}>
                        <div className={'w-ful flex flex-col items-center'}>
                            <h1 className={'text-4xl font-bold'}>Log In</h1>
                            <p className={'mt-2 text-center'}>Not registered yet? <span className={'text-main-color'}>Create an account</span></p>
                        </div>
                        <div className="flex flex-col items-center w-full mt-10 space-y-6 px-6">
                            <div className="form-group w-full flex flex-col items-center justify-center">
                                <div className="w-full">
                                    <InputField
                                        data={email}
                                        setData={setEmail}
                                        placeholder={'Email'}
                                        name={'email'}
                                        label={'Email'}
                                        validators={[requiredValidator]}
                                    />
                                </div>
                            </div>
                            <div className="form-group w-full">
                                <div className="form-group w-full flex flex-col items-center justify-center">
                                    <div className="w-full">
                                        <PasswordField
                                            data={password}
                                            setData={setPassword}
                                            placeholder={'Password'}
                                            name={'password'}
                                            label={'Password'}
                                            validators={[requiredValidator]}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={'mt-10'}>
                                <button type={'submit'} className={'btn btn-primary'}>Log In</button>
                            </div>
                        </div>
                    </FormValidationProvider>
                </div>
            </div>
        </>
    )
}