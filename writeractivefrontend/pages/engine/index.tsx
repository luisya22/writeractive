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
import Image from "next/image";
import Link from "next/link";


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
           const response = await getUserStories(accessToken??"");

           setStories(response.data);
       }

       getStories().catch(console.error)
    }, [accessToken])

    return (
        <>
            <div className={'xl:px-20 my-40 xl:my-20 w-full flex flex-col justify-center items-center'}>
                <div className={'w-full xl:w-2/3 mb-4 flex justify-between items-center'}>
                    <h1 className={'text-2xl font-bold'}>My Stories</h1>
                    <div>
                        <Link passHref href={'/engine/new-story'}>
                            <button className="btn btn-primary">New Story</button>
                        </Link>
                    </div>
                </div>
                <div className={'bg-white shadow px-10 py-10 w-full xl:w-2/3'}>
                    {stories.map(story => (
                        <>
                            <div className={'w-full flex flex-wrap justify-center md:justify-between'}>
                                <div className="xl:w-1/3 xl:flex flex-wrap justify-center items-center xl:space-x-6 mb-4">
                                    <div className={'w-full flex justify-center'}>
                                        <div className={'h-30 w-28'}>
                                            <Image src={ story.coverPage ? `https://res.cloudinary.com/demo/image/fetch/${story.coverPage}` : '/img.png'}
                                                   width={8}
                                                   height={13}
                                                   alt={'Image Picture'}
                                                   layout={'responsive'}
                                            />
                                        </div>
                                    </div>
                                    <h3 className={'text-xl font-bold flex-1 text-center w-full'}>{story.title}</h3>
                                </div>
                                <div className={'xl:w-2/3 flex flex-wrap justify-center items-center xl:justify-end space-x-2 items-start'}>
                                    <Link passHref href={`/engine/stories/${story.id}/edit-story`}>
                                        <button className={'btn btn-primary mb-2 sm:mb-0'}>Edit Story Info</button>
                                    </Link>
                                    <Link passHref href={`/engine/stories/${story.id}/edit-chapters`}>
                                        <button className={'btn btn-secondary'}>Manage Chapters</button>
                                    </Link>
                                </div>
                            </div>
                            <hr className={'my-4'}/>
                        </>
                    ))}
                </div>

                {/*{stories.map(story =>(*/}
                {/*    <>*/}
                {/*        <h1>{story.title}</h1>*/}
                {/*    </>*/}
                {/*))}*/}
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

