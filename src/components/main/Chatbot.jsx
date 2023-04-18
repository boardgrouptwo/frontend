import React, { useState } from 'react';
import { Chatbot } from 'react-chatbot-kit';
import ActionProvider from '../ActionProvider';
import MessageParser from '../MessageParser';
import config from '../config';
import ChatbotButton from './ChatbotButton';

const Chatbot = () =>{
  const [showChatbot, setShowChatbot] = useState(false);

  const handleClose = () => {
    setShowChatbot(false);
  };

  const handleNewUserMessage = (newMessage) => {
    console.log(`New message incoming! ${newMessage}`);
  };

  return (
    <div className="chatbot-container">
      {showChatbot && (
        <Chatbot
          config={config}
          actionProvider={ActionProvider}
          messageParser={MessageParser}
          handleNewUserMessage={handleNewUserMessage}
          customStyles={{
            botMessageBox: {
              backgroundColor: '#376B7E',
            },
            chatButton: {
              backgroundColor: '#376B7E',
            },
          }}
          headerComponent={<div className="chatbot-header"><span>React Chatbot</span><button onClick={handleClose}>X</button></div>}
        />
      )}
      <ChatbotButton setShowChatbot={setShowChatbot} />
    </div>
  );
}

export default Chatbot
