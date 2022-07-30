import {EngineNavbar} from "@/components/Layout/EngineNavbar/EngineNavbar";

export default function EngineLayout(props:{
    children: any
}){

    return (
        <>
            <header className={'bg-main-dark-color shadow w-full mx-auto absolute top-0 z-[100]'}>
                <EngineNavbar/>
            </header>

            <main>
                {props.children}
            </main>
        </>
    )
}