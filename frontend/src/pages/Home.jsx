import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome, Loublex Esmero.</h1>
      <p>I'm here to listen.</p>
      
      <Link to="/chat" className="start-btn">
        Start a conversation
        <MessageSquare size={18} />
      </Link>
    </div>
  );
}

export default Home;
