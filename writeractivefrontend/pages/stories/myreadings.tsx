import React, {useEffect, useState} from "react";
import {ReadingSession} from "../../types/types";
import {useAuthentication} from "../../context/AuthContext";
import {getReadingSessions} from "../../http/readingService";
import Link from "next/link";
import Image from "next/image";

export default function MyReadings() {

    const [readings, setReadings] = useState<Array<ReadingSession>>([]);
    const {accessToken} = useAuthentication();

    useEffect(() => {
        const getAllReadings = async () => {
            const response = await getReadingSessions(accessToken??"");

            if(response.status == 200){
                setReadings(response.data);
            }
        }

        getAllReadings().catch(console.error)

    }, []);

    return (
        <>
            <div className={'container mx-auto flex flex-col'}>
                <div className={'px-0 lg:px-20 xl:px-40'}>
                    <div className={'w-full bg-main-dark-color my-24 md:rounded-xl p-10 flex flex-wrap items-center'}>
                        <div className={'w-full sm:w-2/3'}>
                            <h1 className={'text-3xl text-white fond-bold mb-4'}>Create your Story</h1>
                            <p className={'text-gray-300'}>Join thousands of writers who are creating sci-fi, fantasy and all types of interactive fictions. Try Writeractive Engine Today!</p>
                        </div>
                        <div className={'w-full md:w-1/3 md:flex md:justify-end mt-10 md:mt-0'}>
                            <Link passHref href={'/engine'}>
                                <button className={'btn btn-primary'}> Write a New Story</button>
                            </Link>
                        </div>
                    </div>
                    <div className={'flex flex-wrap items-start w-full -mb-4'}>
                        {readings.map(reading => (
                            <>
                                <div className={'w-1/2 md:w-1/4 px-6 h-full mb-4'}>
                                    <div className={'flex flex-col'}>
                                        <Link href={`/stories/readings/${reading.story.id}/create`}>
                                            <div className={'mb-4 relative hover:bg-black hover:opacity-75 cursor-pointer transition ease-in-out delay-150 hover:scale-110 duration-300'}>
                                                <Image src={ reading.story.coverPage ? `https://res.cloudinary.com/demo/image/fetch/${reading.story.coverPage}` : '/img.png'}
                                                       width={'160'}
                                                       height={'260'}
                                                       alt={'Image Picture'}
                                                       layout={'responsive'}
                                                />
                                            </div>
                                        </Link>
                                        <div className={'flex flex-col items-center justify-center'}>
                                            <h4 className={'text-xl text-center xl:text-2xl font-bold'}>{reading.story.title}</h4>
                                            <p className={'text-xl text-gray-600'}>{reading.story?.owner?.username}</p>
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
