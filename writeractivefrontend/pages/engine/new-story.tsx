import React, {useState} from "react";
import {saveStory, StorySaveRequest} from "../../http/storyService";
import {useAuthentication} from "../../context/AuthContext";
import {useRouter} from "next/router";
import {FormValidationProvider} from "../../context/FormValidationContext";
import Image from "next/image";
import InputField from "../../components/InputField/InputField";
import TextArea from "../../components/TextArea/TextArea";
import StoryForm from "../../components/StoryForm/StoryForm";

export default function StoryCreationForm(props: any){
    return (
        <>
            <StoryForm storyId={null}
                       storyTitle={""}
                       storyDescription={""}
                       storyCoverPage={""}
                       storyGenre={""}
                       storyLanguage={""}
            />
        </>
    )

}