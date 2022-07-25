import React from "react";
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