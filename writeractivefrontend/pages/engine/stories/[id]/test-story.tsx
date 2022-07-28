import React, {useEffect, useState} from "react";
import {Chapter, Story} from "../../../../types/types";
import {getChaptersByStory, getStoryById} from "../../../../http/storyService";
import {useAuthentication} from "../../../../context/AuthContext";
import Link from "next/link";

const defaultStory: Story = {
    id: null,
    coverPage: "",
    genre: "",
    language: "",
    published: false,
    title: "",
    author: "",
    slug: "",
    firstChapterId: "",
    description: ""
}

const defaultChapter: Chapter = {
    id: "",
    content: "",
    title: "",
    isFinalChapter: false,
    choices: [],
    positionX: 0,
    positionY: 0
}

export default function StoryTest(props: any){

    const [story, setStory] = useState<Story>(defaultStory);
    const [chapters, setChapters] = useState<Array<Chapter>>([]);
    const [actualChapter, setActualChapter] = useState<Chapter>(defaultChapter);
    const [previousChapters, setPreviousChapters] = useState<Array<Chapter>>([]);
    const {accessToken} = useAuthentication();


    useEffect(() => {
        const getStory = async () => {
            const response = await getStoryById(props.storyId, accessToken);

            if(response.status == 200){
                setStory(response.data);
            }

            const chapterResponse = await getChaptersByStory(props.storyId, accessToken);

            if(chapterResponse.status == 200){
                setChapters(chapterResponse.data);
            }
        }

        getStory().catch(console.error);
    },[]);

    useEffect(() => {
        selectChapter(story.firstChapterId);
    },[chapters])

    const selectChapter = (id: string) => {

        const selectedChapter = chapters.find(chapter => chapter.id == id);

        if(selectedChapter != null){
            setActualChapter(selectedChapter);
        }
    }

    const handleChoiceClick = (chapterId: string|null) => {

        const chapter: Chapter|undefined = chapters.find(c => c.id == chapterId);

        if(!chapter){
            return; //TODO: Alert
        }

        const tempPreviousChapters = previousChapters;
        tempPreviousChapters.push(actualChapter);

        setPreviousChapters([...tempPreviousChapters]);
        setActualChapter(chapter);
    }

    const handleUndoClick = () => {
        setActualChapter(previousChapters[previousChapters.length - 1]);
        const tempPreviousChapters = previousChapters;

        tempPreviousChapters.pop();
        setPreviousChapters([...tempPreviousChapters]);
    }


    return (
        <>
            <div className={'bg-main-dark-color shadow w-full mx-auto sticky top-0'}>
                <nav className={'border-t border-light flex justify-start space-x-2 items-center flex-wrap mx-auto px-4 '}>
                    <div className={'hover:bg-gray-600 hover:opacity-75 px-4 py-2'}>
                        <Link passHref href={`/engine/stories/${story.id}/edit-chapters`}>
                            <button
                                className={'flex items-center text-white'}><img className={'w-3 h-3 mr-1'} src={'/undo-white.png'} alt={'plusIcon'}
                            />Go Back</button>
                        </Link>
                    </div>
                </nav>
            </div>
            <div className={'mt-24 w-1/2 mx-auto flex justify-center'}>
                <p className={'pb-10 text-blue-600 cursor-pointer mt-5'} onClick={() => handleUndoClick()}><img className={'w-8 h-8'} src={'/undo-black.png'} alt={"Undo Icon"}/></p>
                <div className="w-11/12 mx-auto bg-white  py-6 px-10 flex flex-col items-center">
                    <p className={'text-xl w-full whitespace-pre-wrap'}>{actualChapter?.content}</p>
                    <div className={'flex flex-col justify-center items-center my-20 space-y-6 w-1/2'}>
                        {actualChapter?.choices.map(choice => (
                            <>
                                <div className="w-full">
                                    <button className={'btn btn-secondary w-full'} onClick={() => handleChoiceClick(choice.nextChapterId)}>{choice.text}</button>
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

export function getServerSideProps(props: {params:any}){

    return {
        props: {storyId: props.params.id}
    }
}
