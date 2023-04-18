import React from 'react'

const ChatbotButton = (props) => {
  const handleClick = () => {
    props.setShowChatbot(prevState => !prevState);
  };
  return (
    <>
      <div className="chatbot-button" onClick={handleClick}>
        챗봇
      </div>      
    </>
  )
}

export default ChatbotButton
