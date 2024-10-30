'use client'
import { Card, CardBody } from "@nextui-org/card";
import { useState } from "react";
import { Image } from "@nextui-org/image";

const OracleCards = () => {
    const [selectedCard, setSelectedCard] = useState<number | null>(null);

    const data = [
        { price: '9.99', quantity: 300, image: '/threeHundredOracles.png' },
        { price: '19.99', quantity: 1000, image: '/thousandOracles.png' },
        { price: '49.99', quantity: 3000, image: '/threeThousandOracles.png' },
    ];

    return (
        <div className="relative w-full flex justify-center items-center overflow-visible">
            <div className="flex gap-4 md:gap-8">
                <Card
                    className="relative w-[150px] md:w-[200px] lg:w-[250px] h-[140px] md:h-[210px] overflow-visible rounded backdrop-blur-xl bg-[#A3C6CD] bg-opacity-25 transform transition-transform duration-300"
                >
                    <CardBody className="p-0 text-center flex flex-col gap-1 pb-2 justify-between w-full overflow-visible">
                        <div className="relative h-full flex items-center justify-center overflow-visible">
                            {/* Контейнер для изображения */}
                            <div className="w-12 h-12 z-10">
                                <Image
                                    src={'/threeHundredOracles.png'}
                                    alt="Oracles"
                                    height={48}
                                    width={48}
                                    removeWrapper
                                    className="relative z-10"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col justify-between">
                            <p className="font-medium">{300} Oracles</p>
                            <p className="text-[#27ACC9] font-light text-xs">$9.99</p>
                            {/*<p className="text-[#27ACC9] font-light text-xs">*/}
                            {/*    3 questions*/}
                            {/*</p>*/}
                        </div>
                    </CardBody>
                </Card>
                <Card
                    className="relative w-[150px] md:w-[200px] lg:w-[250px] h-[140px] md:h-[210px] overflow-visible rounded backdrop-blur-xl bg-[#A3C6CD] bg-opacity-25 transform transition-transform duration-300"
                >
                    <CardBody className="p-0 text-center flex flex-col py-2 justify-between w-full overflow-visible">
                        <div className="relative flex justify-center overflow-visible">
                            {/* Контейнер для изображения */}
                            <div className="absolute -top-10 w-24 h-24 z-10">
                                <Image
                                    src={'/thousandOracles.png'}
                                    alt="Oracles"
                                    height={96}
                                    width={96}
                                    removeWrapper
                                    className="relative z-10"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col ">
                            <p className="font-medium">1000 Oracles</p>
                            <p className="text-[#27ACC9] font-light text-xs">$19.99</p>
                            {/*<p className="text-[#27ACC9] font-light text-xs">*/}
                            {/*    Popular*/}
                            {/*</p>*/}
                        </div>
                    </CardBody>
                </Card>
                <Card
                    className="relative w-[150px] md:w-[200px] lg:w-[250px] h-[140px] md:h-[210px] overflow-visible rounded backdrop-blur-xl bg-[#A3C6CD] bg-opacity-25 transform transition-transform duration-300"
                >
                    <CardBody className="p-0 text-center flex flex-col gap-1 pb-2 justify-between w-full overflow-visible">
                        <div className="relative h-full flex items-center justify-center overflow-visible">
                        {/* Контейнер для изображения */}
                            <div className=" w-28 h-19 z-10">
                                <Image
                                    src={'/threeThousandOracles.png'}
                                    alt="Oracles"
                                    height={76}
                                    width={114}
                                    removeWrapper
                                    className="relative z-10"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col ">
                            <p className="font-medium">3000 Oracles</p>
                            <p className="text-[#27ACC9] font-light text-xs">$49.99</p>
                            {/*<p className="text-[#27ACC9] font-light text-xs">*/}
                            {/*    30 questions*/}
                            {/*</p>*/}
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default OracleCards;
