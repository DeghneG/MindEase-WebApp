// Main chat window
import React, { useState, useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import InputArea from './InputArea';
import { sendMessage } from '../services/api';

function ChatInterface() {
  const [messages, setMessages] = useState([
    {
      text: "Hi there! I'm MindEase, your emotional support companion. How are you feeling today?",
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
    <div className="chat-interface">
      <div className="messages-container">
        {messages.map((msg, index) => (
          <MessageBubble key={index} message={msg.text} sender={msg.sender} />
        ))}
        {isLoading && <MessageBubble message="Thinking..." sender="bot" />}
        <div ref={messagesEndRef} />
      </div>
      <InputArea onSend={handleSend} isLoading={isLoading} />
    </div>
  );
}

export default ChatInterface;
