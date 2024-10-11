'use client'
import {Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from '@nextui-org/react'
import {MoonIcon, SunIcon} from '@nextui-org/shared-icons'
import {useTheme} from 'next-themes'
import {useEffect, useState} from 'react'

export const ThemeSwitcher = () => {
    const [mounted, setMounted] = useState(false)
    const {theme, setTheme} = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button
                    variant="bordered" isIconOnly
                >
                    {theme === 'dark' ? <MoonIcon/> : <SunIcon/>}
                </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Theme Options">
                <DropdownItem key="light-theme-trigger" onClick={() => setTheme('light')}>Светлая тема</DropdownItem>
                <DropdownItem key="dark-theme-trigger" onClick={() => setTheme('dark')}>Темная тема</DropdownItem>
                <DropdownItem key="system-theme-trigger" onClick={() => setTheme('system')}>Системная
                    тема</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}

export default ThemeSwitcher