import React, { useState, useEffect } from 'react';
import { Wind, ListTodo, Footprints, Heart, ArrowLeft, Plus, CheckCircle2, Circle } from 'lucide-react';
import BreathingGuide from '../components/BreathingGuide';

function Coping() {
  const [activeCard, setActiveCard] = useState(null);
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  
  // States for interactive widgets
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [noteIndex, setNoteIndex] = useState(0);
  const [walkStatus, setWalkStatus] = useState(null);

  const notes = [
    "You are doing the best you can right now, and that is enough.",
    "It's okay to feel overwhelmed. Take it one step at a time.",
    "This feeling will pass. You have survived all of your bad days so far.",
    "Be proud of yourself for seeking out ways to cope."
  ];

  const emotionResponses = {
    Anxious: "It's normal to feel anxious. Try the Breathing Exercise above to slow your heart rate.",
    Overwhelmed: "When overwhelmed, breaking things down is key. Open the Task Breakdown guide.",
    Tired: "Rest is productive. A brief change of scenery might give you the mental reset you need.",
    Okay: "I'm glad you're feeling okay! You can still explore the self-care tools here to build resilience."
  };

  const handleAddTask = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      if (newTask.trim()) {
        setTasks([...tasks, { id: Date.now(), text: newTask, done: false }]);
        setNewTask('');
      }
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const handleWalkComplete = () => {
    const messages = [
      "Amazing job! Sometimes a simple change of scenery is all it takes to reset.",
      "Walk logged. Did you notice how the fresh air felt? That's mindfulness in action.",
      "Great! Every step is a literal step away from the pressure. You've got this.",
      "Fantastic. Even just 5 minutes is enough to completely change your perspective."
    ];
    setWalkStatus(messages[Math.floor(Math.random() * messages.length)]);
  };



  const renderActiveWidget = () => {
    switch (activeCard) {
      case 'breathing':
        return <BreathingGuide isOverlay={false} />;
      case 'task':
        return (
          <div className="widget-view">
            <h2>Micro-Task Breakdown</h2>
            <p style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>Write down exactly what you need to do, step by tiny step.</p>
            <div className="task-input-row" style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <input 
                type="text" 
                value={newTask} 
                onChange={(e) => setNewTask(e.target.value)} 
                onKeyDown={handleAddTask}
                placeholder="E.g., Open textbook..." 
                className="chat-input"
                style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '0.5rem', padding: '0.75rem' }}
              />
              <button onClick={handleAddTask} className="send-btn" style={{ padding: '0 1rem', background: 'var(--text-primary)', color: 'var(--bg-color)', borderRadius: '0.5rem' }}>
                <Plus size={20} />
              </button>
            </div>
            <div className="task-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {tasks.map(task => (
                <div key={task.id} className="task-item" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }} onClick={() => toggleTask(task.id)}>
                  {task.done ? <CheckCircle2 size={20} color="var(--accent-color)" /> : <Circle size={20} color="var(--border-color)" />}
                  <span style={{ textDecoration: task.done ? 'line-through' : 'none', color: task.done ? 'var(--text-secondary)' : 'var(--text-primary)', cursor: 'pointer' }}>{task.text}</span>
                </div>
              ))}
            </div>
          </div>
        );
      case 'walk':
        return (
          <div className="widget-view">
             <h2>5-Minute Walk Check-in</h2>
             {walkStatus ? (
               <>
                 <div style={{ margin: '2rem 0', padding: '1.5rem', backgroundColor: 'rgba(99, 102, 241, 0.1)', borderRadius: '1rem', borderLeft: '4px solid var(--accent-color)' }}>
                   <p style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-primary)' }}>{walkStatus}</p>
                 </div>
                 <button className="option-btn" onClick={() => setWalkStatus(null)}>Start Another Walk Check-in</button>
               </>
             ) : (
               <>
                 <p style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)', textAlign: 'center' }}>Leave your phone if safely possible. Pay attention to 5 things you can see, 4 you can touch, 3 you can hear on your walk.</p>
                 <button className="start-btn" style={{ display: 'inline-flex' }} onClick={handleWalkComplete}>Log Walk Complete</button>
               </>
             )}
          </div>
        );
      case 'encouragement':
        return (
          <div className="widget-view" style={{ textAlign: 'center' }}>
             <h2>A Note For You</h2>
             <div style={{ margin: '2rem 0', padding: '2rem', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '1rem', fontStyle: 'italic', fontSize: '1.1rem' }}>
                "{notes[noteIndex]}"
             </div>
             <button className="option-btn" onClick={() => setNoteIndex((prev) => (prev + 1) % notes.length)}>Read Another Note</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="page-container">
      {activeCard ? (
        <div className="active-card-container">
          <button className="card-action" style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.5rem' }} onClick={() => setActiveCard(null)}>
            <ArrowLeft size={16} /> Back to strategies
          </button>
          {renderActiveWidget()}
        </div>
      ) : (
        <>
          <h1>Coping Strategies</h1>
          <p>Find a moment of calm. Select an activity to help ground yourself right now.</p>
    
          <div className="grid-layout">
            <div className="card" onClick={() => setActiveCard('breathing')} style={{ cursor: 'pointer' }}>
              <div className="card-header">
                <div className="card-icon"><Wind size={20} /></div>
                <h2 className="card-title">Breathing Exercise</h2>
              </div>
              <p className="card-desc">Guided 4-7-8 breathing to regulate your nervous system and reduce immediate stress.</p>
              <button className="card-action">Start Exercise →</button>
            </div>
    
            <div className="card" onClick={() => setActiveCard('task')} style={{ cursor: 'pointer' }}>
              <div className="card-header">
                <div className="card-icon"><ListTodo size={20} /></div>
                <h2 className="card-title">Task Breakdown</h2>
              </div>
              <p className="card-desc">Overwhelmed? Let's break down what you need to do into tiny, manageable steps.</p>
              <button className="card-action">Organize Now →</button>
            </div>
    
            <div className="card" onClick={() => setActiveCard('walk')} style={{ cursor: 'pointer' }}>
              <div className="card-header">
                <div className="card-icon"><Footprints size={20} /></div>
                <h2 className="card-title">5-Minute Walk</h2>
              </div>
              <p className="card-desc">Step away from your current environment. A brief change of scenery can reset your mind.</p>
              <button className="card-action">Log Walk →</button>
            </div>
    
            <div className="card" onClick={() => setActiveCard('encouragement')} style={{ cursor: 'pointer' }}>
              <div className="card-header">
                <div className="card-icon"><Heart size={20} /></div>
                <h2 className="card-title">Gentle Encouragement</h2>
              </div>
              <p className="card-desc">Read supportive affirmations designed to remind you of your resilience.</p>
              <button className="card-action">Read Notes →</button>
            </div>
          </div>
    
          <div className="emotion-selector">
            <p>How are you feeling right now?</p>
            <div className="emotion-tags">
              {['Anxious', 'Overwhelmed', 'Tired', 'Okay'].map(emotion => (
                <button 
                  key={emotion}
                  className={`emotion-tag ${selectedEmotion === emotion ? 'active' : ''}`}
                  style={{ backgroundColor: selectedEmotion === emotion ? 'var(--text-primary)' : 'transparent', color: selectedEmotion === emotion ? 'var(--bg-color)' : 'var(--text-secondary)' }}
                  onClick={() => setSelectedEmotion(emotion)}
                >
                  {emotion}
                </button>
              ))}
            </div>
            
            {selectedEmotion && (
              <div className="emotion-feedback" style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: 'rgba(99, 102, 241, 0.1)', borderLeft: '4px solid var(--accent-color)', borderRadius: '0 0.5rem 0.5rem 0' }}>
                <p style={{ margin: 0, color: 'var(--text-primary)' }}>{emotionResponses[selectedEmotion]}</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Coping;
