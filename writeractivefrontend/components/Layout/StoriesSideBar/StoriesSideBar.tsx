import {Dispatch, SetStateAction, useEffect, useState} from "react";
import styles from "./StoriesSideBar.module.scss";
import Link from "next/link";

export default function StoriesSideBar(props: {
    openSidebar: boolean,
    setOpenSidebar: Dispatch<SetStateAction<boolean>>
}){


    if(typeof window !== 'undefined'){
        console.log(window.innerWidth, window.innerHeight);
    }

    return (
        <>
            <div className={`${props.openSidebar ? "w-2/12" : "w-20"} ${styles.sidebar}`}>
                <div className={styles.sidebarContent}>
                    <div className={styles.sidebarHeader}>
                        {props.openSidebar ? (
                            <>
                                <h1 className={styles.title}>Writeractive</h1>
                                <h2 className={styles.subTitle}>Stories</h2>
                            </>
                        ):(
                            <div className={'bg-white rounded-full h-10 w-10 flex justify-center items-center'}>
                                <h1 className={'text-3xl font-bold text-main-color'}>W</h1>
                            </div>
                        )}
                    </div>
                    <div className={`${styles.profileImageWrapper} ${props.openSidebar ? '' : 'invisible'}`}>
                        <img src="/user.png" alt="User Picture" className={styles.profileImage}/>
                    </div>
                    <div className={`${styles.usernameWrapper} ${props.openSidebar ? '' : 'hidden'}`}>
                        <h3 className={`${styles.username}`}>Username</h3>
                    </div>
                    <ul className={styles.navLinks}>
                        <li className={'w-full'}>
                            <Link passHref href={"/stories"}>
                                <div className={`${styles.navLink} ${props.openSidebar ? 'px-16 justify-start' : 'px-0 justify-center'}`}>
                                    <img src="/library.png" alt="library icon" className={styles.navLogo}/>
                                    <h3 className={`${styles.navText} ${props.openSidebar ? '' : 'hidden'}`}>Stories</h3>
                                </div>
                            </Link>
                        </li>
                        <li className={'w-full'}>
                            <Link passHref href={"/myreadings"}>
                                <div className={`${styles.navLink} ${props.openSidebar ? 'px-16 justify-start' : 'px-0 justify-center'}`}>
                                    <img src="/open-book.png" alt="library icon" className={styles.navLogo}/>
                                    <h3 className={`${styles.navText} ${props.openSidebar ? '' : 'hidden'}`}>My Readings</h3>
                                </div>
                            </Link>
                        </li>
                        <li className={'w-full'}>
                            <Link passHref href={"/mystories"}>
                                <div className={`${styles.navLink} ${props.openSidebar ? 'px-16 justify-start' : 'px-0 justify-center'}`}>
                                    <img src="/pencil.png" alt="library icon" className={`${styles.navLogo} ${props.openSidebar ? '' : 'mx-auto'}`}/>
                                    <h3 className={`${styles.navText} ${props.openSidebar ? '' : 'hidden'}`}>My Stories</h3>
                                </div>
                            </Link>
                        </li>
                    </ul>
                </div>
                <ul className={styles.navLinks}>
                    <li className={`bottom-6 absolute ${styles.logoutLink}`}>
                        <Link passHref href={"/logout"}>
                            <div className={`${styles.navLink} ${props.openSidebar ? 'px-16 justify-start' : 'px-0 justify-center'}`}>
                                <img src="/logout.png" alt="library icon" className={styles.navLogo}/>
                                <h3 className={`${styles.navText} ${props.openSidebar ? '' : 'hidden'}`}>Logout</h3>
                            </div>
                        </Link>
                    </li>
                </ul>
                <img onClick={() => props.setOpenSidebar(!props.openSidebar)}
                     className={`absolute duration-300 cursor-pointer p-1 bg-white rounded-full -right-3 top-9 w-7 border-2 border-main-color ${!props.openSidebar && "rotate-180"}` } src="/left-chevron.png" alt="."/>
            </div>
        </>
    )
}