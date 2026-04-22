import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { User } from 'lucide-react';
import ProfileModal from './ProfileModal';

function Header() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="header">
      <NavLink to="/" className="header-logo">
        MindEase
      </NavLink>
      
      <nav className="nav-links">
        <NavLink 
          to="/chat" 
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          Chat
        </NavLink>
        <NavLink 
          to="/coping" 
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          Coping
        </NavLink>
        <NavLink 
          to="/resources" 
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          Resources
        </NavLink>
      </nav>

      <div className="profile-icon" onClick={() => setIsProfileOpen(true)}>
        <User size={16} color="var(--text-secondary)" />
      </div>

      <ProfileModal 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)} 
      />
    </header>
  );
}

export default Header;
