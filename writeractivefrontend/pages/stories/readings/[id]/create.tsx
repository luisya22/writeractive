import {useEffect, useState} from "react";
import {ReadingSession} from "../../../../types/types";
import {findOrSaveReadingSession} from "../../../../http/readingService";
import {useAuthentication} from "../../../../context/AuthContext";
import {useRouter} from "next/router";

export default function CreateReading(props: any){

    const {accessToken} = useAuthentication();
    const router = useRouter();

    useEffect(() =>{

        const getReadingSession = async () => {

            const readingSessionResponse = await findOrSaveReadingSession(props.storyId, accessToken??"");

            if(readingSessionResponse.status == 200){
                await router.push(`/stories/readings/${readingSessionResponse.data.id}/read`)
            }
        }

        getReadingSession().catch(console.error);

    }, [])

    return (
        <>
        </>
    )
}

export function getServerSideProps(props: {params: any}){

    return {
        props: {storyId: props.params.id}
    }
}