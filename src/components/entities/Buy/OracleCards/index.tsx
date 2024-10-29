'use client'
import {Card, CardBody, CardFooter} from "@nextui-org/card";
import {useState} from "react";
import {Button} from "@nextui-org/react";
import {Image} from "@nextui-org/image";


const OracleCards = () => {
    const [selectedCard, setSelectedCard] = useState<number | null>(null);

    const data = [
        {
            price: '9.99',
            quantity: '300',
            // image: 'https://dummyimage.com/100x100/000/fff.jpg'
        },
        {
            price: '19.99',
            // title: 'Oracles',
            quantity: '1000',
            // priceValue: '$300',
            // image: 'https://dummyimage.com/100x100/000/fff.jpg'
        },
        {
            price: '49.99',
            // title: 'Oracles',
            quantity: '3000',
            // priceValue: '$500',
            // image: 'https://dummyimage.com/100x100/000/fff.jpg'
        },
    ];


    return (
        <div className="grid grid-cols-3 gap-4 p-4">
            {data.map((item, index) => (
                <Card className="w-full max-w-[300px] overflow-visible rounded backdrop-blur-xl bg-[#A3C6CD] bg-opacity-25">
                    <CardBody className="p-0 text-center overflow-visible">
                        {/*<Image width={70} height={80}*/}
                        {/*    src={'/thousandOralces.png'}*/}
                        {/*    className="w-full h-[200px] object-cover"*/}
                        {/*/>*/}
                        <p className={'font-medium '}>{item.quantity} Oracles</p>
                        <p className={'text-[#27ACC9] font-light text-xs'}>${item.price}</p>
                    </CardBody>
                    {/*<CardFooter className="flex flex-col items-start">*/}
                    {/*    <div className="flex justify-between w-full mb-2">*/}
                    {/*        <h4 className="text-lg font-semibold">{item.title}</h4>*/}
                    {/*        <p className="text-default-500">{item.quantity} available</p>*/}
                    {/*    </div>*/}
                    {/*    <div className="flex justify-between w-full items-center">*/}
                    {/*        <p className="text-xl font-bold">${item.price}</p>*/}
                    {/*        <Button color="primary" size="sm">*/}
                    {/*            Buy Now*/}
                    {/*        </Button>*/}
                    {/*    </div>*/}
                    {/*</CardFooter>*/}
                </Card>
            ))}
        </div>
    );
}

export default OracleCards;