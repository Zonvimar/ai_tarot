'use client'
import {Navbar, NavbarContent, NavbarItem} from '@nextui-org/react'
import {AlignJustify, X} from "lucide-react";
import React, {useState} from "react";
import {usePathname} from "next/navigation";
import Link from "next/link";
import {Image} from "@nextui-org/image";

const NavBar = () => {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const pathname = usePathname();
    const showSidebar = () => setSidebarVisible(true);
    const hideSidebar = () => setSidebarVisible(false);


    const getNavItem = () => {
        switch(pathname) {
            case '/':
                return <div className={'text-sm sm:text-lg flex items-center gap-1 bg-[#2A2A2A] rounded-3xl px-3 py-1.5'}>
                    <p className={'flex items-end justify-end'}>300</p>
                    <Image src={'/oracle-icon.svg'} height={22} width={24}/>
                </div>
            case '/auth/register':
            case '/auth/onboard':
            case '/auth/approve-email':
            case '/auth/reset-password':
            case '/auth/new-password':
                return <Link href={'/auth'} className={'font-bold text-[#27ACC9] text-sm sm:text-lg'}>Log in</Link>
            case '/auth':
                return <Link href={'/auth/register'} className={'font-bold text-[#27ACC9] text-sm sm:text-lg'}>Sign up</Link>
            default:
                return null
        }
    }

    return (
        <>
            <Navbar className={'z-50 bg-opacity-0'} isBlurred={false} height={'36px'} maxWidth={'full'} classNames={{
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
                    'px-2 mt-1.5'
                ]
            }}>
                <NavbarContent justify="start">
                </NavbarContent>
                <NavbarContent className={`${pathname !== '/auth/onboard' ? 'hidden' : ''}`} justify="center">
                    <NavbarItem>
                        <p className={'text-xl sm:text-3xl font-semibold'}>Aita, ai tarologist</p>
                    </NavbarItem>
                </NavbarContent>
                <NavbarContent justify="end">
                    <NavbarItem>
                        {getNavItem()}
                    </NavbarItem>
                    <NavbarItem>
                        <a href="#" className={'flex items-center justify-center bg-[#454545] rounded-full h-9 w-9'} onClick={showSidebar}>
                            <AlignJustify strokeWidth={1.5} className="text-[#9999A3] h-5 w-7"/>
                        </a>
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
                className={`fixed top-0 right-0 z-50 px-4 h-screen w-72 bg-[#343434] flex flex-col gap-4 items-start transition-transform transform ${
                    sidebarVisible ? 'translate-x-0' : 'translate-x-full'
                }`}>
                <li className="w-full pt-3 justify-end items-end">
                    <a href="#" onClick={hideSidebar}
                       className="pr-2 w-full flex justify-end items-center">
                        <X className="text-white h-8 w-8"/>
                    </a>
                </li>
                <li onClick={hideSidebar} className="w-full font-semibold text-xl text-[#27ACC9]">
                    <Link href={'/auth'}>
                        Login
                    </Link>
                    {/*<a href="#" className="w-full">*/}
                    {/*    Login*/}
                    {/*</a>*/}
                </li>
                <li onClick={hideSidebar} className="w-full font-semibold text-xl text-[#27ACC9]">
                    <Link href={'/auth/register'}>
                        Create Account
                    </Link>
                    {/*<a href="#" className="w-full ">*/}
                    {/*</a>*/}
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
            </ul>
        </>

    )
};

export default NavBar;