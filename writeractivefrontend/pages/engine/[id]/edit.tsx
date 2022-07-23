import {Chapter, Choice} from "../../../types/types";
import React, {useEffect, useRef, useState} from "react";
import {DndContext, KeyboardSensor, MouseSensor, TouchSensor, useSensor, useSensors} from "@dnd-kit/core";
import ChapterBoxDraggable from "../../../components/StoryEngine/ChapterBox/ChapterBoxDraggable";
import dynamic from "next/dynamic";
import { Xwrapper } from "react-xarrows";

import {useDraggable} from "react-use-draggable-scroll";
import ChapterEditor from "../../../components/StoryEngine/ChapterEditor/ChapterEditor";

const Xarrow = dynamic(() => import('react-xarrows'), {
    ssr: false
});

const defaultChapter: Chapter = {
    id: "",
    content: "",
    title: "",
    isFinalChapter: false,
    choices: [],
    positionX: 0,
    positionY: 0
}

export default function EnginePage(props: any){

    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 10
        }
    });
    const touchSensor = useSensor(TouchSensor);
    const keyboardSensor = useSensor(KeyboardSensor);
    const sensors = useSensors(mouseSensor);
    const ref = useRef() as React.MutableRefObject<HTMLDivElement>;
    // @ts-ignore
    const {events} = useDraggable(ref,
        {
            activeMouseButton: "Middle"
        });

    const [chapters, setChapters] = useState<Array<Chapter>>([]);
    const [selectedChapter, setSelectedChapter] = useState<Chapter>(defaultChapter);
    const [selectedChapterIndex, setSelectedChapterIndex] = useState<number>(-1)

    useEffect(() =>{
        console.log("Data", props)
        setChapters(props.data)
    },[]);

    const handleDragEnd = (event:any) => {
        console.log(event);

        const chaptersTemp = chapters;

        const chapterIndex = chaptersTemp.findIndex(chapter => chapter.id == event.active.id);

        chaptersTemp[chapterIndex].positionX += event.delta.x;
        chaptersTemp[chapterIndex].positionY += event.delta.y;

        setChapters([...chaptersTemp]);
    }
    
    const handleEditChapter = (chapter: Chapter, index: number) =>{

        console.log("Reached Main");
        
        const chaptersTemp = chapters;
        
        chaptersTemp[index] = chapter;

        setChapters([...chaptersTemp]);
    }

    const handleSetSelectedChapter = (chapter: Chapter, index: number) =>{
        setSelectedChapter(chapter);
        setSelectedChapterIndex(index)
    }


    return(
        <>
            <div>
                <Xwrapper>
                        <DndContext
                            onDragEnd={handleDragEnd}
                            sensors={sensors}
                        >
                           <div ref={ref} {...events} className={'overflow-scroll scrollbar-hide relative h-[90vh] w-100 flex box-border'}>
                                   {chapters?.map((chapter, index) =>{
                                       return(
                                           <div key={chapter.id}>
                                               <ChapterBoxDraggable
                                                   chapter={chapter}
                                                   onChapterClick={handleSetSelectedChapter}
                                                   index={index}
                                               />

                                               {chapter.choices.map((choice) =>{
                                                   return(
                                                       <Xarrow start={choice.parentChapter} end={choice.nextChapter}/>
                                                   )
                                               })}

                                           </div>
                                       )
                                   })}
                           </div>
                        </DndContext>
                    </Xwrapper>
                <ChapterEditor chapter={selectedChapter} editChapter={handleEditChapter}/>
            </div>
        </>
    )
}

export function getServerSideProps(){

    return {
        props:{
            data: [
                {
                    id: "1",
                    title: "Chapter One",
                    content: "This is the first chapter",
                    isFinalChapter: false,
                    choices: [
                        {
                            id: "1",
                            name: "Choice",
                            text: "text",
                            parentChapter: "1",
                            nextChapter: "2"
                        }
                    ],
                    positionX: 100,
                    positionY: 150
                },
                {
                    id: "2",
                    title: "Chapter Two",
                    content: "This is the second chapter",
                    isFinalChapter: false,
                    choices: [
                        {
                            id: "1",
                            name: "Choice",
                            text: "text",
                            parentChapter: "2",
                            nextChapter: "4"
                        }
                    ],
                    positionX: 1000,
                    positionY: 200
                },
                {
                    id: "3",
                    title: "Chapter Three",
                    content: "This is the third chapter",
                    isFinalChapter: false,
                    choices: [],
                    positionX: 1000,
                    positionY: 200
                },
                {
                    id: "4",
                    title: "Chapter Four",
                    content: "This is the fourth chapter",
                    isFinalChapter: false,
                    choices: [
                        {
                            id: "1",
                            name: "Choice",
                            text: "text",
                            parentChapter: "1",
                            nextChapter: "3"
                        }
                    ],
                    positionX: 1000,
                    positionY: 200
                },
            ]
        }
    }
}

