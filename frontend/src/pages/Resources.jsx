import React from 'react';
import { Phone, MessageSquare, Building2, BookHeart, Users, Link2, Calendar } from 'lucide-react';

function Resources() {
  return (
    <div className="page-container">
      <h1>Support & Resources</h1>
      <p>A curated space for professional guidance, immediate help, and self-paced tools to support your mental well-being.</p>

      <div className="grid-layout">
        
        {/* Highlight Card */}
        <div className="card highlight" style={{ backgroundColor: 'rgba(99, 102, 241, 0.05)', borderColor: 'rgba(99, 102, 241, 0.2)' }}>
          <div>
            <h2 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Phone size={18} color="var(--accent-color)" />
              24/7 Crisis Support
            </h2>
            <p className="card-desc" style={{ marginBottom: 0 }}>Immediate, confidential help is available. If you or someone you know is in distress, please reach out to professional crisis counselors.</p>
          </div>
          <div className="card-content">
             <button className="call-btn">
                <Phone size={18} />
                Call 988
             </button>
             <div className="text-info">
               <MessageSquare size={18} />
               <span>Text HOME<br/>to 741741</span>
             </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h2 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Building2 size={18} />
              University Counseling
            </h2>
          </div>
          <p className="card-desc">Access free, short-term counseling services provided by the university health center. Available for all enrolled students.</p>
          
          <table className="table-info">
            <tbody>
              <tr>
                <td>Location</td>
                <td>Student Health Bldg, 3rd Floor</td>
              </tr>
              <tr>
                <td>Hours</td>
                <td>Mon-Fri, 8AM - 5PM</td>
              </tr>
              <tr>
                <td>Walk-ins</td>
                <td>Available 1PM - 3PM</td>
              </tr>
            </tbody>
          </table>

          <button className="btn-secondary" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
            <Calendar size={16} /> Schedule Appointment
          </button>
        </div>

        <div className="card">
          <div className="card-header">
            <h2 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <BookHeart size={18} />
              Self-Care Guides
            </h2>
          </div>
          <p className="card-desc">Explore our library of guided practices, breathing exercises, and journaling prompts designed for stress reduction.</p>
          
          <ul className="list-info">
            <li>Grounding Techniques</li>
            <li>Sleep Hygiene Basics</li>
            <li>Exam Anxiety Prep</li>
          </ul>

          <button className="card-action">Browse Library →</button>
        </div>

        <div className="card">
           <div className="card-header" style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
             <h2 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Users size={18} />
                Peer Support Groups
             </h2>
             <span style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '1rem' }}>Weekly</span>
           </div>
           <p className="card-desc">Connect with fellow students in a safe, moderated environment to share experiences and coping strategies.</p>
           <button className="card-action">View Schedule →</button>
        </div>

        <div className="card">
           <div className="card-header" style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
             <h2 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Link2 size={18} />
                External Directories
             </h2>
             <span style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '1rem' }}>Verified</span>
           </div>
           <p className="card-desc">A vetted list of local therapists, psychiatrists, and specialized clinics off-campus.</p>
           <button className="card-action">Browse Directory →</button>
        </div>

      </div>
    </div>
  );
}

export default Resources;
