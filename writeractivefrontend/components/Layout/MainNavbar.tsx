import {useState} from "react";
import Link from "next/link";
import {useRouter} from "next/router";


export const MainNavbar = () => {

    const router = useRouter();

    const [active, setActive] = useState(false);

    const handleClick = () => {
        setActive(!active);
    };

    const handleTitleClick = () => {
        window.location.href = window.location.origin
    }

    return (
        <>
            <nav className='flex justify-between items-center flex-wrap mx-auto px-4 py-3 w-full container'>
                <div onClick={handleTitleClick}>
                    <h1 className={'text-4xl text-main-color font-medium'}>Writeractive</h1>
                </div>
                <div className={'flex space-x-2'}>
                    <Link href={'/auth/login'}>
                        <button className={'btn bg-white text-main-color font-bold shadow'}>Login</button>
                    </Link>
                    <Link href={'/auth/register'}>
                        <button className={'btn bg-white shadow font-bold'}>Register</button>
                    </Link>
                </div>
            </nav>
        </>
    )
}