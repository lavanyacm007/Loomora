import React from 'react';
import { PlanetLandmark, PlanetZone } from '../../types';
import { Sparkles, Users, Layers, ArrowRight, X } from 'lucide-react';

interface ZoneDetailModalProps {
  landmark: PlanetLandmark | null;
  zone: PlanetZone | null;
  onClose: () => void;
  onContributeToZone: (zoneId: string) => void;
}

export const ZoneDetailModal: React.FC<ZoneDetailModalProps> = ({
  landmark,
  zone,
  onClose,
  onContributeToZone
}) => {
  if (!landmark || !zone) return null;

  const progressPercent = Math.min(100, Math.round((landmark.currentSparks / landmark.sparksRequired) * 100));

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '520px', borderTop: `5px solid ${zone.color}` }}
      >
        <button 
          onClick={onClose}
          className="btn btn-ghost btn-sm"
          style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', padding: '0.4rem', borderRadius: '50%' }}
          aria-label="Close landmark details"
        >
          <X size={18} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <span style={{ fontSize: '2.5rem', lineHeight: 1 }}>{landmark.icon}</span>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className={`badge badge-${zone.id.split('-')[0]}`}>
                {zone.name}
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Stage {landmark.growthStage} of {landmark.maxGrowthStage}
              </span>
            </div>
            <h3 style={{ marginTop: '0.25rem', fontSize: '1.35rem' }}>{landmark.name}</h3>
          </div>
        </div>

        <p style={{ marginTop: '0.5rem', marginBottom: '1.25rem', lineHeight: 1.5 }}>
          {landmark.description}
        </p>

        {/* Growth Progress Box */}
        <div style={{ 
          background: 'var(--surface-subtle)', 
          padding: '1.15rem', 
          borderRadius: 'var(--radius-md)',
          marginBottom: '1.25rem',
          border: '1px solid var(--border-light)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
            <span style={{ fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Sparkles size={15} color="var(--gold-500)" /> Landmark Vitality
            </span>
            <span style={{ fontWeight: 700, color: 'var(--forest-700)' }}>
              {landmark.currentSparks} / {landmark.sparksRequired} Sparks ({progressPercent}%)
            </span>
          </div>

          <div className="progress-track" style={{ height: '10px' }}>
            <div 
              className="progress-fill" 
              style={{ 
                width: `${progressPercent}%`,
                background: `linear-gradient(90deg, ${zone.color} 0%, ${zone.accentColor} 100%)`
              }} 
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.75rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Users size={14} /> {landmark.contributorsCount} Community Caretakers
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Layers size={14} /> Next evolution at {landmark.sparksRequired} ✨
            </span>
          </div>
        </div>

        {/* Zone Bio Info */}
        <div style={{ 
          fontSize: '0.85rem', 
          color: 'var(--text-secondary)',
          background: 'var(--surface-card)',
          padding: '0.85rem 1rem',
          borderRadius: 'var(--radius-sm)',
          borderLeft: `3px solid ${zone.color}`,
          marginBottom: '1.5rem'
        }}>
          <strong>Zone Purpose:</strong> {zone.description}
        </div>

        {/* Modal Actions */}
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
          <button onClick={onClose} className="btn btn-secondary">
            Done Inspecting
          </button>
          <button 
            onClick={() => {
              onClose();
              onContributeToZone(zone.id);
            }} 
            className="btn btn-primary"
          >
            <span>Nourish this Zone</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
