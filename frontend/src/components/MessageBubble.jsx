import React from 'react';
import { User, Shield } from 'lucide-react';

function MessageBubble({ message, sender }) {
  const isBot = sender === 'bot';

  return (
    <div className={`message-wrapper ${sender}`}>
      {isBot && (
        <div className="bot-avatar">
          <Shield size={16} color="var(--text-secondary)" />
        </div>
      )}
      
      <div className={`message-bubble ${sender}`}>
        <p>{message}</p>
      </div>

      {!isBot && (
        <div className="bot-avatar" style={{ backgroundColor: 'var(--text-primary)' }}>
          <User size={16} color="var(--bg-color)" />
        </div>
      )}
    </div>
  );
}

export default MessageBubble;
