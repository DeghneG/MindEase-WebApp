import React, { useState, useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import InputArea from './InputArea';
import BreathingGuide from './BreathingGuide';
import { sendMessage } from '../services/api';

function ChatInterface() {
  const [messages, setMessages] = useState([
    {
      text: "I can tell you're feeling a bit overwhelmed today. Would you like to talk about what's on your mind?",
      sender: 'bot',
      options: [
        "Yes, let's talk about exams", 
        "I just need a breathing exercise",
        "Tell me a joke! 😂",
        "Help me organize my day",
        "I'm feeling really tired",
        "I have a general question",
        "Just want to vent"
      ]
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [showBreathingGuide, setShowBreathingGuide] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    {
      role: 'model',
      parts: [{ text: "I can tell you're feeling a bit overwhelmed today. Would you like to talk about what's on your mind?" }]
    }
  ]);
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

    const currentHistory = [...chatHistory];

    try {
      const response = await sendMessage(text, currentHistory);
      
      if (response.action === 'show_breathing') {
        setShowBreathingGuide(true);
      }

      const botMessage = { text: response.reply, sender: 'bot', options: response.options };
      setMessages((prev) => {
        // remove options from previous message if any
        const newMessages = [...prev];
        if (newMessages.length > 0) {
           newMessages[newMessages.length - 1] = { ...newMessages[newMessages.length - 1], options: null };
        }
        return [...newMessages, botMessage];
      });

      // Update persistent chat history for context
      setChatHistory([
        ...currentHistory,
        { role: 'user', parts: [{ text }] },
        { role: 'model', parts: [{ text: response.reply }] }
      ]);
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
            {msg.sender === 'bot' && msg.options && msg.options.length > 0 && index === messages.length - 1 && !isLoading && (
              <div className="chat-options">
                {msg.options.map((opt, i) => (
                   <button key={i} className="option-btn" onClick={() => handleSend(opt)}>
                     {opt}
                   </button>
                ))}
              </div>
            )}
          </React.Fragment>
        ))}
        {isLoading && <MessageBubble message="..." sender="bot" />}
        <div ref={messagesEndRef} />
      </div>
      <InputArea onSend={handleSend} isLoading={isLoading} />
      {showBreathingGuide && <BreathingGuide onClose={() => setShowBreathingGuide(false)} />}
    </div>
  );
}

export default ChatInterface;
