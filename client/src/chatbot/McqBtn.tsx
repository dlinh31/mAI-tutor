import React, {useState} from 'react';

interface McqBtnProps {
    answer: string;
    isTrue: boolean;
}





const McqBtn: React.FC<McqBtnProps> = ({ answer, isTrue }) => {

    function handleClick(isTrue: boolean) {
        if (isTrue){
            setColor("green");
        }
        else{
            setColor("red")
        }

    }

    
    const [color, setColor] = useState("blue");
    return (
        <button
        className={`font-bold py-2 my-3 mx-8 rounded-lg text-white
        ${color === "green" ? 'bg-green-500 hover:bg-green-700' : 'bg-blue-500 hover:bg-blue-700'}
        ${color === "red" ? 'bg-red-500 hover:bg-red-600' : ''} `}
            onClick={() => handleClick(isTrue)}
        >
            {answer}
        </button>
    );
};

export default McqBtn;