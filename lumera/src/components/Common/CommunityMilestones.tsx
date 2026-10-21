import React from 'react';
import { CommunityMilestone } from '../../types';
import { Sparkles, Trophy, Lock, CheckCircle2 } from 'lucide-react';

interface CommunityMilestonesProps {
  milestones: CommunityMilestone[];
}

export const CommunityMilestones: React.FC<CommunityMilestonesProps> = ({ milestones }) => {
  return (
    <section style={{ marginBottom: '3rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
            <span className="badge badge-community">
              <Trophy size={13} /> Shared Island Milestones
            </span>
          </div>
          <h3 style={{ margin: 0, fontSize: '1.45rem' }}>Community World Goals</h3>
          <p style={{ fontSize: '0.875rem', marginTop: '0.2rem' }}>
            When all caretakers unite, major wonders unlock across the living biosphere.
          </p>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.25rem'
      }}>
        {milestones.map(m => {
          const percent = Math.min(100, Math.round((m.currentSparks / m.targetSparks) * 100));

          return (
            <div
              key={m.id}
              className="loom-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '1.25rem',
                background: 'var(--surface-card)',
                border: '1px solid var(--border-light)'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <h4 style={{ margin: 0, fontSize: '1.1rem' }}>{m.title}</h4>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--forest-700)' }}>
                    {m.currentSparks} / {m.targetSparks} ✨
                  </span>
                </div>

                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.75rem', lineHeight: 1.45 }}>
                  {m.description}
                </p>

                {/* Progress Bar */}
                <div className="progress-track" style={{ height: '8px', marginBottom: '0.75rem' }}>
                  <div 
                    className="progress-fill progress-fill-gold" 
                    style={{ width: `${percent}%` }} 
                  />
                </div>
              </div>

              {/* Unlock effect info */}
              <div style={{
                fontSize: '0.775rem',
                color: 'var(--forest-800)',
                background: 'var(--forest-50)',
                padding: '0.4rem 0.65rem',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}>
                <Sparkles size={13} color="var(--forest-600)" />
                <span><strong>Unlocks:</strong> {m.rewardDescription}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
