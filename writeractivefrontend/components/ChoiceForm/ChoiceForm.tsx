import {Chapter, Choice} from "../../types/types";
import InputField from "@/components/InputField/InputField";
import ChapterSelectionBox from "@/components/ChapterSelectionBox/ChapterSelectionBox";
import React, {useEffect, useState} from "react";
import {FormValidationProvider} from "../../context/FormValidationContext";
import {useAuthentication} from "../../context/AuthContext";
import {ChoiceRequest, saveChoice} from "../../http/storyService";


export default function ChoiceForm(props: {
    chapterId: string | null
    choice: Choice,
    chapters: Array<Chapter>,
    key: number,
    index: number,
    addChoice: Function,
    deleteChoice: Function
}){

    const [id, setId] = useState<string>(props.choice.id??"")
    const [text, setText] = useState<string>(props.choice.text ?? "");
    const [selectedChapterId, setSelectedChapterId] = useState<string>(props.choice.nextChapterId??"");
    const {accessToken} = useAuthentication();

    const requiredValidator = (val: string | number) => {
        if(!val){
            return ["This field is required"]
        }

        return [];
    }

    useEffect(() => {
       handleChoiceSave().then(r => 1);
    }, [text, selectedChapterId]);

    useEffect(() => {
        setId(props.choice.id??"")
    }, [props.choice])



    const handleChoiceSave = async () => {

        const data: ChoiceRequest = {
            id,
            text,
            nextChapterId: selectedChapterId
        }

        if(text == "" || text == null){
            return;
        }

        const choiceResponse = await saveChoice(props.chapterId, data, accessToken??"");

        if(choiceResponse?.status != 200){
            return; //TODO: Alert
        }

        const choice = choiceResponse.data;

        props.addChoice(props.chapterId, choice, props.index);
    }

    return (
        <>
            <div className="flex justify-between">
                <h4 className={'text-lg font-bold mb-2'}>Choice {props.index + 1}</h4>
                <div>
                    <p className={'cursor-pointer text-red-500'} onClick={() => props.deleteChoice(props.index)}>Delete</p>
                </div>
            </div>

            <FormValidationProvider id={'choice-form-' + props.index} onSubmit={handleChoiceSave}>
                <div className="form">
                    <div className="form-group">
                <InputField
                    data={text}
                    setData={setText}
                    placeholder={'Display Text'}
                    name={'text'}
                    label={'Display Text'}
                    validators={[requiredValidator]}
                />
                <ChapterSelectionBox
                    data={selectedChapterId}
                    setData={setSelectedChapterId}
                    placeholder={"Select Next Chapter"}
                    name={"nextChapterId"}
                    label={"Next Chapter Link"}
                    validators={[requiredValidator]}
                    options={props.chapters}
                />
                    </div>
                </div>
            </FormValidationProvider>
        </>
    )
}