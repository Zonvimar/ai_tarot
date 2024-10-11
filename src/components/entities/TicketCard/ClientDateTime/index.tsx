"use client";

import { useEffect, useState } from "react";
import {getLocalTimeZone} from "@internationalized/date";

function useMounted() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return mounted;
}

export function ClientDateTime({ date }: { date: Date | null }) {

    const mounted = useMounted()

    const timeZone = getLocalTimeZone()

    const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        // hour: 'numeric',
        // minute: 'numeric',
        timeZone
    }

    // const testDate = new Date('2024-07-01T00:00:00.000Z')

    if (!mounted) return null;

    return (
        <p>
            {date?.toLocaleDateString('ru-RU', {year: 'numeric', month: 'numeric', day: 'numeric', timeZone} ) + " "
                +
                date?.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', timeZone: timeZone })
                ||
                "-"
            }
        </p>
    )
}