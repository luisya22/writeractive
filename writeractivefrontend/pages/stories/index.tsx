import {Story} from "../../types/types";
import React, {useEffect, useState} from "react";
import {getStories} from "../../http/storyService";
import {useAuthentication} from "../../context/AuthContext";
import Image from "next/image";
import Link from "next/link";

export default function EngineMainPage(props: any) {

    const [stories, setStories] = useState<Array<Story>>([]);
    const {accessToken} = useAuthentication();

    useEffect(() => {
        const getAllStories = async () => {
            const response = await getStories(accessToken??"");

            setStories(response.data);
        }

        getAllStories().catch(console.error)
    }, [accessToken])

    return (
        <>
            <div className={'container mx-auto flex flex-col'}>
                <div className={'px-0 lg:px-40'}>
                    <div className={'w-full bg-main-dark-color my-24 lg:rounded-xl p-10 flex flex-wrap items-center'}>
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
                    <div className={'flex flex-wrap w-full'}>
                        {stories.map(story => (
                            <>
                                <div className={'w-1/4 px-6'}>
                                    <div className={'flex flex-col'}>
                                        <Link href={`/stories/readings/${story.id}/create`}>
                                            <div className={'mb-4 relative hover:bg-black hover:opacity-75 cursor-pointer transition ease-in-out delay-150 hover:scale-110 duration-300'}>
                                                <Image src={ story.coverPage ? `https://res.cloudinary.com/demo/image/fetch/${story.coverPage}` : '/img.png'}
                                                       width={'160'}
                                                       height={'260'}
                                                       alt={'Image Picture'}
                                                       layout={'responsive'}
                                                />
                                            </div>
                                        </Link>
                                        <div className={'flex flex-col items-center justify-center'}>
                                            <h4 className={'text-2xl font-bold'}>{story.title}</h4>
                                            <p className={'text-xl text-gray-600'}>{story?.owner?.username}</p>
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

