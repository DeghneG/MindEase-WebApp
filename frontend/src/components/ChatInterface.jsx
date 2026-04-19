import React, { useState, useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import InputArea from './InputArea';
import { sendMessage } from '../services/api';

function ChatInterface() {
  const [messages, setMessages] = useState([
    {
      text: "I can tell you're feeling a bit overwhelmed today. Would you like to talk about what's on your mind?",
      sender: 'bot',
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text) => {
    const userMessage = { text, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await sendMessage(text);
      const botMessage = { text: response.reply, sender: 'bot' };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        text: 'Sorry, something went wrong. Please try again.',
        sender: 'bot',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="messages-area">
        <div className="timestamp">Today, 10:42 AM</div>
        
        {messages.map((msg, index) => (
          <React.Fragment key={index}>
            <MessageBubble message={msg.text} sender={msg.sender} />
            {msg.sender === 'bot' && index === 0 && (
              <div className="chat-options">
                 <button className="option-btn">Yes, let's talk about exams</button>
                 <button className="option-btn">I just need a breathing exercise</button>
              </div>
            )}
          </React.Fragment>
        ))}
        {isLoading && <MessageBubble message="..." sender="bot" />}
        <div ref={messagesEndRef} />
      </div>
      <InputArea onSend={handleSend} isLoading={isLoading} />
    </div>
  );
}

export default ChatInterface;
