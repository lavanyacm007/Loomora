import React, { useState } from 'react';
import { UserProfile } from '../types';
import { Compass, Sparkles, GitBranch, Radio, User, HelpCircle, Menu, X, Plus } from 'lucide-react';

export type NavTab = 'home' | 'missions' | 'chains' | 'feed' | 'profile';

interface NavbarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  userProfile: UserProfile;
  onOpenNewChain: () => void;
  onOpenWelcome: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  userProfile,
  onOpenNewChain,
  onOpenWelcome
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: NavTab; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Living World', icon: <Compass size={17} /> },
    { id: 'missions', label: 'Daily Sparks', icon: <Sparkles size={17} /> },
    { id: 'chains', label: 'Idea Chains', icon: <GitBranch size={17} /> },
    { id: 'feed', label: 'Explore', icon: <Radio size={17} /> },
    { id: 'profile', label: 'My Sanctuary', icon: <User size={17} /> }
  ];

  const handleTabClick = (tab: NavTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(250, 247, 240, 0.92)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border-light)',
      transition: 'background var(--transition-smooth)'
    }}>
      <div className="app-container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '70px',
        gap: '1rem'
      }}>
        {/* Brand Logo & Tagline */}
        <div 
          onClick={() => handleTabClick('home')}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.65rem', 
            cursor: 'pointer',
            userSelect: 'none'
          }}
        >
          {/* Animated Planet Orb Icon */}
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #2D6A4F 0%, #52B788 50%, #74C69D 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(45, 106, 79, 0.25)',
            fontSize: '1.25rem'
          }}>
            🌍
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
              <span style={{ 
                fontFamily: 'var(--font-serif)', 
                fontSize: '1.45rem', 
                fontWeight: 700, 
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
                lineHeight: 1
              }}>
                Loomora
              </span>
            </div>
            <div style={{ 
              fontSize: '0.725rem', 
              color: 'var(--forest-700)', 
              fontWeight: 600,
              letterSpacing: '0.01em',
              lineHeight: 1,
              marginTop: '0.2rem'
            }}>
              Small actions. One living world.
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav style={{
          display: 'none',
          alignItems: 'center',
          gap: '0.25rem'
        }} className="desktop-nav">
          {navItems.map(item => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className="btn btn-sm"
                style={{
                  background: isActive ? 'var(--forest-50)' : 'transparent',
                  color: isActive ? 'var(--forest-800)' : 'var(--text-secondary)',
                  fontWeight: isActive ? 700 : 500,
                  borderRadius: 'var(--radius-full)',
                  border: isActive ? '1px solid var(--forest-200)' : '1px solid transparent',
                  padding: '0.45rem 0.85rem'
                }}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Section: Sparks Pill, Plant Seed, Tour, Profile Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          {/* Sparks Counter */}
          <div 
            onClick={() => handleTabClick('profile')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              background: 'var(--surface-card)',
              border: '1px solid var(--border-light)',
              padding: '0.35rem 0.75rem',
              borderRadius: 'var(--radius-full)',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-xs)'
            }}
            title="Your Sparks vitality balance"
          >
            <Sparkles size={14} color="var(--gold-500)" />
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--coral-500)' }}>
              {userProfile.sparks}
            </span>
          </div>

          {/* Quick Plant Seed Button */}
          <button
            onClick={onOpenNewChain}
            className="btn btn-sm btn-spark"
            style={{ display: 'none', padding: '0.4rem 0.85rem' }}
            id="navbar-plant-btn"
          >
            <Plus size={15} />
            <span>Plant Seed</span>
          </button>

          {/* Help Tour Icon */}
          <button
            onClick={onOpenWelcome}
            className="btn btn-ghost"
            style={{ padding: '0.45rem', borderRadius: '50%' }}
            title="About Loomora & Guided Tour"
            aria-label="Welcome guide"
          >
            <HelpCircle size={19} color="var(--forest-600)" />
          </button>

          {/* User Avatar Badge */}
          <button
            onClick={() => handleTabClick('profile')}
            style={{
              background: 'var(--forest-100)',
              border: '2px solid var(--forest-300)',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.25rem',
              cursor: 'pointer',
              padding: 0
            }}
            title={`${userProfile.name} (Level ${userProfile.level})`}
          >
            {userProfile.avatar}
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="btn btn-ghost"
            style={{ padding: '0.45rem', borderRadius: 'var(--radius-sm)' }}
            id="navbar-mobile-toggle"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div style={{
          background: 'var(--surface-card)',
          borderBottom: '1px solid var(--border-light)',
          padding: '1rem 1.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          boxShadow: 'var(--shadow-md)'
        }}>
          {navItems.map(item => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className="btn btn-sm"
                style={{
                  justifyContent: 'flex-start',
                  background: isActive ? 'var(--forest-50)' : 'transparent',
                  color: isActive ? 'var(--forest-800)' : 'var(--text-secondary)',
                  fontWeight: isActive ? 700 : 500,
                  borderRadius: 'var(--radius-md)',
                  padding: '0.65rem 1rem'
                }}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
          <div style={{ paddingTop: '0.5rem', borderTop: '1px solid var(--border-light)', display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => {
                onOpenNewChain();
                setMobileMenuOpen(false);
              }}
              className="btn btn-sm btn-spark"
              style={{ width: '100%' }}
            >
              <Plus size={15} />
              <span>Plant an Idea Seed</span>
            </button>
          </div>
        </div>
      )}

      {/* Responsive media query helper injected for desktop-nav */}
      <style>{`
        @media (min-width: 820px) {
          .desktop-nav {
            display: flex !important;
          }
          #navbar-mobile-toggle {
            display: none !important;
          }
          #navbar-plant-btn {
            display: inline-flex !important;
          }
        }
      `}</style>
    </header>
  );
};
