import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

function BreathingGuide({ onClose, isOverlay = true }) {
  const [breathPhase, setBreathPhase] = useState('Inhale (4s)');

  useEffect(() => {
    let step1, step2, step3;
    
    const runCycle = () => {
      setBreathPhase('Inhale (4s)');
      step1 = setTimeout(() => setBreathPhase('Hold (7s)'), 4000);
      step2 = setTimeout(() => setBreathPhase('Exhale (8s)'), 11000);
      step3 = setTimeout(runCycle, 19000);
    };

    runCycle();

    return () => {
      clearTimeout(step1);
      clearTimeout(step2);
      clearTimeout(step3);
    };
  }, []);

  const content = (
    <div className="widget-view">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: '2rem' }}>
         <h2 style={{ fontSize: '1.5rem', fontWeight: '600' }}>4-7-8 Breathing Technique</h2>
         {onClose && (
           <button onClick={onClose} className="card-action" style={{ color: 'var(--text-secondary)' }}>
             <X size={24} />
           </button>
         )}
      </div>
      <div className="breath-circle">
        <span className="breath-phase">{breathPhase}</span>
      </div>
      <p style={{ marginTop: '2.5rem', color: 'var(--text-secondary)', textAlign: 'center', maxWidth: '300px' }}>
        Inhale through your nose, hold for 7 seconds, and exhale completely through your mouth for 8 seconds.
      </p>
    </div>
  );

  if (isOverlay) {
    return (
      <div className="breathing-guide-overlay">
        {content}
      </div>
    );
  }

  return content;
}

export default BreathingGuide;
