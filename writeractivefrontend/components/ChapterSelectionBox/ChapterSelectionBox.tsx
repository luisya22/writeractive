import styles from "./ChapterSelectionBox.module.scss"
import {useEffect, useState} from "react";
import {Chapter} from "../../types/types";


export default function ChapterSelectionBox(props: any){

    const [inputData, setInputData] = useState(props.data);
    const [options, setOptions] = useState(props.options);

    const onInputChange = (e: any) => {
        setInputData(e.target.value)
        props.setData(e.target.value);
    }

    useEffect(() => {
        setInputData(props.data)
        setOptions(props.options)
    },[props.data, props.options])

    return(
        <>
            <label className={styles.label}>{props.label}</label>
            <select className="w-full xl:w-2/3 h-10 px-3 mb-2 bg-white text-base text-gray-700 placeholder-gray-600 border rounded-lg"
                    onChange={e => onInputChange(e)}
                    value={inputData}
            >
                <option></option>
                {
                    options.map((option: Chapter, index: number) => {
                        return (
                            <option value={option.id} key={index}>{option.title}</option>
                        )
                    })
                }
            </select>
        </>
    )
}