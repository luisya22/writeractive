import {Chapter, Choice, Story} from "../../types/types";
import React, {useEffect, useRef, useState} from "react";
import {DndContext, KeyboardSensor, MouseSensor, TouchSensor, useSensor, useSensors} from "@dnd-kit/core";
import ChapterBoxDraggable from "../../components/StoryEngine/ChapterBox/ChapterBoxDraggable";
import dynamic from "next/dynamic";
import { refType, Xwrapper} from "react-xarrows";

import {useDraggable} from "react-use-draggable-scroll";
import ChapterEditor from "../../components/StoryEngine/ChapterEditor/ChapterEditor";
import {getUserStories} from "../../http/storyService";
import {useAuthentication} from "../../context/AuthContext";


const defaultChapter: Chapter = {
    id: "",
    content: "",
    title: "",
    isFinalChapter: false,
    choices: [],
    positionX: 0,
    positionY: 0
}

export default function EngineMainPage(props: any) {

    const [stories, setStories] = useState<Array<Story>>([]);
    const {accessToken} = useAuthentication();

    useEffect(() => {
       const getStories = async () => {
           const response = await getUserStories(accessToken);

           setStories(response.data);
       }

       getStories().catch(console.error)
    }, [accessToken])

    return (
        <>
            <div>
                {stories.map(story =>(
                    <>
                        <h1>{story.title}</h1>
                    </>
                ))}
            </div>
        </>
    )
}

export function getServerSideProps(){

    return {
        props:{
            data: [

            ]
        }
    }
}

