import React from 'react';
import {CheckIcon} from "@radix-ui/react-icons";

const BooleanTableCell = ({checked}: {checked: boolean}) => {
    return (
        <div className={'flex justify-center'}>
            {checked && <CheckIcon/>
            }
        </div>
    );
};

export default BooleanTableCell;