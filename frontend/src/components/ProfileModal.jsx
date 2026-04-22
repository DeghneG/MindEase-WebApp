import React from 'react';
import { X, Mail, Phone, User, Calendar, PersonStanding } from 'lucide-react';

function ProfileModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const userData = {
    name: "Loublex Esmero",
    age: "20",
    gender: "Male",
    email: "loublex.esmero@university.edu.ph",
    contact: "+63 917 888 1234"
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="profile-modal-header">
          <div className="profile-large-avatar">
            {userData.name.charAt(0)}
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.25rem' }}>{userData.name}</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>University Student</p>
        </div>

        <div className="profile-info-grid">
          <div className="profile-field">
            <div className="field-label">Full Name</div>
            <div className="field-value">{userData.name}</div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="profile-field">
              <div className="field-label">Age</div>
              <div className="field-value">{userData.age}</div>
            </div>
            <div className="profile-field">
              <div className="field-label">Gender</div>
              <div className="field-value">{userData.gender}</div>
            </div>
          </div>

          <div className="profile-field">
            <div className="field-label">Email Address</div>
            <div className="field-value">{userData.email}</div>
          </div>

          <div className="profile-field">
            <div className="field-label">Contact Number</div>
            <div className="field-value">{userData.contact}</div>
          </div>
        </div>
        
        <div style={{ marginTop: '2.5rem' }}>
           <button className="start-btn" style={{ width: '100%', justifyContent: 'center' }} onClick={onClose}>
             Close Profile
           </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileModal;
