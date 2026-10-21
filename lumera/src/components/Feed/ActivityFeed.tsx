import React, { useState } from 'react';
import { CommunityActivity, MissionCategory } from '../../types';
import { ActivityCard } from './ActivityCard';
import { Search, Sparkles, Filter, Users, Radio } from 'lucide-react';

interface ActivityFeedProps {
  activities: CommunityActivity[];
  onLikeActivity: (id: string) => void;
  onOpenChain?: (chainId: string) => void;
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({
  activities,
  onLikeActivity,
  onOpenChain
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All', icon: '🌐' },
    { id: 'learn', label: 'Learn', icon: '📚' },
    { id: 'create', label: 'Create', icon: '🎨' },
    { id: 'help', label: 'Help', icon: '🤝' },
    { id: 'discover', label: 'Discover', icon: '🧭' },
    { id: 'community', label: 'Community', icon: '🏛️' }
  ];

  const types = [
    { id: 'all', label: 'All Activities' },
    { id: 'mission_completed', label: 'Daily Sparks' },
    { id: 'chain_extended', label: 'Idea Extensions' },
    { id: 'chain_created', label: 'New Seeds' },
    { id: 'milestone_reached', label: 'Landmark Evolutions' }
  ];

  const filtered = activities.filter(act => {
    if (selectedCategory !== 'all' && act.category !== selectedCategory) return false;
    if (selectedType !== 'all' && act.type !== selectedType) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const inTitle = act.title.toLowerCase().includes(q);
      const inDetail = act.detail.toLowerCase().includes(q);
      const inAuthor = act.authorName.toLowerCase().includes(q);
      if (!inTitle && !inDetail && !inAuthor) return false;
    }
    return true;
  });

  return (
    <div style={{ paddingBottom: '3rem' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        gap: '1rem',
        marginBottom: '1.5rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem' }}>
            <span className="badge badge-discover" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <Radio size={12} className="animate-pulse-glow" /> Living World Stream
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Real collaborative impact in action
            </span>
          </div>
          <h2 style={{ margin: 0, fontSize: '1.85rem' }}>
            Community Explore & Activity
          </h2>
          <p style={{ marginTop: '0.35rem', fontSize: '0.95rem' }}>
            Discover how friends and neighbors around the world are caring, learning, and enriching our shared planet.
          </p>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div style={{
        background: 'var(--surface-subtle)',
        border: '1px solid var(--border-light)',
        borderRadius: 'var(--radius-lg)',
        padding: '1rem 1.25rem',
        marginBottom: '1.75rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.85rem'
      }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.75rem'
        }}>
          {/* Categories */}
          <div style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto', scrollbarWidth: 'none' }}>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`btn btn-sm ${selectedCategory === cat.id ? 'btn-primary' : 'btn-secondary'}`}
                style={{ borderRadius: 'var(--radius-full)', padding: '0.35rem 0.85rem' }}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Search box */}
          <div style={{ position: 'relative', width: '100%', maxWidth: '280px' }}>
            <Search 
              size={15} 
              color="var(--text-muted)" 
              style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)' }} 
            />
            <input
              type="text"
              className="input-field"
              placeholder="Search feed by author or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '2.25rem', height: '36px', fontSize: '0.85rem' }}
            />
          </div>
        </div>

        {/* Activity Type Pills */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {types.map(t => (
            <button
              key={t.id}
              onClick={() => setSelectedType(t.id)}
              className={`btn btn-sm ${selectedType === t.id ? 'btn-outline' : 'btn-ghost'}`}
              style={{ fontSize: '0.785rem', padding: '0.25rem 0.65rem', borderRadius: 'var(--radius-full)' }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Activities Grid */}
      {filtered.length === 0 ? (
        <div className="loom-card" style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
            No contributions match your filters right now.
          </p>
          <button 
            onClick={() => { setSelectedCategory('all'); setSelectedType('all'); setSearchQuery(''); }}
            className="btn btn-secondary btn-sm"
            style={{ marginTop: '1rem' }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.25rem'
        }}>
          {filtered.map(act => (
            <ActivityCard
              key={act.id}
              activity={act}
              onLike={onLikeActivity}
              onOpenChain={onOpenChain}
            />
          ))}
        </div>
      )}
    </div>
  );
};
