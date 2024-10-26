import React from 'react';
import { Button, Input } from '@nextui-org/react';
import { Image } from '@nextui-org/image';

interface QuestionInputProps {
    questionInputValue: string;
    setQuestionInputValue: (value: string) => void;
    handleAskQuestion: (question: string) => void;
    loading: boolean;
}

const QuestionInput: React.FC<QuestionInputProps> = ({ questionInputValue, setQuestionInputValue, handleAskQuestion, loading }) => (
    <div className="flex-shrink-0 flex justify-center w-full">
        <Input
            required
            isDisabled={loading}
            placeholder="Ask something"
            name="question"
            value={questionInputValue}
            onValueChange={(value) => setQuestionInputValue(value)}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAskQuestion(questionInputValue);
                }
            }}
            endContent={
                <Button
                    onClick={() => handleAskQuestion(questionInputValue)}
                    isIconOnly
                    className="bg-[#22879D] w-full rounded-full max-w-[44px] sm:max-w-[62px] h-[44px] sm:h-[62px] shadow-button"
                >
                    <Image src="/ic_send.svg" width={20} height={20} />
                </Button>
            }
            autoComplete="off"
            variant="faded"
            radius="lg"
            classNames={{
                inputWrapper: 'border-[1px] h-[60px] sm:h-[78px] border-gray-700 focus:ring-indigo-500 focus:border-indigo-500',
                input: 'h-full placeholder:text-[#E9E9E9] text-medium sm:text-lg',
                label: 'text-sm sm:text-xl font-semibold',
            }}
        />
    </div>
);

export default QuestionInput;
