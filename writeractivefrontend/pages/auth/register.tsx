import React, {useState} from "react";
import {useAuthentication} from "../../context/AuthContext";
import {useRouter} from "next/router";
import {login, register, RegisterRequest} from "../../http/authService";
import {FormValidationProvider} from "../../context/FormValidationContext";
import InputField from "@/components/InputField/InputField";
import PasswordField from "@/components/PasswordField/PasswordField";
import Link from "next/link";

export default function RegisterForm(props: any){

    //TODO: Set user info

    const [name, setName] = useState<string>("");
    const [username, setUsername] = useState<string>("")
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const {setAuthenticationToken, accessToken} = useAuthentication();
    const router = useRouter();

    const handleRegister = async () => {
        const data: RegisterRequest = {
            email,
            password,
            username,
            name
        }


        const loginResponse = await register(data);


        if(loginResponse.status == 200){
            await router.push('/auth/login')
        }
    }

    const requiredValidator = (val: string | number) => {
        if(!val){
            return ["This field is required"]
        }

        return [];
    }

    const confirmPasswordValidator = (val: string | number, data: any) =>{

        console.log("Validator: ", data.get('password').value.value == data.get('confirmPassword').value.value, data.get('password').value, data.get('confirmPassword').value);
        if(data.get('password').value != data.get('confirmPassword').value){
            console.log("Returning");
            return ["Password does not match"]
        }

        return []
    }

    return(
        <>
            <div className={'absolute h-[90vh] flex justify-center items-center w-full px-2 sm:px-0'}>
                <div className={'bg-white px-4 py-10 rounded-xl xl:w-1/4'}>
                    <FormValidationProvider onSubmit={handleRegister} id={'register-form'}>
                        <div className={'w-ful flex flex-col items-center'}>
                            <h1 className={'text-4xl font-bold'}>Create Account</h1>
                            <p className={'mt-2 text-center'}>Already have an account? <Link href={"/auth/login"}><span className={'text-main-color cursor-pointer'}>Sign In</span></Link></p>
                        </div>
                        <div className="flex flex-col items-center w-full mt-10 space-y-6 px-6">
                            <div className="form-group w-full flex flex-col items-center justify-center">
                                    <div className="w-full">
                                        <InputField
                                            data={name}
                                            setData={setName}
                                            placeholder={'Full Name'}
                                            name={'name'}
                                            label={'Full Name'}
                                            validators={[requiredValidator]}
                                        />
                                    </div>
                            </div>
                            <div className="form-group w-full flex flex-col items-center justify-center">
                                <div className="w-full">
                                    <InputField
                                        data={username}
                                        setData={setUsername}
                                        placeholder={'Username'}
                                        name={'username'}
                                        label={'Username'}
                                        validators={[requiredValidator]}
                                    />
                                </div>
                            </div>
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
                            <div className="form-group w-full">
                                <div className="w-full">
                                    <PasswordField
                                        data={confirmPassword}
                                        setData={setConfirmPassword}
                                        placeholder={'Confirm Password'}
                                        name={'confirmPassword'}
                                        label={'Confirm Password'}
                                        validators={[requiredValidator, confirmPasswordValidator]}
                                    />
                                </div>
                            </div>
                            <div className={'mt-10'}>
                                <button type={'submit'} className={'btn btn-primary'}>Register</button>
                            </div>
                        </div>
                    </FormValidationProvider>
                </div>
            </div>
        </>
    )
}