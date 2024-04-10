import React, { useEffect, useState } from 'react';
import Chatbox from './Chatbox';

function saveChat(userId: string, sender: string, message: string) {
  const data = {
    userId: userId,
    message: [
      {
        text: message,
        sender: sender,
      }]};

  fetch(`http://localhost:3000/api/chat`, {
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
    sender: string;
  }
  interface UserObject {
    name: string;
    email: string;
    token: string;
    id: string;
  }

  const [output, setOutput] = useState<OutputObject[]>([]);
  const token = localStorage.getItem('jwt');
  const user: UserObject | null = JSON.parse(localStorage.getItem("user") || "");
  useEffect(() => {

    const fetchChatHistory = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/chat/${user!.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-Auth-Token': `${token}`, // TODO: fix this auth
          }
        });
        
        const data = await response.json();
        const formattedData = data.map((item: any) => ({
          message: item.text,
          sender: item.sender
        }));
        setOutput(formattedData.reverse());
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchChatHistory();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleClick = async () => {
    console.log('button clicked');
    setOutput((prevOutput) => [{ message: input, sender: 'user' },...prevOutput]);
    saveChat(user!.id, 'user', input);
    setInput("");
    const chat_history = output;

    // Call HTTP POST
    try {
      const response = await fetch('http://localhost:3000/api/chat/aichat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_message: input, chat_history: chat_history })
      });
      const data = await response.json();

      setOutput((prevOutput) => [ { message: data.chatbot_message, sender: 'ai' }, ...prevOutput,]);

      // Save GPT message to DB
      saveChat(user!.id, 'ai', data.chatbot_message);
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
        <Chatbox key={index} sender={item.sender} message={item.message} />
      ))}
    </div>
  );
}

export default Chatbot;
