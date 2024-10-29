'use client'

import React, {FC, SetStateAction} from "react";
import {Image} from "@nextui-org/image";
import {Button} from "@nextui-org/react";
import {X} from "lucide-react";
import Link from "next/link";
import {useConfiguration} from "@/components/providers/ConfigurationProvider";
import LogoutButton from "@/components/shared/LogoutButton";

interface Props {
    open: boolean,
    setOpen: React.Dispatch<SetStateAction<boolean>>,
}


const SideBar: FC<Props> = ({ open, setOpen }) => {
    const { configuration } = useConfiguration();
    const hideSidebar = () => setOpen(false);
    return (
        <>
            {open && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={hideSidebar}
                />
            )}

            <ul
                className={`fixed top-0 right-0 z-50 px-4 h-screen w-72 lg:w-[460px] bg-[#161E2C] flex flex-col gap-2 items-start transition-transform transform ${
                    open ? 'translate-x-0' : 'translate-x-full'
                }`}>
                <li className={`w-full flex lg:pt-7 pt-2 lg:pr-4 ${configuration?.currentUser.isAuthenticated ? 'justify-between' : 'justify-end'} items-center lg:justify-end`}>
                    {configuration?.currentUser.isAuthenticated &&
                        <div className={'w-full'}>
                            <div
                                className={'text-medium lg:hidden w-fit ml-2 sm:text-lg flex items-center gap-1 bg-[#2A2A2A] h-[40px] rounded-3xl px-4 py-1.5'}>
                                <p className={'flex items-end justify-end'}>{configuration?.currentUser.balance} Oracles</p>
                                <Image src={'/oracle-icon.svg'} height={22} width={24}/>
                            </div>
                        </div>
                    }
                    <Button isIconOnly className={'h-10 w-10 flex justify-center bg-[#161E2C] items-center'}
                            onClick={hideSidebar}>
                        <X strokeWidth={1.7} className="text-white h-8 w-8"/>
                    </Button>
                </li>
                <div className={'flex flex-col gap-4'}>
                    {configuration?.currentUser.isAuthenticated ?
                        <>
                            <div className={'flex flex-col gap-1'}>
                                <li onClick={hideSidebar} className="w-full pl-2 font-semibold text-xl text-[#27ACC9]">
                                    <Link href={'/'} className={''}>
                                        Add oracles
                                    </Link>
                                </li>
                                <li onClick={hideSidebar} className="w-fit hidden lg:flex">
                                    <div
                                        className={'text-medium sm:text-lg flex items-center gap-1 bg-[#2A2A2A] h-[40px] rounded-3xl px-3 py-1.5'}>
                                        <p className={'flex items-end justify-end'}>{configuration?.currentUser.balance}</p>
                                        <Image src={'/oracle-icon.svg'} height={22} width={24}/>
                                    </div>
                                </li>
                            </div>
                            <li onClick={hideSidebar} className="w-full font-light text-xl">
                                <LogoutButton/>
                            </li>
                        </>
                        :
                        <>
                            <li onClick={hideSidebar} className="w-full font-semibold text-xl text-[#27ACC9]">
                                <Link href={'/auth'}>
                                    Login
                                </Link>
                            </li>
                            <li onClick={hideSidebar} className="w-full font-semibold text-xl text-[#27ACC9]">
                                <Link href={'/auth/register'}>
                                    Create Account
                                </Link>
                            </li>
                            <li className="w-full font-light text-xl">
                                <a href="#" className="w-full">
                                    Aita
                                </a>
                            </li>
                            <li className="w-full font-light text-xl">
                                <a href="#" className="w-full">
                                    How it works?
                                </a>
                            </li>
                        </>
                    }
                    <li className="w-full font-light text-sm">
                        <a href="#" className="w-full">
                            Privacy policy
                        </a>
                    </li>
                    <li className="w-full font-light text-sm">
                        <a href="#" className="w-full">
                            Terms of Service
                        </a>
                    </li>

                    <li className="w-full font-light text-xl pt-7">
                        <a href="mailto:support@aitarot.io" className="w-full">support@aitarot.io</a>
                    </li>
                </div>

            </ul>
        </>
    )
}

export default SideBar;