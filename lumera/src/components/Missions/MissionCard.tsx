import React from 'react';
import { Mission } from '../../types';
import { Sparkles, Clock, CheckCircle2, ArrowRight } from 'lucide-react';

interface MissionCardProps {
  mission: Mission;
  onOpen: (mission: Mission) => void;
}

export const MissionCard: React.FC<MissionCardProps> = ({ mission, onOpen }) => {
  return (
    <div 
      className="loom-card loom-card-interactive"
      onClick={() => onOpen(mission)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        opacity: mission.completed ? 0.85 : 1,
        borderLeft: mission.completed ? '4px solid var(--forest-500)' : '1px solid var(--border-light)'
      }}
    >
      <div>
        {/* Top Badges */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
          <span className={`badge badge-${mission.category}`}>
            {mission.category}
          </span>
          <span style={{ 
            fontSize: '0.8rem', 
            fontWeight: 600, 
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem'
          }}>
            <Clock size={13} /> {mission.estimatedTime}
          </span>
        </div>

        {/* Title */}
        <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', lineHeight: 1.35 }}>
          {mission.title}
        </h3>

        {/* Description */}
        <p style={{ 
          fontSize: '0.9rem', 
          lineHeight: 1.5,
          color: 'var(--text-secondary)',
          marginBottom: '1rem',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {mission.description}
        </p>
      </div>

      <div>
        {/* Visual World Effect Tag */}
        <div style={{ 
          fontSize: '0.775rem', 
          color: 'var(--forest-700)',
          background: 'var(--surface-subtle)',
          padding: '0.4rem 0.65rem',
          borderRadius: 'var(--radius-sm)',
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.35rem'
        }}>
          <span>🌱</span>
          <span style={{ fontWeight: 500 }}>{mission.visualEffectDescription}</span>
        </div>

        {/* Bottom Actions & Sparks */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          paddingTop: '0.75rem',
          borderTop: '1px solid var(--border-subtle)'
        }}>
          <span style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.25rem',
            fontWeight: 700, 
            color: 'var(--coral-500)',
            fontSize: '0.9rem'
          }}>
            <Sparkles size={15} /> +{mission.sparksReward} Sparks
          </span>

          {mission.completed ? (
            <span style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.3rem', 
              color: 'var(--forest-600)',
              fontSize: '0.85rem',
              fontWeight: 600
            }}>
              <CheckCircle2 size={16} /> Completed
            </span>
          ) : (
            <button 
              className="btn btn-sm btn-outline" 
              onClick={(e) => {
                e.stopPropagation();
                onOpen(mission);
              }}
              style={{ padding: '0.35rem 0.85rem' }}
            >
              <span>Accept</span>
              <ArrowRight size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
