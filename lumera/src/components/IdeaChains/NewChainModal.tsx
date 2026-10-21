import React, { useState } from 'react';
import { MissionCategory } from '../../types';
import { Sparkles, AlertCircle, X, Sprout } from 'lucide-react';
import confetti from 'canvas-confetti';

interface NewChainModalProps {
  onClose: () => void;
  onCreateChain: (title: string, category: MissionCategory, content: string, initialTopic: string) => void;
}

export const NewChainModal: React.FC<NewChainModalProps> = ({
  onClose,
  onCreateChain
}) => {
  const [title, setTitle] = useState('');
  const [initialTopic, setInitialTopic] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<MissionCategory>('learn');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories: { id: MissionCategory; label: string; icon: string; zone: string }[] = [
    { id: 'learn', label: 'Learn & Teach', icon: '🌲', zone: 'Knowledge Forest' },
    { id: 'create', label: 'Craft & Create', icon: '🎨', zone: 'Creative Isles' },
    { id: 'help', label: 'Kindness & Advice', icon: '🌸', zone: 'Kindness Garden' },
    { id: 'discover', label: 'Curiosity & Science', icon: '⛰️', zone: 'Discovery Mountains' },
    { id: 'community', label: 'Civic & Ecology', icon: '🏛️', zone: 'Community City' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || title.trim().length < 6) {
      setError('Please provide a descriptive seed question or title (at least 6 characters).');
      return;
    }

    if (!content.trim() || content.trim().length < 25) {
      setError('Please provide at least 25 characters of initial thought or advice to get the chain started.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      onCreateChain(title.trim(), category, content.trim(), initialTopic.trim() || title.trim());

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#52B788', '#2D6A4F', '#E9C46A']
        });
      } catch {
        // Fallback
      }

      setTimeout(() => {
        setIsSubmitting(false);
        onClose();
      }, 600);
    } catch (err: any) {
      setError(err?.message || 'Failed to plant seed.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '620px' }}
      >
        <button 
          onClick={onClose}
          className="btn btn-ghost btn-sm"
          style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', padding: '0.4rem', borderRadius: '50%' }}
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '1.8rem' }}>🌱</span>
          <div>
            <h3 style={{ fontSize: '1.45rem', margin: 0 }}>Plant a Collaborative Idea Seed</h3>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Start an open knowledge tree for the community to branch and grow
            </span>
          </div>
        </div>

        <p style={{ marginTop: '0.5rem', marginBottom: '1.25rem', fontSize: '0.9rem' }}>
          Great seeds are useful questions, life hacks, creative prompts, or kindness tips that invite others to contribute examples and insights.
        </p>

        <form onSubmit={handleSubmit}>
          {/* Category selection */}
          <div style={{ marginBottom: '1.15rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
              Select Biome & Category:
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: '0.5rem' }}>
              {categories.map(c => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCategory(c.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.55rem 0.75rem',
                    borderRadius: 'var(--radius-md)',
                    border: category === c.id ? '2px solid var(--forest-600)' : '1px solid var(--border-light)',
                    background: category === c.id ? 'var(--forest-50)' : 'var(--surface-card)',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <span style={{ fontSize: '1.2rem' }}>{c.icon}</span>
                  <div>
                    <div style={{ fontSize: '0.825rem', fontWeight: 700 }}>{c.label}</div>
                    <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>{c.zone}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Seed Title */}
          <div style={{ marginBottom: '1rem' }}>
            <label 
              htmlFor="seed-title-input"
              style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}
            >
              Idea Title or Central Question:
            </label>
            <input
              id="seed-title-input"
              type="text"
              className="input-field"
              placeholder="e.g. How to explain quantum computing to a middle-schooler..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={90}
            />
          </div>

          {/* Initial Topic tag */}
          <div style={{ marginBottom: '1rem' }}>
            <label 
              htmlFor="seed-topic-input"
              style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}
            >
              Short Topic Summary:
            </label>
            <input
              id="seed-topic-input"
              type="text"
              className="input-field"
              placeholder="e.g. Science analogies, Mindful habits, Recycled DIY..."
              value={initialTopic}
              onChange={(e) => setInitialTopic(e.target.value)}
              maxLength={60}
            />
          </div>

          {/* Root Content */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label 
              htmlFor="seed-content-input"
              style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}
            >
              Your Initial Seed Contribution:
            </label>
            <textarea
              id="seed-content-input"
              className="textarea-field"
              placeholder="Share your foundational explanation, tip, or thought. Others will add examples and extensions to this!"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.775rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
              <span>Seeds are public and welcoming to all community members</span>
              <span>{content.length} characters</span>
            </div>
          </div>

          {error && (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.4rem', 
              color: 'var(--coral-600)', 
              fontSize: '0.85rem', 
              marginBottom: '1rem',
              background: 'var(--coral-50)',
              padding: '0.5rem 0.85rem',
              borderRadius: 'var(--radius-sm)'
            }}>
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-spark"
              disabled={isSubmitting || !title.trim() || !content.trim()}
            >
              <Sprout size={16} />
              <span>{isSubmitting ? 'Planting Seed...' : 'Plant Seed (+40 Sparks)'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
