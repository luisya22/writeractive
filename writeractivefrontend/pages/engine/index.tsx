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
           const response = await getUserStories(accessToken);

           setStories(response.data);
       }

       getStories().catch(console.error)
    }, [accessToken])

    return (
        <>
            <div className={'px-20 my-20 w-full flex flex-col justify-center items-center'}>
                <div className={'w-2/3 mb-4 flex justify-between items-center'}>
                    <h1 className={'text-2xl font-bold'}>My Stories</h1>
                    <div>
                        <Link passHref href={'/engine/new-story'}>
                            <button className="btn btn-primary">New Story</button>
                        </Link>
                    </div>
                </div>
                <div className={'bg-white shadow px-10 py-10 w-2/3'}>
                    {stories.map(story => (
                        <>
                            <div className={'w-full flex justify-between'}>
                                <div className="w-1/3 flex flex-wrap space-x-6">
                                    <div className={'h-30 w-28'}>
                                        <Image src={ story.coverPage ? `https://res.cloudinary.com/demo/image/fetch/${story.coverPage}` : '/img.png'}
                                               width={'8'}
                                               height={'13'}
                                               alt={'Image Picture'}
                                               layout={'responsive'}
                                        />
                                    </div>
                                    <h3 className={'text-xl font-bold'}>{story.title}</h3>
                                </div>
                                <div className={'w-2/3 flex justify-end space-x-2 items-start'}>
                                    <div>
                                        <button className={'btn btn-primary'}>Edit Story Info</button>
                                    </div>
                                    <div>
                                        <button className={'btn btn-secondary'}>Manage Chapters</button>
                                    </div>
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

