import {EngineNavbar} from "./EngineNavbar/EngineNavbar";
import Head from "next/head";
import Script from "next/script";
import {useRouter} from "next/router";
import EngineLayout from "@/components/Layout/EngineLayout";
import DefaultLayout from "@/components/Layout/DefaultLayout";
import StoriesLayout from "@/components/Layout/StoriesLayout";

export default function Layout(props:{
    children: any
}){

    const router = useRouter();

    const layout = () => {
        if(router.pathname.startsWith("/engine")){
            return (
                <>
                    <EngineLayout children={props.children}/>
                </>
            )
        }

        if(router.pathname.startsWith("/stories")){
            return (
                <>
                    <StoriesLayout children={props.children}/>
                </>
            )
        }

        return (
            <>
                <DefaultLayout children={props.children}/>
            </>
        )
    }

    return (
        <div className="min-h-screen">
            <Head>
                <title>Writeractive</title>
                <meta name="description" content="The place for interactive fiction."/>
            </Head>
            {layout()}
        </div>
    )
}