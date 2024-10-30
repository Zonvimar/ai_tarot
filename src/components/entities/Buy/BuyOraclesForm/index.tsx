import {Button} from "@nextui-org/react";
import React from "react";
import OracleCards from "@/components/entities/Buy/OracleCards";


const BuyOraclesForm = () => {

    return (
        <div className="flex flex-col gap-6 min-h-[calc(100dvh-58px)] justify-end overflow-hidden w-screen">
            <h2 className="text-3xl lg:text-[44px] text-center font-semibold px-4">
                Add more Oracles to ask next question
            </h2>
            <div className="flex flex-col gap-6 text-center items-center overflow-visible justify-between lg:px-12">
                <div className="w-full overflow-visible ">
                    <OracleCards/>
                </div>
                <p className="text-sm lg:text-lg">100 Oracles = 1 Question</p>
                <div className="flex w-full flex-col gap-6 pb-3 lg:pb-7 px-4">
                    <Button
                        className="flex items-center gap-2 sticky shadow-button bg-[#27ACC9] h-[60px] sm:h-[76px] font-semibold text-xl sm:text-2xl rounded-[60px]"
                    >
                        Add Oracles
                    </Button>
                    <div className="flex flex-col gap-2 text-[#9999A3] text-center font-normal text-xs">
                        <div className="flex justify-center gap-5">
                            <a href="#" className="underline">Privacy</a>
                            <a href="#" className="underline">Contact Support</a>
                            <a href="#" className="underline">Terms</a>
                        </div>
                        <p>© 2024 Aita by Aitarot.io. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BuyOraclesForm;