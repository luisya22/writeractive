import styles from "./TextArea.module.scss"
import {useEffect, useState} from "react";
import {useFormValidation} from "../../context/FormValidationContext";


export default function TextArea(props:  any){

    const [inputData, setInputData] = useState(props.data);
    const {errors, data, setFieldValue, registerInput} = useFormValidation();
    const inputValue = data.get(props.name);
    const inputErrors = errors.get(props.name);

    useEffect(() => {
        registerInput({
            name: props.name,
            validators: props.validators
        })
    }, []);

    const onInputBlur = (e: any) => {
        props.setData(e.target.value)
        setFieldValue(props.name, e.target.value);

        if(props.onChange){
            props.onChange(e.target.value)
        }
    }

    const onInputChange = (e: any) => {
        setInputData(e.target.value);
        setFieldValue(props.name, e.target.value);
    }

    useEffect(()=>{
        setInputData(props.data);
        setFieldValue(props.name, props.data);
    },[props.data]);

    // Render errors
    const renderErrors = () => {
        if(!inputErrors || inputErrors.length == 0){
            return null;
        }

        const errors: any = [];

        inputErrors.forEach((error, i) => {
            errors.push(
                <li key={`${props.name}-error-${i}`} className={styles.errorMessage}>
                    {error}
                </li>
            )
        });

        return <ul className={"error-messages"}>{errors}</ul>
    }

    return(
        <>
            <label className={styles.label}>{props.label}</label>
            <textarea value={inputData} onChange={onInputChange} onBlur={onInputBlur}
                   className={!inputErrors || inputErrors.length == 0 ? styles.textArea : styles.errorTextArea} rows={props.rows}
                   placeholder={props.placeholder}/>
            {renderErrors()}
        </>
    )
}