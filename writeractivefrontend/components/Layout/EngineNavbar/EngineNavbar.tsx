import {useState} from "react";
import Image from "next/image"
import Link from "next/link";
import {useRouter} from "next/router";


export const EngineNavbar = () => {

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
            <nav className='flex justify-between items-center flex-wrap mx-auto px-4 py-3'>
                <div onClick={handleTitleClick}>
                    <h1 className={'text-2xl text-white'}>Writeractive <span className={'text-main-color'}>Engine</span></h1>
                </div>
                <div>
                    <button className={'btn btn-primary'}>Go to Stories</button>
                </div>
            </nav>
        </>
    )
}