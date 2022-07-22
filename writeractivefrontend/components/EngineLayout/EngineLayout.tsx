import {EngineNavbar} from "./EngineNavbar";
import Head from "next/head";
import Script from "next/script";

export default function EngineLayout(props:{
    children: any
}){
    // @ts-ignore
    return (
        <div className="min-h-screen flex flex-col">
            <Head>
                <title>Writeractive Engine</title>
                <meta name="description" content="A programming blog where you will learn how to build a webpage, how to grow your developer career and all the skills you need to be successful at your coding job."/>
            </Head>
            <header className={'bg-main-dark-color shadow w-full mx-auto'}>
                <EngineNavbar/>
            </header>

            <main className="container mx-auto lg:px-24 md:px-10 px-2 mb-4">
                {props.children}
            </main>
        </div>
    )
}