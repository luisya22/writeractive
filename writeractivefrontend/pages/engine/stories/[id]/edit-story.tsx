import React, {useEffect, useState} from "react";
import StoryForm from "@/components/StoryForm/StoryForm";
import {getStoryById} from "../../../../http/storyService";
import {useAuthentication} from "../../../../context/AuthContext";
import {Story} from "../../../../types/types";

const defaultStory: Story = {
    id: null,
    coverPage: "",
    genre: "",
    language: "",
    published: false,
    title: "",
    owner: "",
    slug: "",
    firstChapterId: "",
    description: ""
}

export default function StoryCreationForm(props: any){

    const [story, setStory] = useState<Story>(defaultStory);
    const {accessToken} = useAuthentication();

    useEffect(() => {
        const getStory = async () => {
            const response = await getStoryById(props.storyId, accessToken);

            if(response.status == 200){
                setStory(response.data);
            }

        }

        getStory().catch(console.error);

    }, [])

    return (
        <>
            <StoryForm storyId={story.id}
                       storyTitle={story.title}
                       storyDescription={story.description}
                       storyCoverPage={story.coverPage}
                       storyGenre={story.genre}
                       storyLanguage={story.language}
            />
        </>
    )

}

export function getServerSideProps(props: {params:any}){

    return {
        props: {storyId: props.params.id}
    }
}

