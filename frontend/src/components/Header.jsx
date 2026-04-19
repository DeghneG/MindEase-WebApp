import React from 'react';
import { NavLink } from 'react-router-dom';
import { User } from 'lucide-react';

function Header() {
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

      <div className="profile-icon">
        <User size={16} color="var(--text-secondary)" />
      </div>
    </header>
  );
}

export default Header;
