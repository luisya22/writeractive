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
            <main className={'w-screen flex'}>
                <StoriesSideBar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar}/>
                <div className={`h-screen overflow-auto w-auto flex-1 relative`}>
                    {props.children}

                    <footer className={styles.footer}>
                        <a
                            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Powered by{' '}
                            <span className={styles.logo}>
                                <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
                            </span>
                        </a>
                    </footer>
                </div>

            </main>

        </>
    )
}