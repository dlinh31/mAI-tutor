import { Chat } from 'openai/resources';
import React, {useState} from 'react';

interface ChatboxProps {
    target: string;
    message: string;
  }
  

function Chatbox({target, message}: ChatboxProps){
    return (
        <div>
            <p className='px-4 py-2 rounded-lg mb-2'>{target}: {message}</p>
        </div>
    )
}

export default Chatbox;