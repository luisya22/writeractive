import {EngineNavbar} from "@/components/Layout/EngineNavbar/EngineNavbar";
import StoriesSideBar from "@/components/Layout/StoriesSideBar/StoriesSideBar";
import {useEffect, useState} from "react";

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
            <main className={'w-screen flex'}>
                <StoriesSideBar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar}/>
                <div className={`h-screen overflow-auto w-auto flex-1`}>
                    {props.children}
                </div>
            </main>
        </>
    )
}