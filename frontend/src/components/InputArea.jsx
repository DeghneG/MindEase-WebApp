import React, { useState } from 'react';
import { Send, Plus } from 'lucide-react';

function InputArea({ onSend, isLoading }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSend(input.trim());
      setInput('');
    }
  };

  return (
    <form className="input-container" onSubmit={handleSubmit}>
      <button type="button" className="send-btn">
        <Plus size={20} />
      </button>
      <input
        className="chat-input"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
        disabled={isLoading}
      />
      <button type="submit" className="send-btn" disabled={isLoading || !input.trim()}>
        <Send size={20} />
      </button>
    </form>
  );
}

export default InputArea;
