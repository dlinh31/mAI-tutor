import {useState} from 'react';
import McqBtn from '../components/McqBtn';

interface FetchedQuestionObject {
  topic: string[][];
}

interface QuizObject {
    question: string; 
    answers: string[];
    correctAnswer: string;
}

const fetchQuestion = async (topic: string) => {
    try {
        const response = await fetch(`http://localhost:3000/api/chat/quiz`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user_question: topic})
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Data fetched successfully');
            return data;
        } else {
            throw new Error(`Failed to fetch data. Status: ${response.status} Status Text: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};


function QuizGenerator(){
    const [input, setInput] = useState("");
    const [questions, setQuestions] = useState<QuizObject[]>([]);
    const [error, setError] = useState<string | null>(null);


    const handleSubmit = async () => {
      setError(null); // Reset error state on new submission
      const fetchedQuestion = await fetchQuestion(input) as unknown as FetchedQuestionObject;
    
      if (fetchedQuestion && fetchedQuestion.topic.length > 0) {
        const answers = fetchedQuestion.topic[0]; 
        const hasEmptyAnswer = answers.some(answer => answer.trim() === ""); // Check if any answer is empty
    
        if (hasEmptyAnswer) {
          setError("Received an empty answer from the API :( Please enter valid topic.");
          setQuestions([]);
        }
        else if (fetchedQuestion.topic[0].length != 5) {
          setError("Received an empty answer from the API :( Please enter valid topic.");
          setQuestions([]);

        } else {
          const question = {
            question: fetchedQuestion.topic[0][0],
            answers: [fetchedQuestion.topic[0][1], fetchedQuestion.topic[0][2], fetchedQuestion.topic[0][3], fetchedQuestion.topic[0][4]],
            correctAnswer: fetchedQuestion.topic[0][1],
        };
          setQuestions([question]);
        }
      } else {
        setError("Failed to fetch the question or the topic array is empty.");
      }
    };

    


    return (
      <div className='min-h-screen w-full bg-gradient-to-r from-blue-300 via-blue-200 to-purple-200 flex justify-center items-center p-4'>
      <div className="bg-white max-w-3xl w-full shadow-xl rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Quiz Time!</h1>
        <div className="flex justify-center items-center mb-4">
          <input 
            type="text" 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            placeholder="Enter topic..."
            className="border border-gray-300 rounded-md px-4 py-2 mr-4 flex-grow"
          />
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded shadow"
            onClick={handleSubmit}
          >
            Start
          </button>
        </div>
    
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
    
        {questions.length > 0 && (
          <div className="flex flex-col items-center">
            <div className="bg-blue-100 my-3 p-4 rounded-md w-full text-center">
              <h2 className="font-semibold text-lg">{questions[0].question}</h2>
            </div>
            {questions[0].answers.map((question, index) => (
              <McqBtn 
                key={index}
                answer={question}
                isTrue={index === 0} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
      );

}


export default QuizGenerator;