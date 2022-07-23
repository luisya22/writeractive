import React, {useEffect, useState} from "react";

import styles from "./ChapterEditor.module.scss";
import {Chapter} from "../../../types/types";
import {FormValidationProvider, useFormValidation} from "../../../context/FormValidationContext";
import InputField from "../../InputField/InputField";

export default function ChapterEditor(props:{
    chapter: Chapter,
    editChapter: Function
}){

    const [title, setTitle] = useState<string>("");

    const requiredValidator = (val: string | number) => {
        if(!val){
            return ["This field is required"]
        }

        return [];
    }

    const handleSave = () => {

        console.log("Saving...");

        const newChapterData = props.chapter;
        newChapterData.title = title;

        props.editChapter(newChapterData)
    }

    useEffect(() =>{
        setTitle(props.chapter.title)
    },[props.chapter.title])

    return(
        <div className={styles.editorWrapper}>
            <div className={styles.editor}>
                <FormValidationProvider onSubmit={handleSave}  id={'editor-form'}>
                    <div className={'flex flex-col justify-center items-center'}>
                        <button type="submit" className={'btn btn-primary'}>Save</button>
                        <InputField
                            data={title}
                            setData={setTitle}
                            placeholder={'Name'}
                            name={'name'}
                            validators={[requiredValidator]}
                        />
                        <h1 className={'bold text-2xl mb-8'}>{props.chapter.title}</h1>
                        <p className={'w-full'}>{props.chapter.content}</p>
                    </div>
                </FormValidationProvider>
            </div>
        </div>
    )
}