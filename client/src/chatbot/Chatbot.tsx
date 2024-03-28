import React, { useEffect, useState } from 'react';
import Chatbox from './Chatbox';

function saveChat(username: string, sender: string, message: string) {
  const data = {
    message: [
      {
        text: message,
        sender: sender,
      }]};

  fetch(`http://localhost:3000/chat/${username}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (response.ok) {
        console.log('Data saved successfully');
      } else {
        console.error('Failed to save data. Status:', response.status, 'Status Text:', response.statusText);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}


function Chatbot() {
  const [input, setInput] = useState("");

  interface OutputObject {
    message: string;
    target: string;
  }

  const [output, setOutput] = useState<OutputObject[]>([]);
  useEffect(() => {

    async function fetchChatHistory () {
      try {
        const response = await fetch('http://localhost:3000/chat/65e515cb0f6d9261edfa8c06', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        
      const data = await response.json();
      const formattedData = data.map((item: any) => ({
        message: item.text,
        target: item.sender
      }));
      setOutput((prevOutput) => [...prevOutput, ...formattedData]);
      

    } catch (error) {
      console.error('Error:', error);
    }
    }
    fetchChatHistory();
    
  }
  , []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleClick = async () => {
    console.log('button clicked');
    setOutput((prevOutput) => [{ message: input, target: 'user' },...prevOutput]);
    saveChat('user2', 'user', input);
    setInput("");

    // Call HTTP POST
    try {
      const response = await fetch('http://localhost:3000/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_message: input })
      });
      const data = await response.json();

      setOutput((prevOutput) => [ { message: data.chatbot_message, target: 'ai' }, ...prevOutput,]);

      // Save GPT message to DB
      saveChat('user2', 'ai', data.chatbot_message);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='m-6'>
      <input
        className='form-input px-4 py-2 border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 rounded-md shadow-sm w-full'
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Type your message here..."
      />
      <button
        onClick={handleClick}
        className="my-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Send
      </button>
      {output.map((item, index) => (
        <Chatbox key={index} target={item.target} message={item.message} />
      ))}
    </div>
  );
}

export default Chatbot;
