import styles from "../../styles/Home.module.scss";
import Image from "next/image";
import {MainNavbar} from "@/components/Layout/MainNavbar";

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
            </main>
        </>
    )
}