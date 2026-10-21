import React from 'react';
import { Sparkles, GitBranch, Globe, Heart, ArrowRight, X } from 'lucide-react';

interface WelcomeModalProps {
  onClose: () => void;
  onExploreMissions: () => void;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({
  onClose,
  onExploreMissions
}) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '640px', padding: '2.25rem' }}
      >
        <button 
          onClick={onClose}
          className="btn btn-ghost btn-sm"
          style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', padding: '0.4rem', borderRadius: '50%' }}
          aria-label="Close welcome modal"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🌍✨</div>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.35rem' }}>Welcome to Loomora</h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--forest-700)', fontWeight: 600 }}>
            “Small actions. One living world.”
          </p>
        </div>

        {/* 3 Core Pillars */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '1rem',
            background: 'var(--surface-subtle)',
            padding: '1rem',
            borderRadius: 'var(--radius-md)'
          }}>
            <div style={{ fontSize: '1.8rem', lineHeight: 1 }}>🌱</div>
            <div>
              <h4 style={{ margin: 0, fontSize: '1.05rem' }}>Real Actions Grow the Planet</h4>
              <p style={{ fontSize: '0.875rem', marginTop: '0.2rem', lineHeight: 1.45 }}>
                Explain a concept, do a small kindness, or solve a riddle. Every Daily Spark completed directly evolves biomes and unlocks landmarks on the living island.
              </p>
            </div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '1rem',
            background: 'var(--surface-subtle)',
            padding: '1rem',
            borderRadius: 'var(--radius-md)'
          }}>
            <div style={{ fontSize: '1.8rem', lineHeight: 1 }}>🌿</div>
            <div>
              <h4 style={{ margin: 0, fontSize: '1.05rem' }}>The Collaborative Idea Chain</h4>
              <p style={{ fontSize: '0.875rem', marginTop: '0.2rem', lineHeight: 1.45 }}>
                Nobody creates in a vacuum. Plant an idea seed, and watch community members branch it into beginner-friendly explanations, code examples, experiments, and translations.
              </p>
            </div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '1rem',
            background: 'var(--surface-subtle)',
            padding: '1rem',
            borderRadius: 'var(--radius-md)'
          }}>
            <div style={{ fontSize: '1.8rem', lineHeight: 1 }}>🛡️</div>
            <div>
              <h4 style={{ margin: 0, fontSize: '1.05rem' }}>Wholesome & Safe for All Ages</h4>
              <p style={{ fontSize: '0.875rem', marginTop: '0.2rem', lineHeight: 1.45 }}>
                No addictive doom-scrolling, no ads, and no private message risks. Just a peaceful sanctuary where curiosity and kindness flourish.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button onClick={onClose} className="btn btn-secondary">
            Explore the Island First
          </button>
          <button 
            onClick={() => {
              onClose();
              onExploreMissions();
            }} 
            className="btn btn-spark"
          >
            <span>Start Today's Spark</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
