'use client'
import TextField from '@/components/shared/Inputs/TextField'
import React, {FC, useMemo, useState} from 'react'
import PasswordField from "@/components/shared/Inputs/PasswordField";
import {DatePicker} from "@nextui-org/react";
import {Image} from "@nextui-org/image";
import FormWrapper from "@/components/shared/FormWrapper";
import Link from "next/link";
import {ActionResponse} from "@/configs/http-service/fetch-settings/types";
import {useSearchParams} from "next/navigation";

type Props = {
    // addInfo: boolean,
    handleAddInfo: ((fd: FormData) => Promise<ActionResponse>),
    handleRegister: ((fd: FormData) => Promise<ActionResponse>),
}

const UserProfileForm: FC<Props> = ({handleAddInfo, handleRegister}) => {
    const [value, setValue] = useState("");
    const [emailValue, setEmailValue] = useState("");
    const [emailExists, setEmailExists] = useState(false);
    const [selectedGender, setSelectedGender] = useState("female");
    // const router = useRouter()
    const searchParams = useSearchParams();
    const addInfo = !!searchParams?.get('addInfo')
    const question = searchParams?.get('onboardQuestion') ?? ''

    const handleGenderChange = (gender: string) => {
        setSelectedGender(gender);
    };
    const isInvalid = useMemo(() => {
        if (value === "") {
            return false
        }

        return value.length < 8
    }, [value])

    return (
        <>
            {/*<div className={'flex flex-col justify-center gap-4 h-full'}>*/}
            {/*    */}
                <div className={'grid place-items-start h-full'}>
                    <FormWrapper action={addInfo ? handleAddInfo : handleRegister}
                                 infoUnderButton={!addInfo &&
                                     <div className={'flex gap-1 text-center w-full items-center'}>
                                         <p className={'text-xs w-full text-center text-[#BEBEBE]'}>
                                             {'By creating an account or signing you agree to our '}
                                             <Link href={'?register'}
                                                   className={'font-extrabold text-center underline'}>
                                                 Terms and Conditions
                                             </Link>
                                         </p>
                                     </div>
                                 }
                                 setInvalid={setEmailExists}
                                 actionLabel={addInfo ? 'Complete & get tarot spread' : 'Create account'}
                    >
                        <input hidden name={'email'} value={emailValue}/>
                        <input hidden name={'password'} value={value}/>
                        <input hidden name={'gender'} value={selectedGender}/>
                        <div className={'flex flex-col w-full gap-6 h-full '}>
                            <div className={'w-full flex flex-col gap-2 justify-center text-center items-center'}>
                                {/*<div className={'w-full h-[64px]'}></div>*/}
                                <Image src={'/img_3.png'} alt={'logo'} width={200} height={200}/>
                                <h1 className={'w-full text-center text-2xl font-bold'}>
                                    {addInfo ?
                                        'Please provide details for a more accurate tarot reading'
                                        :
                                        'Create account to save your chat with the AI taro reader'
                                    }
                                </h1>
                            </div>
                            <div className={'flex flex-col gap-2'}>
                                {/*    */}
                                {addInfo ?
                                    <>
                                        <TextField
                                            size={'lg'}
                                            required
                                            label={'Name'}
                                            className={'text-xl'}
                                            placeholder={'Georgii'}
                                            name={'username'}
                                            // type={'email'}
                                        />
                                        <DatePicker
                                            name={'dateOfBirth'}
                                            isRequired
                                            labelPlacement={'outside'}
                                            size={'lg'}
                                            label="Date of birth"
                                            variant={'faded'}
                                            dateInputClassNames={{
                                                inputWrapper: 'border-[1px] h-[60px] border-gray-700 focus:ring-indigo-500 focus:border-indigo-500',
                                                label: 'text-[#ECEDEE] font-semibold text-sm group-data-[required=true]:after:hidden',
                                                input: 'placeholder:text-[#E9E9E9]'
                                            }}
                                            showMonthAndYearPickers
                                        />
                                        <div className="flex flex-col items-start">
                                            <h2 className="mb-1 text-white text-sm font-semibold">Choose your
                                                gender</h2>
                                            <div className="flex gap-4">
                                                <button type={'button'}
                                                    onClick={() => handleGenderChange("female")}
                                                    className={`flex items-center justify-center w-[150px] h-[60px] text-white font-normal 
                                                                rounded-[48px] border-[1px] transition-all ${
                                                                selectedGender === "female"
                                                                    ? "bg-[#27ACC9] border-[#27ACC9]"
                                                                    : "bg-[#2A2A2A] border-[#424242]"
                                                                }`}
                                                >
                                                    <span className="flex items-center gap-2">
                                                        <Image src={'/female.svg'} height={32} width={20}/>
                                                        Female
                                                    </span>
                                                </button>

                                                <button type={'button'}
                                                    onClick={() => handleGenderChange("male")}
                                                    className={`flex items-center justify-center w-[150px] h-[60px] text-white font-normal 
                                                                rounded-[48px] border-[1px] transition-all ${
                                                                selectedGender === "male"
                                                                    ? "bg-[#27ACC9] border-[#27ACC9]"
                                                                    : "bg-[#2A2A2A] border-[#424242]"
                                                            }`}
                                                >
                                                    <span className="flex items-center gap-2">
                                                        <Image src={'/male.svg'} radius={'none'} width={28} height={28}/>
                                                        Male
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <TextField
                                            size={'lg'}
                                            value={emailValue}
                                            onValueChange={setEmailValue}
                                            required
                                            isInvalid={emailExists}
                                            errorMessage={'Email already exists'}
                                            label={'Email'}
                                            className={'text-xl'}
                                            placeholder={'Email address'}
                                            // name={'email'}
                                            type={'email'}
                                        />
                                        <PasswordField
                                            value={value}
                                            required
                                            onValueChange={setValue}
                                            isInvalid={isInvalid}
                                            errorMessage={"The password must contain at least 8 characters"}
                                            size={'lg'}
                                            // name={'password'}
                                            label={'Password'}
                                            placeholder={'Password'}
                                            minLength={8}
                                        />
                                    </>
                                }
                            </div>
                            <div className={'flex flex-col w-full gap-2'}>
                                {/*<SubmitButton label={}/>*/}

                                <div className={'flex gap-1 px-1 text-center w-full items-center'}>
                                    {addInfo ??
                                        <p className={'text-xs w-full text-center text-[#BEBEBE]'}>
                                            {'By creating an account or signing you agree to our '}
                                            <Link href={'?register'}
                                                  className={'font-extrabold text-center underline'}>
                                                Terms and Conditions
                                            </Link>
                                        </p>
                                    }

                                </div>
                            </div>
                        </div>
                    </FormWrapper>
                </div>
            {/*</div>*/}
        </>
    )
}

export default UserProfileForm