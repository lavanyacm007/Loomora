import React, { useState } from 'react';
import { CommunityActivity } from '../../types';
import { Heart, Sparkles, Flag, GitBranch, ArrowRight } from 'lucide-react';
import { ReportModal } from './ReportModal';

interface ActivityCardProps {
  activity: CommunityActivity;
  onLike: (id: string) => void;
  onOpenChain?: (chainId: string) => void;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({
  activity,
  onLike,
  onOpenChain
}) => {
  const [showReportModal, setShowReportModal] = useState(false);

  const typeIcons: Record<CommunityActivity['type'], { icon: string; label: string }> = {
    'mission_completed': { icon: '✨', label: 'Spark Mission' },
    'chain_created': { icon: '🌱', label: 'Idea Seed' },
    'chain_extended': { icon: '🌿', label: 'Branch Sprouted' },
    'milestone_reached': { icon: '🏛️', label: 'World Landmark' }
  };

  const meta = typeIcons[activity.type] || { icon: '✨', label: 'Action' };

  return (
    <div 
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
        {/* Header with avatar, author, time & flag */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.5rem', lineHeight: 1 }}>{activity.authorAvatar}</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                {activity.authorName}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {activity.timestamp} • {meta.label}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span className={`badge badge-${activity.category}`}>
              {activity.category}
            </span>
            <button
              onClick={() => setShowReportModal(true)}
              className="btn btn-ghost"
              style={{ padding: '0.3rem', borderRadius: '50%', color: 'var(--text-light)' }}
              title="Report inappropriate content"
            >
              <Flag size={13} />
            </button>
          </div>
        </div>

        {/* Action Title */}
        <h4 style={{ fontSize: '1.05rem', marginBottom: '0.35rem', color: 'var(--text-primary)' }}>
          {activity.title}
        </h4>

        {/* Content quote or detail */}
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '0.85rem' }}>
          {activity.detail}
        </p>
      </div>

      <div>
        {/* Footer info: Zone impact & Sparks */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '0.65rem',
          marginTop: '0.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {/* Applaud Button */}
            <button
              onClick={() => onLike(activity.id)}
              className="btn btn-ghost btn-sm"
              style={{
                padding: '0.25rem 0.5rem',
                color: activity.likedByMe ? 'var(--coral-500)' : 'var(--text-secondary)',
                fontSize: '0.825rem'
              }}
            >
              <Heart 
                size={14} 
                fill={activity.likedByMe ? 'var(--coral-500)' : 'none'} 
              />
              <span>{activity.likes}</span>
            </button>

            <span style={{ fontSize: '0.775rem', color: 'var(--forest-700)', fontWeight: 600 }}>
              +{activity.sparksEarned} Sparks
            </span>
          </div>

          {/* Quick link to chain if applicable */}
          {activity.chainId && onOpenChain && (
            <button
              onClick={() => onOpenChain(activity.chainId!)}
              className="btn btn-ghost btn-sm"
              style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem', color: 'var(--forest-700)' }}
            >
              <GitBranch size={13} />
              <span>View Tree</span>
            </button>
          )}
        </div>
      </div>

      {showReportModal && (
        <ReportModal
          activity={activity}
          onClose={() => setShowReportModal(false)}
        />
      )}
    </div>
  );
};
