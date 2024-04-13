import React, {useState, useEffect} from 'react';

interface McqBtnProps {
    answer: string;
    isTrue: boolean;
}
const McqBtn: React.FC<McqBtnProps> = ({ answer, isTrue }) => {
    const [answerDisplay, setAnswerDisplay] = useState(answer);
    const [color, setColor] = useState("blue-600");
  
    useEffect(() => {
      setAnswerDisplay(answer);
      setColor("blue-600");
    }, [answer]);
  
    function handleClick(isTrue: boolean) {
      setColor(isTrue ? "green-500" : "red-500");
    }
  
    return (
      <button
        className={`font-bold py-2 px-4 my-2 w-full rounded-lg text-white transition duration-300 ease-in-out
        ${color === "green-500" ? 'bg-green-500 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}
        ${color === "red-500" ? 'bg-red-500 hover:bg-red-600' : ''}`}
        onClick={() => handleClick(isTrue)}
      >
        {answerDisplay}
      </button>
    );
  };
  
  export default McqBtn;