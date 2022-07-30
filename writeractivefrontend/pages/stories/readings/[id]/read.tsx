import {useAuthentication} from "../../../../context/AuthContext";
import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import {Chapter, Choice, ReadingSession, Story} from "../../../../types/types";
import {getReadingSessionById, restartReadingSession, updateReadingSession} from "../../../../http/readingService";
import Link from "next/link";

export default function Read(props: any){

    const {accessToken} = useAuthentication();
    const router = useRouter();
    const [readingSession, setReadingSession] = useState<ReadingSession>()

    useEffect(() => {

        const getReadingSession = async () => {
            const readingSessionResponse = await getReadingSessionById(props.readingSessionId, accessToken);

            if(readingSessionResponse.status == 200){
                setReadingSession(readingSessionResponse.data);
            }
        }

        getReadingSession().catch(console.error)

    }, []);

    const handleChoiceClick = async (choiceId: string | null) => {

        const readingSessionResponse = await updateReadingSession(readingSession?.id??"", choiceId??"", accessToken);

        console.log(readingSessionResponse.data, readingSessionResponse.status)

        if(readingSessionResponse.status == 200){
            setReadingSession(readingSessionResponse.data);
        }
    }

    const handleRestartClick = async () => {
        const readingSessionResponse = await restartReadingSession(readingSession?.id??"", accessToken);

        if(readingSessionResponse.status == 200){
            console.log("Restart response", readingSessionResponse.data);
            setReadingSession(readingSessionResponse.data);
        }
    }

    return(
        <>
            <div className="mt-24 w-1/2 mx-auto">
                <div className="w-full bg-white pt-6 px-10 flex flex-col items-center mb-4">
                    <p className="text-xl w-full whitespace-pre-wrap">{readingSession?.chapter.content}</p>
                    <div className={'flex flex-col justify-center items-center my-20 space-y-6 w-1/2'}>
                        {readingSession?.chapter.isFinalChapter? (
                            <>
                                <p className={'text-xl w-full'}>You reached the end of the story</p>
                                <div className={'w-full'}>
                                    <button className={'btn btn-secondary w-full'} onClick={handleRestartClick}>Start Again</button>
                                </div>
                                <div className={'w-full'}>
                                    <Link passHref href={'/stories'}>
                                        <button className={'btn btn-secondary w-full'}>Read New Stories</button>
                                    </Link>
                                </div>
                            </>
                        ):(
                            <>
                                {readingSession?.choices.map((choice, index) => (
                                    <>
                                        <div key={choice.id} className="w-full">
                                            <button className={'btn btn-secondary w-full'} onClick={() => handleChoiceClick(choice.id)}>{choice.text}</button>
                                        </div>
                                    </>
                                ))}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export function getServerSideProps(props: {params: any}){
    return {
        props: {readingSessionId: props.params.id}
    }
}