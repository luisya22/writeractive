import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import Link from "next/link";
import React from "react";


const Home: NextPage = () => {
  return (
    <>
        <div className={'container mx-auto flex flex-col items-center justify-center'}>
            <Head>
                <title>Writeractive</title>
                <meta name="description" content="The place for interactive fiction." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className={'flex-1 w-full flex space-x-10'}>
                <div className={'w-1/2 flex flex-col justify-center space-y-3'}>
                    <h1 className={'text-7xl font-bold'}>Build and Read <span className={'text-main-color'}>Interactive</span> Fiction</h1>
                    <p className={'text-gray-600 text-4xl'}>Either you want to create or just enjoy reading great stories.</p>
                    <div>
                        <div className={'flex flex-wrap space-x-4 mt-6'}>
                            <Link passHref href={'/stories'}>
                                <button className={'btn btn-primary'}>Read Stories</button>
                            </Link>
                            <Link passHref href={'/stories'}>
                                <button className={'btn btn-secondary'}>Write Stories</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="w-1/2">
                    <div>
                        <Image src={'/main-page-picture.svg'}
                               width={50}
                               height={50}
                               alt={'Image Picture'}
                               layout={'responsive'}
                        />
                    </div>
                </div>
            </div>
        </div>
        <div className={'bg-main-color rounded-full h-72 w-72 absolute top-1/2 -left-44'}>

        </div>
        <div className={'bg-main-color rounded-full h-72 w-72 absolute -top-20 -right-44'}>

        </div>
        <div className={'bg-main-color rounded-full h-72 w-72 absolute -bottom-40 -right-24'}>

        </div>
    </>
  )
}

export default Home
