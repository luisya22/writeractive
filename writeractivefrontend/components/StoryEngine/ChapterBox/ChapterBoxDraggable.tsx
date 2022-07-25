import {useDraggable} from "@dnd-kit/core";
import {useXarrow} from "react-xarrows";
import React, {Dispatch, SetStateAction, useEffect} from "react";
import styles from "./Chapter.module.scss";
import {Chapter} from "../../../types/types";


export default function ChapterBoxDraggable(props: {
    chapter: Chapter,
    onChapterClick:  Function,
    index: number,
    selected: boolean
}){
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: props.chapter.id??""
    });

    const updateXarrow = useXarrow();

    const handleClick = () => {
        props.onChapterClick(props.chapter, props.index);
    }



    const positionStyle: React.CSSProperties = {
        position: "absolute",
        top: props.chapter.positionY,
        left: props.chapter.positionX,
        transform: `translate3d(${transform?.x ?? 0}px, ${transform?.y ?? 0}px, 0)`
    };

    useEffect(() =>{
        updateXarrow()
    },[transform, props.chapter.positionY, props.chapter.positionX]);

    const selectedClass = props.selected ? "border-2 border-main-color" : "";

    const validChapter: boolean = props.chapter.isFinalChapter || props.chapter.choices.length > 0;
    const validChoices: boolean = props.chapter.choices.length > 0;

    return(
        <button id={props.chapter.id??""} onClick={handleClick} className={[styles.chapterBox, selectedClass, 'cursor-pointer'].join(" ")} ref={setNodeRef} style={positionStyle} {...listeners} {...attributes}>
            <div>
                <div className="flex justify-start items-center space-x-6 mb-4">
                    <div className={['rounded-full h-5 w-5', validChapter ? 'bg-green-600' : 'bg-red-600'].join(" ")}></div>
                    <h3 className={'text-xl font-bold'}>{props.chapter.title}</h3>
                </div>
                <div className="flex justify-start items-center space-x-4">
                    <div className="flex flex-col justify-center items-center w-1/2">
                        <h5>Words</h5>
                        <p>{props.chapter.content.length}</p>
                    </div>
                    <div className="flex flex-col justify-center items-center w-1/2">
                        <h5>Choices</h5>
                        <p className={[!validChapter ? 'text-red-600' : ''].join(" ")}>{props.chapter.choices.length}</p>
                    </div>
                </div>
            </div>
        </button>
    )
}

