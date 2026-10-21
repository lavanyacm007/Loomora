import React, { useState } from 'react';
import { IdeaChain, IdeaChainNode } from '../../types';
import { Sparkles, GitBranch, AlertCircle, X, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AddBranchModalProps {
  chain: IdeaChain;
  parentNode: IdeaChainNode;
  onClose: () => void;
  onSubmitBranch: (
    chainId: string,
    parentNodeId: string,
    title: string,
    content: string,
    type: IdeaChainNode['contributionType']
  ) => void;
}

export const AddBranchModal: React.FC<AddBranchModalProps> = ({
  chain,
  parentNode,
  onClose,
  onSubmitBranch
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState<IdeaChainNode['contributionType']>('expansion');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const contributionTypes: { id: IdeaChainNode['contributionType']; label: string; icon: string; desc: string }[] = [
    { id: 'expansion', label: 'Expansion', icon: '🌿', desc: 'Add deeper context or next steps' },
    { id: 'example', label: 'Example', icon: '🧪', desc: 'Provide an at-home demonstration or sample' },
    { id: 'explanation', label: 'Explanation', icon: '📖', desc: 'Break it down for younger minds' },
    { id: 'translation', label: 'Translation', icon: '🌐', desc: 'Translate into another language' },
    { id: 'creative-spin', label: 'Creative Spin', icon: '🎨', desc: 'Offer an artistic or poetic connection' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || title.trim().length < 4) {
      setError('Please provide a short descriptive title for your branch.');
      return;
    }

    if (!content.trim() || content.trim().length < 20) {
      setError('Please provide at least 20 characters of thoughtful contribution.');
      return;
    }

    // Check against identical text with parent
    if (content.trim().toLowerCase() === parentNode.content.trim().toLowerCase()) {
      setError('Your contribution must be original and not identical to the parent node.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      onSubmitBranch(chain.id, parentNode.id, title.trim(), content.trim(), type);

      // Confetti celebration
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#74C69D', '#52B788', '#E07A5F', '#C77DFF']
        });
      } catch {
        // Fallback
      }

      setIsSuccess(true);
      setTimeout(() => {
        setIsSubmitting(false);
        onClose();
      }, 1300);
    } catch (err: any) {
      setError(err?.message || 'Failed to add branch. Please ensure your content is unique.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '600px' }}
      >
        <button 
          onClick={onClose}
          className="btn btn-ghost btn-sm"
          style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', padding: '0.4rem', borderRadius: '50%' }}
          aria-label="Close branch modal"
        >
          <X size={18} />
        </button>

        {isSuccess ? (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '0.75rem' }}>🌿✨</div>
            <h3 style={{ fontSize: '1.75rem', color: 'var(--forest-700)' }}>Branch Connected!</h3>
            <p style={{ marginTop: '0.5rem', color: 'var(--text-secondary)' }}>
              Your insight has sprouted a new leaf on the Knowledge Tree. <strong>+35 Sparks earned!</strong>
            </p>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span className="badge badge-connect">
                <GitBranch size={13} /> Branching from: {parentNode.authorName}
              </span>
            </div>

            <h3 style={{ fontSize: '1.45rem', marginBottom: '0.75rem' }}>
              Build on "{parentNode.title}"
            </h3>

            {/* Parent Node Context Card */}
            <div style={{
              background: 'var(--surface-subtle)',
              borderLeft: '3px solid var(--forest-500)',
              borderRadius: 'var(--radius-sm)',
              padding: '0.85rem 1rem',
              marginBottom: '1.25rem',
              fontSize: '0.875rem'
            }}>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                {parentNode.authorAvatar} {parentNode.authorName}:
              </div>
              <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic', margin: 0 }}>
                "{parentNode.content}"
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Type selector */}
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-primary)' }}>
                  How does your contribution build on this?
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '0.5rem' }}>
                  {contributionTypes.map(ct => (
                    <button
                      key={ct.id}
                      type="button"
                      onClick={() => setType(ct.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.45rem',
                        padding: '0.55rem 0.75rem',
                        borderRadius: 'var(--radius-md)',
                        border: type === ct.id ? '2px solid var(--forest-600)' : '1px solid var(--border-light)',
                        background: type === ct.id ? 'var(--forest-50)' : 'var(--surface-card)',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all var(--transition-fast)'
                      }}
                    >
                      <span style={{ fontSize: '1.1rem' }}>{ct.icon}</span>
                      <div>
                        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>{ct.label}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Title input */}
              <div style={{ marginBottom: '1rem' }}>
                <label 
                  htmlFor="branch-title-input"
                  style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-primary)' }}
                >
                  Branch Title:
                </label>
                <input
                  id="branch-title-input"
                  type="text"
                  className="input-field"
                  placeholder="e.g. Kitchen experiment with bedsheet, Practical Python regex tip..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={80}
                />
              </div>

              {/* Content textarea */}
              <div style={{ marginBottom: '1.25rem' }}>
                <label 
                  htmlFor="branch-content-input"
                  style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-primary)' }}
                >
                  Your Contribution Content:
                </label>
                <textarea
                  id="branch-content-input"
                  className="textarea-field"
                  placeholder="Provide your helpful explanation, tip, safety precaution, or example..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={4}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.775rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
                  <span>Must be original (cannot duplicate existing nodes)</span>
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

              {/* Actions */}
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                <button type="button" onClick={onClose} className="btn btn-secondary">
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={isSubmitting || !title.trim() || !content.trim()}
                >
                  <Sparkles size={16} />
                  <span>{isSubmitting ? 'Sprouting...' : 'Sprout Branch (+35 Sparks)'}</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
