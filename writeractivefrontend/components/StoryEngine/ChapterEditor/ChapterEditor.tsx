import React, {useEffect, useState} from "react";

import styles from "./ChapterEditor.module.scss";
import {Chapter, Choice} from "../../../types/types";
import {FormValidationProvider, useFormValidation} from "../../../context/FormValidationContext";
import InputField from "../../InputField/InputField";
import TextArea from "@/components/TextArea/TextArea";
import ChapterSelectionBox from "@/components/ChapterSelectionBox/ChapterSelectionBox";
import ChoiceForm from "@/components/ChoiceForm/ChoiceForm";

export default function ChapterEditor(props:{
    chapter: Chapter,
    editChapter: Function,
    chapters: Array<Chapter>,
    addChoice: Function
}){

    const [selectedMenu, setSelectedMenu] = useState<string>("chapterTextMenu");
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");

    const requiredValidator = (val: string | number) => {
        if(!val){
            return ["This field is required"]
        }

        return [];
    }

    const handleSave = () => {


        const newChapterData = props.chapter;
        newChapterData.title = title;
        newChapterData.content = content;

        props.editChapter(newChapterData)
    }

    useEffect(() =>{
        setTitle(props.chapter.title)
        setContent(props.chapter.content)
    },[props.chapter.title])

    const handleChoiceAdd = (chapterId: string, choice: Choice, choiceIndex = null) => {
        props.addChoice(chapterId, choice, choiceIndex)
    }

    const addEmptyChoice = () => {

        const choice: Choice = {
            id: null,
            name: "",
            text: "",
            parentChapterId: "",
            nextChapterId: ""
        }


        props.addChoice(props.chapter.id, choice);
    }



    // Selected Menu
    const printSelectedMenu = () => {

        switch (selectedMenu){
            case "chapterTextMenu":
                return (
                    <FormValidationProvider onSubmit={handleSave}  id={'editor-form'}>
                        <div className={'flex flex-col justify-start items-start h-full  overflow-auto'}>
                            <InputField
                                data={title}
                                setData={setTitle}
                                placeholder={'Name'}
                                name={'name'}
                                validators={[requiredValidator]}
                            />
                            <TextArea
                                placeholder="Content"
                                data={content}
                                setData={setContent}
                                validators={[]}
                                name={'content'}
                                class={'h-50'}
                                rows={20}
                            />
                            <div className="w-full flex justify-end bottom-0">
                                <button type="submit" className={'btn btn-primary'}>Save</button>
                            </div>
                        </div>
                    </FormValidationProvider>
                )
            case "choicesMenu":
                return (
                    <>
                        <button className={'btn btn-secondary'} onClick={() => addEmptyChoice()}>Add Choice</button>
                        <hr className={'my-6'}/>
                        <div>
                            {props.chapter.choices.map((choice, index) => (
                                <>
                                    <ChoiceForm chapterId={props.chapter.id} choice={choice} chapters={props.chapters} key={index} index={index} addChoice={handleChoiceAdd}/>
                                    <hr className={'my-2'}/>
                                </>
                            ))}
                        </div>
                    </>
                )
            default:
                return (
                    <FormValidationProvider onSubmit={handleSave}  id={'editor-form'}>
                        <div className={'flex flex-col justify-start items-start h-full  overflow-auto'}>

                            <InputField
                                data={title}
                                setData={setTitle}
                                placeholder={'Name'}
                                name={'name'}
                                validators={[requiredValidator]}
                            />
                            <TextArea
                                placeholder="Content"
                                data={content}
                                setData={setContent}
                                validators={[]}
                                name={'content'}
                                class={'h-50'}
                                rows={20}
                            />
                            <div className="w-full flex justify-end bottom-0">
                                <button type="submit" className={'btn btn-primary'}>Save</button>
                            </div>
                        </div>
                    </FormValidationProvider>
                )
        }
    }


    return(
        <div className={styles.editorWrapper}>
            <div className={styles.editor}>
                <div className="flex justify-start mb-3 space-x-6">
                    {/*TODO:Change style*/}
                    <p className={'text-blue-700 cursor-pointer p-2 hover:bg-main-color'} onClick={() => setSelectedMenu("chapterTextMenu")}>Chapter Text</p>
                    <p className={'text-blue-700 cursor-pointer p-2 hover:bg-main-color'} onClick={() => setSelectedMenu("choicesMenu")}>Chapter Choices</p>
                </div>
                {printSelectedMenu()}
            </div>
        </div>
    )
}