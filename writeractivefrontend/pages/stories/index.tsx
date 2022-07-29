import {Chapter, Choice, Story} from "../../types/types";
import React, {useEffect, useRef, useState} from "react";
import {DndContext, KeyboardSensor, MouseSensor, TouchSensor, useSensor, useSensors} from "@dnd-kit/core";
import ChapterBoxDraggable from "../../components/StoryEngine/ChapterBox/ChapterBoxDraggable";
import dynamic from "next/dynamic";
import { refType, Xwrapper} from "react-xarrows";

import {useDraggable} from "react-use-draggable-scroll";
import ChapterEditor from "../../components/StoryEngine/ChapterEditor/ChapterEditor";
import {getStories, getUserStories} from "../../http/storyService";
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
        const getAllStories = async () => {
            const response = await getStories(accessToken);

            setStories(response.data);
        }

        getAllStories().catch(console.error)
    }, [accessToken])

    return (
        <>
            <div className={'container mx-auto flex flex-col'}>
                <div className={'px-40'}>
                    <div className={'w-full bg-main-dark-color my-24 rounded-xl p-10 flex flex-wrap items-center'}>
                        <div className={'w-2/3'}>
                            <h1 className={'text-3xl text-white fond-bold mb-4'}>Create your Story</h1>
                            <p className={'text-gray-300'}>Join thousands of writers who are creating sci-fi, fantasy and all types of interactive fictions. Try Writeractive Engine Today!</p>
                        </div>
                        <div className={'w-1/3 flex justify-end'}>
                            <Link passHref href={'/engine'}>
                                <button className={'btn btn-primary'}> Write a New Story</button>
                            </Link>
                        </div>
                    </div>
                    <div className={'flex flex-wrap w-full'}>
                        {stories.map(story => (
                            <>
                                <div className={'w-1/4 px-6'}>
                                    <div className={'flex flex-col'}>
                                        <div className={'mb-4'}>
                                            <Image src={ story.coverPage ? `https://res.cloudinary.com/demo/image/fetch/${story.coverPage}` : '/img.png'}
                                                   width={'160'}
                                                   height={'260'}
                                                   alt={'Image Picture'}
                                                   layout={'responsive'}
                                            />
                                        </div>
                                        <div className={'flex flex-col items-center justify-center'}>
                                            <h4 className={'text-2xl font-bold'}>{story.title}</h4>
                                            <p className={'text-xl text-gray-600'}>{story?.owner?.name}</p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ))

                        }
                    </div>
                </div>
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

