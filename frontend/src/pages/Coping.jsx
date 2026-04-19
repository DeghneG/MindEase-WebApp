import React from 'react';
import { Wind, ListTodo, Footprints, Heart } from 'lucide-react';

function Coping() {
  return (
    <div className="page-container">
      <h1>Coping Strategies</h1>
      <p>Find a moment of calm. Select an activity to help ground yourself right now.</p>

      <div className="grid-layout">
        <div className="card">
          <div className="card-header">
            <div className="card-icon">
              <Wind size={20} />
            </div>
            <h2 className="card-title">Breathing Exercise</h2>
          </div>
          <p className="card-desc">Guided 4-7-8 breathing to regulate your nervous system and reduce immediate stress.</p>
          <button className="card-action">Start Exercise →</button>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-icon">
              <ListTodo size={20} />
            </div>
            <h2 className="card-title">Task Breakdown</h2>
          </div>
          <p className="card-desc">Overwhelmed? Let's break down what you need to do into tiny, manageable steps.</p>
          <button className="card-action">Organize Now →</button>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-icon">
              <Footprints size={20} />
            </div>
            <h2 className="card-title">5-Minute Walk</h2>
          </div>
          <p className="card-desc">Step away from your current environment. A brief change of scenery can reset your mind.</p>
          <button className="card-action">Log Walk →</button>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-icon">
              <Heart size={20} />
            </div>
            <h2 className="card-title">Gentle Encouragement</h2>
          </div>
          <p className="card-desc">Read supportive affirmations designed to remind you of your resilience.</p>
          <button className="card-action">Read Notes →</button>
        </div>
      </div>

      <div className="emotion-selector">
        <p>How are you feeling right now?</p>
        <div className="emotion-tags">
          <button className="emotion-tag">Anxious</button>
          <button className="emotion-tag">Overwhelmed</button>
          <button className="emotion-tag">Tired</button>
          <button className="emotion-tag">Okay</button>
        </div>
      </div>
    </div>
  );
}

export default Coping;
