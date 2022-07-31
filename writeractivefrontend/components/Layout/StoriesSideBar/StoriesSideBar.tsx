import {Dispatch, SetStateAction, useEffect, useState} from "react";
import styles from "./StoriesSideBar.module.scss";
import Link from "next/link";
import {useAuthentication} from "../../../context/AuthContext";

export default function StoriesSideBar(props: {
    openSidebar: boolean,
    setOpenSidebar: Dispatch<SetStateAction<boolean>>
}){

    const {user} = useAuthentication();

    if(typeof window !== 'undefined'){
        console.log(window.innerWidth, window.innerHeight);
    }

    const handleOpenSideBar = () => {
        console.log("Sidebar Open");
    }

    return (
        <>
            {!props.openSidebar ? (
                <div className={'p-2 cursor-pointer lg:hidden z-[100]'} onClick={() => props.setOpenSidebar(!props.openSidebar)}>
                    <img src="/menu.png" alt="library icon" className={styles.menuIcon}/>
                </div>
            ):null}
            <div className={`${props.openSidebar ? "translate-x-0 ease-in-out duration-300 w-2/3 md:w-3/12 lg:w-3/12 xl:w-2/12" : "-translate-x-full lg:translate-x-0 ease-in-out duration-300 lg:w-20 lg:block"} ${styles.sidebar}`}>
                <div className={'p-4 cursor-pointer lg:hidden'} onClick={() => props.setOpenSidebar(!props.openSidebar)}>
                    <img src="/close.png" alt="library icon" className={styles.closeIcon}/>
                </div>
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
                        <h3 className={`${styles.username}`}>{user?.username}</h3>
                    </div>
                    <ul className={styles.navLinks}>
                        <li className={'w-full'} key={'stories'}>
                            <Link passHref href={"/stories"}>
                                <div className={`${styles.navLink} ${props.openSidebar ? 'px-4 2xl:px-16 justify-start' : 'px-0 justify-center'}`}>
                                    <img src="/library.png" alt="library icon" className={styles.navLogo}/>
                                    <h3 className={`${styles.navText} ${props.openSidebar ? '' : 'hidden'}`}>Stories</h3>
                                </div>
                            </Link>
                        </li>
                        <li className={'w-full'} key={'myreadings'}>
                            <Link passHref href={"/stories/myreadings"}>
                                <div className={`${styles.navLink} ${props.openSidebar ? 'px-4 2xl:px-16 justify-start' : 'px-0 justify-center'}`}>
                                    <img src="/open-book.png" alt="library icon" className={styles.navLogo}/>
                                    <h3 className={`${styles.navText} ${props.openSidebar ? '' : 'hidden'}`}>My Readings</h3>
                                </div>
                            </Link>
                        </li>
                        <li className={'w-full'} key={'mystories'}>
                            <Link passHref href={"/engine"}>
                                <div className={`${styles.navLink} ${props.openSidebar ? 'px-4 2xl:px-16 justify-start' : 'px-0 justify-center'}`}>
                                    <img src="/pencil.png" alt="library icon" className={`${styles.navLogo} ${props.openSidebar ? '' : 'mx-auto'}`}/>
                                    <h3 className={`${styles.navText} ${props.openSidebar ? '' : 'hidden'}`}>My Stories</h3>
                                </div>
                            </Link>
                        </li>
                    </ul>
                    <img onClick={() => props.setOpenSidebar(!props.openSidebar)}
                         className={`hidden lg:block absolute duration-300 cursor-pointer p-1 bg-white rounded-full -right-3 top-9 w-7 border-2 border-main-color ${!props.openSidebar && "rotate-180"}` } src="/left-chevron.png" alt="."/>
                </div>
                <ul className={styles.navLinks}>
                    <li className={`bottom-6 absolute ${styles.logoutLink}`} key={'/logout'}>
                        <Link passHref href={"/auth/logout"}>
                            <div className={`${styles.navLink} ${props.openSidebar ? 'px-4 2xl:px-16 justify-start' : 'px-0 justify-center'}`}>
                                <img src="/logout.png" alt="library icon" className={styles.navLogo}/>
                                <h3 className={`${styles.navText} ${props.openSidebar ? '' : 'hidden'}`}>Logout</h3>
                            </div>
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    )
}