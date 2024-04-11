import React, { useEffect, useState, useRef } from 'react';
import Chatbox from '../components/Chatbox';


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
  const user: UserObject | null = JSON.parse(localStorage.getItem("user") || "");
  const endOfMessagesRef = useRef(null); // Ref to help scroll to the bottom

  useEffect(() => {

    const fetchChatHistory = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/chat/${user!.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        const data = await response.json();
        const formattedData = data.map((item: any) => ({
          message: item.text,
          sender: item.sender
        }));
        setOutput(formattedData);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchChatHistory();
  }, []);


  useEffect(() => {
    // Automatically scroll to the bottom whenever the output changes
    if (endOfMessagesRef.current) {
      (endOfMessagesRef.current as HTMLElement).scrollIntoView({ behavior: 'smooth' });
    }
  }, [output]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleClick = async () => {

    setOutput((prevOutput) => [...prevOutput, { message: input, sender: 'user' }]);
    saveChat(user!.id, 'user', input);
    setInput("");
    const chat_history = output;

    // Call HTTP POST
    try {
      const response = await fetch('http://localhost:3000/api/chat/aichat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_message: input, chat_history: chat_history })
      });
      const data = await response.json();

      // setOutput((prevOutput) => [...prevOutput, { message: data.chatbot_message, sender: 'ai' }]);
      
      // // Save GPT message to DB
      // saveChat(user!.id, 'ai', data.chatbot_message);


      const chatbotResponse = { message: data.chatbot_message, sender: 'ai' };
      setOutput((prevOutput) => [...prevOutput, chatbotResponse]);
      saveChat(user!.id, 'ai', data.chatbot_message);





    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-sidebar">
        {/* You can add buttons or links here to simulate different chat rooms or functionalities */}
      </div>
      <div className="chat-main">
        <div className="message-area">
          {output.map((item, index) => (
            <Chatbox key={index} sender={item.sender} message={item.message} />
          ))}
          <div ref={endOfMessagesRef} /> {/* Empty div for scrolling to bottom */}
        </div>
        <form className="message-form">
          <input
            type="text"
            value={input}
            onChange={handleChange}
            className="message-input"
            placeholder="Type your message here..."
          />
          <button type="button" onClick={handleClick} className="send-button">Send</button>
        </form>
      </div>
    </div>
  );

}

export default Chatbot;
