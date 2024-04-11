import React from 'react';

interface ChatboxUserProps {
  sender: string;
  senderName: string;
  content: string;

}

const ChatboxUser: React.FC<ChatboxUserProps> = ({ sender, senderName, content }) => {
  // Determine if the message is from the user or not
  const isUserMessage = sender === 'user';

  return (
    <div className={`flex ${isUserMessage ? 'justify-end' : 'justify-start'} my-2`}>
      <div className={`flex flex-col max-w-2xl`}>
        {/* Sender's name, visible only for non-user messages */}
        {!isUserMessage && (
          <div className="text-xs font-semibold text-gray-600">
            {senderName}
          </div>
        )}
        {/* Message bubble */}
        <div className={`px-4 py-2 rounded-lg shadow ${isUserMessage ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
          {content}
        </div>
      </div>
    </div>
  );
};

export default ChatboxUser;
