import styles from "../../styles/Home.module.scss";
import Image from "next/image";
import {MainNavbar} from "@/components/Layout/MainNavbar";
import Link from "next/link";

export default function DefaultLayout(props:{
    children: any
}){

    return (
        <>
            <header className={'w-full absolute top-0 z-[100]'}>
                <MainNavbar/>
            </header>

            <main className={'min-h-screen flex flex-col justify-center overflow-hidden relative'}>
                {props.children}
                <footer className={styles.footer}>
                    <p>Made by Luis Matos for the <Link href={'https://planetscale.com'}><span className={'text-blue-700 cursor-pointer'}>#PlanetScale</span></Link> and <Link href={'https://hashnode.com'}><span className={'text-blue-700 cursor-pointer'}>#Hashnode</span></Link>  Hackathon</p>
                </footer>
            </main>
        </>
    )
}