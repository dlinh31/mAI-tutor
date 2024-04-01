
import React, { useEffect } from 'react';

interface ChatboxProps {
    sender: string;
    message: string;
  }

function fetchQuestion (topic: string) {
    fetch(`http://localhost:3000/quiz/${topic}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            console.log('Data fetched successfully');
        } else {
            console.error('Failed to fetch data. Status:', response.status, 'Status Text:', response.statusText);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function Chatbox({sender, message}: ChatboxProps){
    const [question, setQuestion] = React.useState("");
    useEffect(() => {

    }, []);


    return (
        <div className='my-4'>
            <p className='bg-blue-100 text-blue-800 p-4 rounded-lg shadow'>{sender}: {message}</p>
        </div>
    )
}

export default Chatbox;