import React, { useState } from 'react';
import { Mission } from '../../types';
import { Sparkles, CheckCircle2, AlertCircle, X, HelpCircle, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface MissionModalProps {
  mission: Mission;
  onClose: () => void;
  onComplete: (missionId: string, submissionText: string) => void;
}

export const MissionModal: React.FC<MissionModalProps> = ({
  mission,
  onClose,
  onComplete
}) => {
  const [submission, setSubmission] = useState(mission.userSubmission || '');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (submission.trim().length < 15) {
      setError('Please write at least a sentence or two (minimum 15 characters) to share something meaningful.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    // Fire joyful confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#52B788', '#E07A5F', '#3A86FF', '#C77DFF', '#E9C46A']
      });
    } catch {
      // Confetti fallback
    }

    setShowCelebration(true);

    setTimeout(() => {
      onComplete(mission.id, submission.trim());
      setIsSubmitting(false);
      onClose();
    }, 1400);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '580px' }}
      >
        <button 
          onClick={onClose}
          className="btn btn-ghost btn-sm"
          style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', padding: '0.4rem', borderRadius: '50%' }}
          aria-label="Close mission modal"
        >
          <X size={18} />
        </button>

        {showCelebration ? (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '0.75rem' }}>✨🌱</div>
            <h3 style={{ fontSize: '1.75rem', color: 'var(--forest-700)' }}>Spark Planted!</h3>
            <p style={{ marginTop: '0.5rem', color: 'var(--text-secondary)' }}>
              You earned <strong>+{mission.sparksReward} Sparks</strong>! The {mission.planetZone.replace('-', ' ')} has responded and grown.
            </p>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
              <span className={`badge badge-${mission.category}`}>
                {mission.category}
              </span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                {mission.difficulty} • ~{mission.estimatedTime}
              </span>
            </div>

            <h3 style={{ fontSize: '1.45rem', marginBottom: '0.65rem' }}>
              {mission.title}
            </h3>

            <p style={{ marginBottom: '1.25rem', lineHeight: 1.55 }}>
              {mission.description}
            </p>

            {/* Living World Impact Preview Box */}
            <div style={{
              background: 'var(--surface-subtle)',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-md)',
              padding: '0.9rem 1.15rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.5rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <span style={{ fontSize: '1.4rem' }}>🌍</span>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                    Visual World Effect
                  </div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--forest-800)' }}>
                    {mission.visualEffectDescription}
                  </div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '0.25rem',
                  fontWeight: 700, 
                  color: 'var(--coral-500)',
                  fontSize: '0.95rem'
                }}>
                  <Sparkles size={16} /> +{mission.sparksReward} Sparks
                </span>
              </div>
            </div>

            {mission.completed ? (
              <div style={{
                background: 'var(--forest-50)',
                border: '1px solid var(--forest-200)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                marginBottom: '1rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--forest-700)', fontWeight: 600, marginBottom: '0.5rem' }}>
                  <CheckCircle2 size={18} /> Mission Completed!
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontStyle: 'italic', background: 'var(--surface-card)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)' }}>
                  "{mission.userSubmission}"
                </div>
                <div style={{ textAlign: 'right', marginTop: '1rem' }}>
                  <button onClick={onClose} className="btn btn-secondary">
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1.25rem' }}>
                  <label 
                    htmlFor="mission-submission-input"
                    style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-primary)' }}
                  >
                    Your Contribution:
                  </label>
                  <textarea
                    id="mission-submission-input"
                    className="textarea-field"
                    placeholder="Write your explanation, reflection, helpful advice, or creative lines here..."
                    value={submission}
                    onChange={(e) => {
                      setSubmission(e.target.value);
                      if (error) setError(null);
                    }}
                    rows={4}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.775rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
                    <span>Keep it supportive, original & safe for all ages</span>
                    <span>{submission.length} characters</span>
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
                    disabled={isSubmitting || submission.trim().length === 0}
                  >
                    <Sparkles size={16} />
                    <span>{isSubmitting ? 'Planting Spark...' : `Submit & Earn +${mission.sparksReward} Sparks`}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
