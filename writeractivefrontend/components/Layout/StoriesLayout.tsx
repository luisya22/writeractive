import {EngineNavbar} from "@/components/Layout/EngineNavbar/EngineNavbar";
import StoriesSideBar from "@/components/Layout/StoriesSideBar/StoriesSideBar";
import {useEffect, useState} from "react";
import styles from "../../styles/Home.module.scss";
import Image from "next/image";

export default function StoriesLayout(props:{
    children: any
}){

    const [openSidebar, setOpenSidebar] = useState<boolean>(true)

    useEffect(() =>{
        if(typeof  window !== 'undefined'){
            if(window.innerWidth < 1024){
                setOpenSidebar(false);
            }
        }
    },[])

    return (
        <>
            <main className={'w-screen lg:flex'}>
                <StoriesSideBar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar}/>
                <div className={`h-screen overflow-auto w-auto w-full lg:flex-1 relative ${openSidebar ? 'bg-gray-600 lg:bg-background-color opacity-75 lg:opacity-100' : ''}`}>
                    {props.children}
                </div>

            </main>

        </>
    )
}