
export default function DefaultLayout(props:{
    children: any
}){

    return (
        <>
            <header className={'bg-main-dark-color shadow w-full mx-auto sticky top-0 z-[100]'}>

            </header>

            <main>
                {props.children}
            </main>
        </>
    )
}