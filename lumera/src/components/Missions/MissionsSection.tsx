import React, { useState } from 'react';
import { Mission, MissionCategory } from '../../types';
import { MissionCard } from './MissionCard';
import { MissionModal } from './MissionModal';
import { Sparkles, Compass, CheckCircle2 } from 'lucide-react';

interface MissionsSectionProps {
  missions: Mission[];
  onCompleteMission: (missionId: string, submissionText: string) => void;
  selectedZoneFilter?: string | null;
}

export const MissionsSection: React.FC<MissionsSectionProps> = ({
  missions,
  onCompleteMission,
  selectedZoneFilter
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);

  const categories: { id: string; label: string; icon: string }[] = [
    { id: 'all', label: 'All Sparks', icon: '✨' },
    { id: 'learn', label: 'Learn', icon: '📚' },
    { id: 'create', label: 'Create', icon: '🎨' },
    { id: 'help', label: 'Help', icon: '🤝' },
    { id: 'discover', label: 'Discover', icon: '🧭' },
    { id: 'connect', label: 'Connect', icon: '🔗' },
    { id: 'community', label: 'Community', icon: '🌐' }
  ];

  const filteredMissions = missions.filter(m => {
    if (selectedCategory !== 'all' && m.category !== selectedCategory) return false;
    if (selectedZoneFilter && selectedZoneFilter !== 'all' && m.planetZone !== selectedZoneFilter) return false;
    return true;
  });

  const completedCount = missions.filter(m => m.completed).length;

  return (
    <section style={{ marginBottom: '3rem' }}>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        gap: '1rem',
        marginBottom: '1.25rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem' }}>
            <span className="badge badge-help">
              <Sparkles size={13} /> Daily Missions
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              {completedCount} of {missions.length} sparks completed today
            </span>
          </div>
          <h2 style={{ margin: 0, fontSize: '1.65rem' }}>
            Daily Spark Missions
          </h2>
          <p style={{ marginTop: '0.25rem', fontSize: '0.925rem' }}>
            Small, mindful actions that nurture the living planet and support others.
          </p>
        </div>

        {/* Progress Tracker Pill */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
          background: 'var(--surface-card)',
          padding: '0.5rem 1rem',
          borderRadius: 'var(--radius-full)',
          border: '1px solid var(--border-light)'
        }}>
          <CheckCircle2 size={16} color="var(--forest-600)" />
          <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>
            {Math.round((completedCount / missions.length) * 100)}% Isle Harmony
          </span>
        </div>
      </div>

      {/* Category Filter Bar */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        overflowX: 'auto',
        paddingBottom: '0.75rem',
        scrollbarWidth: 'none',
        marginBottom: '1.5rem'
      }}>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`btn btn-sm ${selectedCategory === cat.id ? 'btn-primary' : 'btn-secondary'}`}
            style={{ borderRadius: 'var(--radius-full)', padding: '0.4rem 0.95rem' }}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Missions Grid */}
      {filteredMissions.length === 0 ? (
        <div className="loom-card" style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
            No missions found for this category yet.
          </p>
          <button onClick={() => setSelectedCategory('all')} className="btn btn-secondary" style={{ marginTop: '1rem' }}>
            Show all missions
          </button>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.25rem'
        }}>
          {filteredMissions.map(m => (
            <MissionCard
              key={m.id}
              mission={m}
              onOpen={(mission) => setSelectedMission(mission)}
            />
          ))}
        </div>
      )}

      {/* Mission Modal */}
      {selectedMission && (
        <MissionModal
          mission={selectedMission}
          onClose={() => setSelectedMission(null)}
          onComplete={onCompleteMission}
        />
      )}
    </section>
  );
};
