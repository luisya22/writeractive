import {Chapter, Choice} from "../../../../types/types";
import React, {useEffect, useRef, useState} from "react";
import {DndContext, KeyboardSensor, MouseSensor, TouchSensor, useSensor, useSensors} from "@dnd-kit/core";
import ChapterBoxDraggable from "../../../../components/StoryEngine/ChapterBox/ChapterBoxDraggable";
import dynamic from "next/dynamic";
import { Xwrapper } from "react-xarrows";

import {useDraggable} from "react-use-draggable-scroll";
import ChapterEditor from "../../../../components/StoryEngine/ChapterEditor/ChapterEditor";
import {ChapterUpdateRequest, getChaptersByStory, saveChapter, updateChapter} from "../../../../http/storyService";
import {useAuthentication} from "../../../../context/AuthContext";

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

//TODO: Separate on multiple components and use Context API to avoid prop drilling

export default function EnginePage(props: any){

    const {accessToken} = useAuthentication();

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

        const getChapters = async () => {
            const response = await getChaptersByStory(props.storyId, accessToken);

            if(response.status == 200){
                setChapters(response.data);
            }
        }

        getChapters().catch(console.error)

        setChapters(props.data)
    },[]);

    const handleDragEnd = async (event:any) => {

        const chaptersTemp = chapters;

        const chapterIndex = chaptersTemp.findIndex(chapter => chapter.id == event.active.id);

        chaptersTemp[chapterIndex].positionX += event.delta.x;
        chaptersTemp[chapterIndex].positionY += event.delta.y;

        setChapters([...chaptersTemp]);

        const chapter = chapters[chapterIndex];

        const data: ChapterUpdateRequest = {
            id: chaptersTemp[chapterIndex].id,
            title: chaptersTemp[chapterIndex].title,
            content: chaptersTemp[chapterIndex].content,
            positionX: chaptersTemp[chapterIndex].positionX,
            positionY: chaptersTemp[chapterIndex].positionY
        }

        const chapterResponse = await updateChapter(props.storyId, data, accessToken);
    }
    
    const handleEditChapter = async (chapter: Chapter, index: number) =>{


        const data: ChapterUpdateRequest = {
            id: chapter.id,
            title: chapter.title,
            content: chapter.content,
            positionX: null,
            positionY: null
        }

        const chapterResponse = await updateChapter(props.storyId, data, accessToken);

        if(chapterResponse.status != 200){
            return;
        }
        
        const chaptersTemp = chapters;
        
        chaptersTemp[selectedChapterIndex] = chapter;

        setChapters([...chaptersTemp]);
    }

    const handleAddChoice = async (chapterId: string, choice: Choice, choiceIndex: number | null = null) => {


        console.log("Saved Choice", choice);
        const chaptersTemp = chapters;

        if(choiceIndex == null){
            choiceIndex = chaptersTemp[selectedChapterIndex].choices.map(c => c.id).indexOf(choice.id);
        }

        if(choiceIndex <= -1){
            chaptersTemp[selectedChapterIndex].choices.push(choice);
        }else{
            chaptersTemp[selectedChapterIndex].choices[choiceIndex] = choice;
        }

        setChapters([...chaptersTemp]);
    }

    const handleSetSelectedChapter = (chapter: Chapter, index: number) =>{
        setSelectedChapter(chapter);
        setSelectedChapterIndex(index)
    }

    const handleNewChapter = async () =>{

        const {positionX, positionY} = getChapterSpawnPosition();

        const data: Chapter = {
            id: null,
            content: "",
            title: "New Chapter",
            isFinalChapter: false,
            choices: [],
            positionX: positionX,
            positionY: positionY
        }

        const chapterResponse = await saveChapter(props.storyId, data, accessToken);

        if(chapterResponse.status != 200){
            return; //TODO: Alert
        }

        const chapter = chapterResponse.data;
        const chaptersTemp = chapters;

        chaptersTemp.push(chapter);

        setChapters([...chaptersTemp]);
    }

    const getChapterSpawnPosition = () => {
        let positionX = 100;
        let positionY = 100;

        if(selectedChapter){

            const chapterIds: Array<string> = selectedChapter.choices.map(choice => choice.nextChapterId??"");

            const positionsX: Array<number> = [];
            const positionsY: Array<number> = [];

            chapters.forEach( chapter => {
                if(chapterIds.includes(chapter.id??"")){
                    positionsX.push(chapter.positionX);
                    positionsY.push(chapter.positionY);
                }
            });

            positionX = (positionsX.reduce((sum, position) => sum + position, 0) / positionsX.length) + 20;
            positionY = (positionsY.reduce((sum, position) => sum + position, 0) / positionsY.length) + 20;
         }

        return {positionX, positionY}
    }

    return(
        <>
            <div className={'bg-main-dark-color shadow w-full mx-auto sticky top-0'}>
                <nav className={'border-t border-light flex justify-start space-x-2 items-center flex-wrap mx-auto px-4 '}>
                    <div className={'hover:bg-gray-600 hover:opacity-75 px-4 py-2'}>
                        <button
                            onClick={handleNewChapter}
                            className={'flex items-center text-white'}><img className={'w-3 h-3 mr-1'} src={'/plus.png'} alt={'plusIcon'}
                        />New</button>
                    </div>
                    <div className={'hover:bg-gray-600 hover:opacity-75 px-4 py-2'}>
                        <button className={'flex items-center text-white'}><img className={'w-3 h-3 mr-1'} src={'/edit.png'} alt={'plusIcon'}
                        />Edit</button>
                    </div>
                    <div className={'hover:bg-gray-600 hover:opacity-75 px-4 py-2'}>
                        <button className={'flex items-center text-white'}><img className={'w-3 h-3 mr-1'} src={'/test.png'} alt={'plusIcon'}
                        />Test</button>
                    </div>
                    <div className={'hover:bg-gray-600 hover:opacity-75 px-4 py-2'}>
                        <button className={'flex items-center text-white'}><img className={'w-3 h-3 mr-1'} src={'/test.png'} alt={'plusIcon'}
                        />Chapters {chapters?.length}</button>
                    </div>
                </nav>
            </div>
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
                                                   selected={chapter.id == selectedChapter.id}
                                                   onChapterClick={handleSetSelectedChapter}
                                                   index={index}
                                               />

                                               {chapter.choices.map((choice, index) =>{
                                                   return(
                                                       <>
                                                           {choice.nextChapterId != null ? (
                                                               <Xarrow key={choice.id + '-' + index} start={choice.parentChapterId??""} end={choice.nextChapterId??""}/>
                                                           ):null}
                                                       </>
                                                   )
                                               })}

                                           </div>
                                       )
                                   })}
                           </div>
                        </DndContext>
                    </Xwrapper>
                {selectedChapter.id != '' || selectedChapter.id == null ? (
                    <ChapterEditor chapter={selectedChapter} editChapter={handleEditChapter} chapters={chapters} addChoice={handleAddChoice}/>
                ): null

                }
                {selectedChapter.id}
            </div>
        </>
    )
}

export function getServerSideProps(props: {params:any}){

    return {
        props: {storyId: props.params.id}
    }
}
