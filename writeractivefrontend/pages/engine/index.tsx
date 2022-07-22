import {Chapter} from "../../types/types";
import {useEffect, useState} from "react";
import {DndContext} from "@dnd-kit/core";
import ChapterBox from "../../components/StoryEngine/ChapterBox/ChapterBox";
import dynamic from "next/dynamic";
import { Xwrapper } from "react-xarrows";
import ScrollContainer from "react-indiana-drag-scroll";

const Xarrow = dynamic(() => import('react-xarrows'), {
    ssr: false
});

export default function EnginePage(){

    const [chapters, setChapters] = useState<Array<Chapter>>([])

    useEffect(() =>{
        setChapters([
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
                content: "This is the first chapter",
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
                content: "This is the first chapter",
                isFinalChapter: false,
                choices: [],
                positionX: 1000,
                positionY: 200
            },
            {
                id: "4",
                title: "Chapter Four",
                content: "This is the first chapter",
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
        ])
    },[]);

    function handleDragEnd(event:any){
        console.log(event);

        const chaptersTemp = chapters;

        const chapterIndex = chaptersTemp.findIndex(chapter => chapter.id == event.active.id);

        console.log(chapterIndex);

        chaptersTemp[chapterIndex].positionX += event.delta.x;
        chaptersTemp[chapterIndex].positionY += event.delta.y;

        setChapters([...chaptersTemp])
    }

    return(
        <>
            <div>
                <ScrollContainer>
                    <Xwrapper>
                        <DndContext
                            onDragEnd={handleDragEnd}>
                            {chapters.map((chapter) =>{
                                return(
                                    <div key={chapter.id}>
                                        <ChapterBox chapter={chapter}>
                                            <div>
                                                <h3 className={'text-2xl'}>{chapter.title}</h3>
                                            </div>
                                        </ChapterBox>
                                        {chapter.choices.map((choice) =>{
                                            return(
                                                <Xarrow start={choice.parentChapter} end={choice.nextChapter}/>
                                            )
                                        })}
                                    </div>
                                )
                            })}

                        </DndContext>
                    </Xwrapper>
                </ScrollContainer>
            </div>
        </>
    )
}