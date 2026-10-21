import React from 'react';
import { IdeaChain } from '../../types';
import { GitBranch, Sparkles, Users, ArrowRight } from 'lucide-react';

interface IdeaChainCardProps {
  chain: IdeaChain;
  onSelect: (chain: IdeaChain) => void;
  isSelected?: boolean;
}

export const IdeaChainCard: React.FC<IdeaChainCardProps> = ({
  chain,
  onSelect,
  isSelected
}) => {
  const rootNode = chain.nodes[chain.rootNodeId];
  const nodeCount = Object.keys(chain.nodes).length;

  // Gather unique avatars
  const uniqueAvatars = Array.from(new Set(Object.values(chain.nodes).map(n => n.authorAvatar)));

  return (
    <div
      className={`loom-card loom-card-interactive ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(chain)}
      style={{
        border: isSelected ? '2px solid var(--forest-600)' : '1px solid var(--border-light)',
        background: isSelected ? 'var(--forest-50)' : 'var(--surface-card)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '1.25rem'
      }}
    >
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
          <span className={`badge badge-${chain.category}`}>
            {chain.category}
          </span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            {chain.updatedAt}
          </span>
        </div>

        <h4 style={{ fontSize: '1.15rem', marginBottom: '0.45rem', lineHeight: 1.35 }}>
          {chain.title}
        </h4>

        {rootNode && (
          <p style={{
            fontSize: '0.875rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.5,
            marginBottom: '1rem',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            "{rootNode.content}"
          </p>
        )}
      </div>

      <div>
        {/* World Effect Preview */}
        <div style={{ 
          fontSize: '0.75rem', 
          color: 'var(--forest-700)',
          background: 'var(--surface-subtle)',
          padding: '0.35rem 0.6rem',
          borderRadius: 'var(--radius-sm)',
          marginBottom: '0.85rem'
        }}>
          🌍 {chain.planetEffect}
        </div>

        {/* Bottom stats & Contributor avatars */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '0.65rem'
        }}>
          {/* Avatar bubbles */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
            {uniqueAvatars.slice(0, 4).map((av, idx) => (
              <span 
                key={idx} 
                style={{
                  fontSize: '1.05rem',
                  background: 'var(--surface-elevated)',
                  borderRadius: '50%',
                  padding: '0.1rem'
                }}
              >
                {av}
              </span>
            ))}
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '0.35rem', fontWeight: 600 }}>
              {nodeCount} branches
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--forest-700)', fontWeight: 700, fontSize: '0.85rem' }}>
            <span>Explore</span>
            <ArrowRight size={14} />
          </div>
        </div>
      </div>
    </div>
  );
};
