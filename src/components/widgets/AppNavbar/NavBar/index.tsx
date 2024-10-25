'use client'
import {Button, Navbar, NavbarBrand, NavbarContent, NavbarItem} from '@nextui-org/react'
import {AlignJustify, X} from "lucide-react";
import React, {FC, useState} from "react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import Link from "next/link";
import {Image} from "@nextui-org/image";
import {ConfigurationType} from "@/lib/types/config.types";
import {useConfiguration} from "@/components/providers/ConfigurationProvider";


const NavBar = () => {
    const { configuration } = useConfiguration();
    const searchParams = useSearchParams();
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const showSidebar = () => setSidebarVisible(true);
    const hideSidebar = () => setSidebarVisible(false);

    const getNavItem = () => {
        switch(pathname) {
            case '/':
            case '/chat/new':
            case '/chat/[id]':
                return <div className={'text-medium sm:text-lg flex items-center gap-1 bg-[#2A2A2A] h-[40px] rounded-3xl px-3 py-1.5'}>
                    <p className={'flex items-end justify-end'}>{configuration?.currentUser.balance}</p>
                    <Image src={'/oracle-icon.svg'} height={22} width={24}/>
                </div>
            case '/auth/register':
            case '/auth/approve-email':
            case '/auth/reset-password':
            case '/auth/new-password':
                return <Link href={'/auth'} className={'font-bold text-[#27ACC9] text-sm sm:text-lg'}>Log in</Link>
            case '/auth/onboard':
                return <Link href={'/auth'} className={'font-bold text-[#27ACC9] hidden sm:flex text-sm sm:text-lg'}>Log in</Link>
            case '/auth':
                return <Link href={'/auth/register'} className={'font-bold text-[#27ACC9] text-sm sm:text-lg'}>Sign up</Link>
            default:
                return null
        }
    }

    return (
        <>
            <Navbar className={`z-50 bg-opacity-0 ${pathname === '/' ? 'lg:hidden' : ''}`} isBlurred={false} height={'58px'} maxWidth={'full'} classNames={{
                item: [
                    // "flex",
                    // "relative",
                    // "h-full",
                    "items-center",
                    "backdrop-opacity-10",
                    "data-[active=true]:after:content-['']",
                    "data-[active=true]:after:absolute",
                    "data-[active=true]:after:bottom-0",
                    "data-[active=true]:after:left-0",
                    "data-[active=true]:after:right-0",
                    "data-[active=true]:after:h-[2px]",
                    "data-[active=true]:after:rounded-[2px]",
                    // "data-[active=true]:after:bg-content1",
                ],
                wrapper: [
                    'px-2'
                ]
            }}>
                <NavbarBrand className={'w-full items-center pl-2 gap-3'}>
                    <div onClick={() => {
                        router.back()
                    }} className={'cursor-pointer w-[15px] h-[15px]'}>
                        <Image src={'/chevronLeft.svg'} height={15} width={9}/>
                    </div>
                    {searchParams.has('chatDate') ? <p className={'text-xl font-semibold'}>Chat from {searchParams.get('chatDate')}</p> : null}
                </NavbarBrand>
                <NavbarContent className={`${pathname !== '/auth/onboard' ? 'hidden' : 'flex sm:hidden'}`} justify="center">
                    <NavbarItem>
                        <p className={'text-xl sm:text-3xl text-center font-semibold'}>Aita, ai tarologist</p>
                        <div
                            className={'w-full flex gap-1 text-[#BEBEBE] items-center justify-center text-center text-xs sm:text-medium  font-normal'}>
                            <div className={'bg-[#14B411] rounded-full w-2 h-2'}></div>
                            Always online to help you find answers
                        </div>
                    </NavbarItem>
                </NavbarContent>
                <NavbarContent justify="end" className={'lg:pr-7 lg:pt-6 gap-2'}>
                    <NavbarItem>
                        {getNavItem()}
                    </NavbarItem>
                    <NavbarItem>
                        <Button isIconOnly
                                className={'flex items-center justify-center bg-[rgba(69,69,69,0.5)] backdrop-blur-2xl rounded-full h-10 w-10'}
                                onClick={showSidebar}>
                            <AlignJustify strokeWidth={1.5} className="text-white h-5 w-7"/>
                        </Button>
                    </NavbarItem>
                </NavbarContent>
            </Navbar>
            {sidebarVisible && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={hideSidebar}
                />
            )}

            <ul
                className={`fixed top-0 right-0 z-50 px-4 h-screen w-72 lg:w-[460px] bg-[#161E2C] flex flex-col gap-2 items-start transition-transform transform ${
                    sidebarVisible ? 'translate-x-0' : 'translate-x-full'
                }`}>
                <li className="w-full flex lg:pt-7 pt-2 lg:pr-4 jusfity-beetween items-center lg:justify-end">
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
                        <X className="text-white h-8 w-8"/>
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
                                <Link href={'/'}>
                                    Log Out
                                </Link>
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
};

export default NavBar;