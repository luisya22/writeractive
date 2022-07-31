import {Chapter, Choice, Story} from "../../../../types/types";
import React, {useEffect, useRef, useState} from "react";
import {DndContext, KeyboardSensor, MouseSensor, TouchSensor, useSensor, useSensors} from "@dnd-kit/core";
import ChapterBoxDraggable from "../../../../components/StoryEngine/ChapterBox/ChapterBoxDraggable";
import dynamic from "next/dynamic";
import { Xwrapper } from "react-xarrows";

import {useDraggable} from "react-use-draggable-scroll";
import ChapterEditor from "../../../../components/StoryEngine/ChapterEditor/ChapterEditor";
import {
    ChapterUpdateRequest, deleteChapter,
    deleteChoice,
    getChaptersByStory, getStoryById, publishStory,
    saveChapter, saveFirstChapter,
    updateChapter
} from "../../../../http/storyService";
import {useAuthentication} from "../../../../context/AuthContext";
import Link from "next/link";
import {transform} from "next/dist/build/swc";

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

    const [story, setStory] = useState<Story>();
    const [chapters, setChapters] = useState<Array<Chapter>>([]);
    const [selectedChapter, setSelectedChapter] = useState<Chapter>(defaultChapter);
    const [selectedChapterIndex, setSelectedChapterIndex] = useState<number>(-1)
    const [firstChapter, setFirstChapter] = useState<Chapter>(defaultChapter);
    const [zoom, setZoom] = useState<number>(1);

    useEffect(() =>{

        const getStory = async () => {
            const response = await getStoryById(props.storyId, accessToken??"");

            if(response.status == 200){
                setStory(response.data)
            }
        }

        const getChapters = async () => {
            const response = await getChaptersByStory(props.storyId, accessToken??"");

            if(response.status == 200){
                setChapters(response.data);
            }
        }

        getChapters().catch(console.error)
        getStory().catch(console.error)

    },[]);

    useEffect(() => {
        const firstChapter = chapters.find(c => c.id == story?.firstChapterId);

        if(!firstChapter){
            return;
        }

        setFirstChapter(firstChapter);

    }, [chapters])

    useEffect(() => {
        const firstChapter = chapters.find(c => c.id == story?.firstChapterId);

        if(!firstChapter){
            return;
        }

        setFirstChapter(firstChapter);

    }, [story])

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
            positionY: chaptersTemp[chapterIndex].positionY,
            isFinalChapter: chaptersTemp[chapterIndex].isFinalChapter
        }

        const chapterResponse = await updateChapter(props.storyId, data, accessToken??"");
    }
    
    const handleEditChapter = async (chapter: Chapter, index: number) =>{

        if(selectedChapterIndex <= -1){
            return;
        }

        let isFinalChapter: boolean = false;



        if(chapter.isFinalChapter != null){
            isFinalChapter = chapter.isFinalChapter
        }


        const data: ChapterUpdateRequest = {
            id: chapter.id,
            title: chapter.title,
            content: chapter.content,
            positionX: null,
            positionY: null,
            isFinalChapter: isFinalChapter
        }

        const chapterResponse = await updateChapter(props.storyId, data, accessToken??"");

        if(chapterResponse.status != 200){
            return;
        }
        
        const chaptersTemp = chapters;
        
        chaptersTemp[selectedChapterIndex] = chapter;

        setChapters([...chaptersTemp]);
    }

    const handleAddChoice = async (chapterId: string, choice: Choice, choiceIndex: number | null = null) => {


        const chaptersTemp = chapters;

        console.log("CreatedChoice", choiceIndex, choice);

        if(choiceIndex == null){
            choiceIndex = chaptersTemp[selectedChapterIndex].choices.map(c => c.id).indexOf(choice.id);
        }

        if(choiceIndex <= -1){
            chaptersTemp[selectedChapterIndex].choices.push(choice);
        }else{
            chaptersTemp[selectedChapterIndex].choices[choiceIndex] = choice;
        }

        setChapters([...chaptersTemp]);
        setSelectedChapter({...chaptersTemp[selectedChapterIndex]});

        console.log("Chapter", chaptersTemp[selectedChapterIndex])
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

        const chapterResponse = await saveChapter(props.storyId, data, accessToken??"");

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

    const cancelSelectedChapter = () => {
        setSelectedChapter(defaultChapter);
    }

    const handleChoiceDelete = async (choiceIndex: number) => {
        const chapter = selectedChapter;

        const choice = chapter.choices[choiceIndex];


        const choiceResponse = await deleteChoice(chapter.id, choice.id, accessToken??"");


        if(choiceResponse.status != 200){
            return; //TODO: Alert
        }

        chapter.choices.splice(choiceIndex, 1);

        const chapterIndex = chapters.findIndex(c => c.id == chapter.id);

        if(choiceIndex > -1){
            const tempChapters = chapters;
            tempChapters[chapterIndex].choices = chapter.choices;
            setChapters([...tempChapters]);
        }
    }

    const deleteSelectedChapter = async () => {

        const tempChapters = chapters;

        const chapterResponse = await deleteChapter(props.storyId, selectedChapter.id??"", accessToken??"");

        if(chapterResponse.status != 200){
            return; //TODO: Alert
        }

        tempChapters.splice(selectedChapterIndex, 1);

        setChapters([...tempChapters]);

        setSelectedChapterIndex(-1);
        setSelectedChapter(defaultChapter);
    }

    const handleFirstChapter = async () => {
        if(selectedChapter.id == null){
            return; //TODO: Alert
        }

        const storyResponse = await saveFirstChapter(props.storyId, selectedChapter.id, accessToken??"");

        if(storyResponse.status == 200){
            setStory(storyResponse.data);
        }

        //TODO: Alert updated
    }

    const handleStoryPublish = async () => {
        const storyResponse = await publishStory(props.storyId, accessToken??"");

        if(storyResponse.status == 200){
            setStory(storyResponse.data);
        }

        //TODO: Alert updated
    }

    const handleZoomOut = () => {
        if(zoom != 0.1){
            let newZoom = zoom - 0.1;

            if(newZoom < 0.1){
                newZoom = 0.1
            }
            setZoom(newZoom);
        }
    }

    const handleZoomIn = () => {
        if(zoom != 1){
            let newZoom = zoom + 0.1;

            if(newZoom > 1){
                newZoom = 1
            }

            setZoom(newZoom);
        }
    }

    const startCircleStyle: React.CSSProperties = {
        position: "absolute",
        top: firstChapter.positionY??100,
        left: firstChapter.positionX - 150??100,
    }

    return(
        <>
            <div className={'bg-main-dark-color shadow w-full mx-auto sticky top-0' }>
                <nav className={'border-t border-light flex justify-between items-center flex-wrap px-4 '}>
                    <div className={'flex justify-start space-x-2 items-center flex-wrap px-4'}>
                        <div className={'hover:bg-gray-600 hover:opacity-75 px-4 py-2'} onClick={handleNewChapter}>
                            <button
                                className={'flex items-center text-white'}><img className={'w-3 h-3 mr-1'} src={'/plus.png'} alt={'plusIcon'}
                            />New</button>
                        </div>
                        <div className={'hover:bg-gray-600 hover:opacity-75 px-4 py-2'} onClick={handleStoryPublish}>
                            <button className={['flex items-center text-white', story?.published ? "opacity-75 bg-gray-600": ""].join(" ")}><img className={'w-3 h-3 mr-1'} src={'/edit.png'} alt={'plusIcon'}
                            />{story?.published ? "Published" : "Publish"}</button>
                        </div>
                        <div>
                            <Link href={`/engine/stories/${props.storyId}/test-story`} className={'hover:bg-gray-600 hover:opacity-75 px-4 py-2'}>
                                <button className={'flex items-center text-white'}><img className={'w-3 h-3 mr-1'} src={'/test.png'} alt={'plusIcon'}
                                />Test Story</button>
                            </Link>
                        </div>
                        <div className={'hover:bg-gray-600 hover:opacity-75 px-4 py-2'} onClick={handleFirstChapter}>
                            <button className={'flex items-center text-white'}><img className={'w-5 h-5 mr-1'} src={'/play.png'} alt={'plusIcon'}
                            />Select as First Chapter</button>
                        </div>
                        <div className={'hover:bg-gray-600 self-end hover:opacity-75 px-4 py-2'}>
                            <button className={'flex items-center text-white'}>Chapters: {chapters?.length}</button>
                        </div>
                    </div>
                    <div className={'flex justify-start space-x-2 items-center flex-wrap px-4'}>
                        <div className={'hover:bg-gray-600 hover:opacity-75 px-4 py-2'} onClick={handleZoomIn}>
                            <button className={'flex items-center text-white'}><img className={'w-5 h-5 mr-1'} src={'/zoom-in.png'} alt={'plusIcon'}
                            />Zoom In</button>
                        </div>
                        <div className={'hover:bg-gray-600 hover:opacity-75 px-4 py-2'} onClick={handleZoomOut}>
                            <button className={'flex items-center text-white'}><img className={'w-5 h-5 mr-1'} src={'/zoom-out.png'} alt={'plusIcon'}
                            />Zoom Out</button>
                        </div>
                        <p className={'text-white'}>{zoom}</p>
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
                               <div style={{zoom: zoom}}>
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
                                   {story?.firstChapterId != null ? (
                                       <>
                                           <div id={'startCircle'} className={'rounded-full h-24 w-24 bg-main-color text-white shadow flex justify-center items-center'} style={startCircleStyle}>
                                               <div>
                                                   <h3 className={'text-2xl font-bold'}>Start</h3>
                                               </div>
                                           </div>
                                           <Xarrow  start={"startCircle"} end={firstChapter.id??""}/>
                                       </>
                                   ): null}
                               </div>
                           </div>
                        </DndContext>
                    </Xwrapper>
                {selectedChapter.id != '' || selectedChapter.id == null ? (
                    <ChapterEditor
                        chapter={selectedChapter}
                        editChapter={handleEditChapter}
                        chapters={chapters}
                        addChoice={handleAddChoice}
                        cancelSelectedChapter={cancelSelectedChapter}
                        deleteChoice={handleChoiceDelete}
                        deleteChapter={deleteSelectedChapter}
                    />
                ): null

                }
            </div>
        </>
    )
}

export function getServerSideProps(props: {params:any}){

    return {
        props: {storyId: props.params.id}
    }
}
