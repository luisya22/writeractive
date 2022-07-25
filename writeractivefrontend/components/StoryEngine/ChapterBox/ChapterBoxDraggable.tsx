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

    return(
        <button id={props.chapter.id??""} className={[styles.chapterBox, selectedClass].join(" ")} ref={setNodeRef} style={positionStyle} {...listeners} {...attributes}>
            <div>
                <h3 onClick={handleClick} className={'text-2xl'}>{props.chapter.title}</h3>
            </div>
        </button>
    )
}

