import {ValidationFunction, Validator} from "../types/types";
import {createContext, useContext, useEffect, useState} from "react";

type formValidationContextType = {
    data: Map<string, any>,
    // validators: Map<string, Validator>,
    errors: Map<string, Array<string>>
    // @ts-ignore
    registerInput: ({name, validators}) => {  },
    // @ts-ignore
    setFieldValue: (name, value) => void
}

type formData = {
    data: Map<string, any>,
    validators: Map<string, Array<(value: string, data: Map<string, any>) => Array<string>>>,
    errors: Map<string, Array<string>>
}

const formValidationContextDefaultValues: formValidationContextType = {
    data: new Map<string, any>(),
    // validators: new Map<string, Validator>(),
    errors: new Map<string, Array<string>>(),
    registerInput: ({name, validators}) => () => {},
    setFieldValue: (name, value) => {}
}


export const FormValidationContext = createContext<formValidationContextType>(formValidationContextDefaultValues);

export function useFormValidation(){
    return useContext(FormValidationContext)
}

const defaultFormState: formData = {
    data: new Map<string, any>(),
    validators: new Map<string, Array<(value: string, data: Map<string, any>) => Array<string>>>(),
    errors: new Map<string, Array<string>>()
}

// @ts-ignore
export function FormValidationProvider({children, id, onSubmit}){

    useEffect(() => {
        setFormState(defaultFormState);
    }, [id])


    const [formState, setFormState] = useState<formData>(defaultFormState);

    // @ts-ignore
    const setFormErrors = (formError) => {
        const state = {
            data: formState.data,
            validators: formState.validators,
            errors: formError
        }

        setFormState(state);
    }

    // @ts-ignore
    const submit = (e) => {
        e.preventDefault();

        if(validate()){
            onSubmit(formState.data)
        }
    }

    const validate = () => {
        const {validators} = formState;

        setFormErrors(new Map<string, Array<string>>())

        if(!validators){
            return true;
        }

        const formErrors = new Map<string, Array<string>>();

        validators.forEach((validator, name) =>{
            const {data} = formState;
            const value = formState.data.get(name);

            let messages: Array<string> = [];

            if(value.id == id){
                messages = validator.reduce((result: Array<string>, validationFunction:  (value: string, data: Map<string, any>) => Array<string>) =>{

                   console.log("Inside", value);
                    const err: Array<string> = validationFunction(value.value, data);
                    console.log(err);
                    return [...result, ...err]
                }, []);
            }

            if(messages.length > 0){
                formErrors.set(name, messages)
            }
        });


        console.log(formErrors);
        if(formErrors.size == 0){
            return true;
        }

        setFormErrors(formErrors);
    };

    // @ts-ignore
    const setFieldValue = (name, value) => {

        const state = formState;
        state.data.set(name, {id, value});
        state.errors.set(name, []);

        setFormState(state);
    }

    // @ts-ignore
    const registerInput = ({name, validators}) => {
        const state = formState;


        state.data.set(name, "");
        state.validators.set(name, validators);

        setFormState(state);

        // return method to unregister input field
        return () => {
            setFormState(fState => {
                // copy state to avoid mutating it
                const {data, errors, validators: currentValidators}  = {...fState};

                //clear field data, validators and errors
                data.delete(name);
                currentValidators.delete(name);
                errors.delete(name);

                return {
                    data,
                    validators: currentValidators,
                    errors
                }
            })
        }
    }

    const providerValue: formValidationContextType = {
        errors: formState.errors,
        data: formState.data,
        setFieldValue,
        registerInput
    }

    return(
        <FormValidationContext.Provider value={providerValue}>
            <form
                onSubmit={submit}
                id={id}
                className={'w-full'}
            >
                {children}
            </form>
        </FormValidationContext.Provider>
    )
}