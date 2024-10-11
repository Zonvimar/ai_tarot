'use client'
import {FC} from "react";
import {useRouter} from "next/navigation";
import {Button} from "@nextui-org/react";
import {Grid2X2, LayersIcon, Table2Icon} from "lucide-react";

type Props = {
    searchParams: {
        search?: string
        ordering?: string
        page_size?: string
        page?: string
        view_mode: "card" | "table",
    }
}

const TicketViewSwitcher: FC<Props> = ({searchParams}) => {
    const router = useRouter()
    const createPageURL = (view_mode: "card" | "table") => {
        const params = new URLSearchParams(searchParams)
        // if(view_mode === 'card') {
        params.delete('search')
        params.delete('ordering')
        params.delete('page_size')
        params.delete('page')
        // }
        params.set('view_mode', view_mode)
        router.push(`?${params.toString()}`)
    }

    const setIcon = () => {
        const view_mode = searchParams.view_mode

        switch (view_mode) {
            case 'table':
                return (
                    <Button isIconOnly onClick={() => createPageURL('card')}>
                        <LayersIcon strokeWidth={1.25}/>
                    </Button>
                )
            case 'card':
                return (
                    <Button isIconOnly onClick={() => createPageURL('table')}>
                        <Table2Icon strokeWidth={1.25}/>
                    </Button>
                )
            default:
                return (
                    <Button isIconOnly onClick={() => createPageURL('table')}>
                        <Table2Icon strokeWidth={1.25}/>
                    </Button>
                )
        }
    }
    return (
        <>
            {
                setIcon()
            }
        </>
    )
}

export default TicketViewSwitcher