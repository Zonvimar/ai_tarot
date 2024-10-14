import {Image} from "@nextui-org/image";
import React, {FC} from "react";

type Props = {
    children: React.ReactNode,
    imageSrc: string,
}

const ImageBlock: FC<Props> = ({children, imageSrc}) => {
    return (
        <div className={'w-full flex flex-col gap-6 justify-center items-center text-center'}>
            <div className={'flex-col gap-2 hidden sm:flex'}>
                <p className={'text-xl sm:text-3xl font-semibold'}>Aita, ai tarologist</p>
                <div
                    className={'w-full flex gap-1 text-[#BEBEBE] items-center justify-center text-center text-xs sm:text-medium  font-normal'}>
                    <div className={'bg-[#14B411] rounded-full w-2 h-2'}></div>
                    Always online to help you find answers
                </div>
            </div>
            <Image
                src={imageSrc}
                alt={'logo'}
                width={325}
                height={325}
                // removeWrapper
                classNames={{
                    img: [
                        'backdrop-blur-xs',
                    ],
                    wrapper: [
                        'rounded-full shadow-[#22879D] shadow-[0_0_25px_1px_rgba(0,0,0,0.3)] mt-4 sm:mt-0 bg-opacity-55 bg-[#22879D]'
                    ]
                }}

                style={{
                    width: '50vw',
                    maxWidth: '325px',
                    height: 'auto',
                    transition: 'width 0.5s ease-in-out',
                }}
            />
            <div className={'flex flex-col gap-2'}>
                {children}
                {/*<h1 className={'w-full text-center text-2xl sm:text-3xl font-bold'}>*/}
                {/*    Nice to meet you 👋*/}
                {/*</h1>*/}
            </div>
        </div>
    )
}

export default ImageBlock