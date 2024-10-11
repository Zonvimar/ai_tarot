import React from 'react';
import {CheckIcon, Cross2Icon} from "@radix-ui/react-icons";

const IsVerifyTableCell = ({checked}: {checked: boolean}) => {
    return (
        <div className={'flex justify-center'}>
            {checked ?
                <CheckIcon className={'text-green-500'}/>
                :
                <Cross2Icon className={'text-red-500'} />
            }
        </div>
    );
};

export default IsVerifyTableCell;