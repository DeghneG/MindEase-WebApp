// Individual message styling
import React from 'react';

function MessageBubble({ message, sender }) {
  return (
    <div className={`message-bubble ${sender}`}>
      <p>{message}</p>
    </div>
  );
}

export default MessageBubble;
