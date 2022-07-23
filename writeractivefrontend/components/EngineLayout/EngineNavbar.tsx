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


    const navbarButtons = (
        <nav className={'border-t border-light flex justify-start space-x-8 items-center flex-wrap mx-auto px-4 py-2'}>
            <div>
                <button className={'flex items-center text-white'}><img className={'w-3 h-3 mr-1'} src={'/plus.png'} alt={'plusIcon'}
                />New</button>
            </div>
            <div>
                <button className={'flex items-center text-white'}><img className={'w-3 h-3 mr-1'} src={'/edit.png'} alt={'plusIcon'}
                />Edit</button>
            </div>
            <div>
                <button className={'flex items-center text-white'}><img className={'w-3 h-3 mr-1'} src={'/test.png'} alt={'plusIcon'}
                />Test</button>
            </div>
        </nav>
    )

    const setNavBarButtons = router.pathname == "/engine/[id]/edit";

    return (
        <>
            <nav className='flex justify-between items-center flex-wrap mx-auto px-4 py-3'>
                <div>
                    <h1 className={'text-2xl text-white'}>Writeractive <span className={'text-main-color'}>Engine</span></h1>
                </div>
                <div>
                    <button className={'btn btn-primary'}>Go to Stories</button>
                </div>
            </nav>
            {setNavBarButtons?
                (
                    navbarButtons
                ):null
            }
        </>
    )
}