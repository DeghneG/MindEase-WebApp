import React from 'react';
import ChatInterface from '../components/ChatInterface';

function Home() {
  return (
    <div className="home">
      <h1>MindEase</h1>
      <p>Your AI-powered emotional support companion</p>
      <ChatInterface />
    </div>
  );
}

export default Home;
