import React, { useState } from 'react';
import { IdeaChain, IdeaChainNode } from '../../types';
import { GitBranch, Heart, Plus, Sparkles, MessageSquare, CornerDownRight } from 'lucide-react';
import { AddBranchModal } from './AddBranchModal';

interface IdeaChainTreeProps {
  chain: IdeaChain;
  onAddBranch: (
    chainId: string,
    parentNodeId: string,
    title: string,
    content: string,
    type: IdeaChainNode['contributionType']
  ) => void;
}

export const IdeaChainTree: React.FC<IdeaChainTreeProps> = ({ chain, onAddBranch }) => {
  const [activeBranchParent, setActiveBranchParent] = useState<IdeaChainNode | null>(null);
  const [likedNodes, setLikedNodes] = useState<Record<string, number>>({});

  const handleLike = (nodeId: string, currentLikes: number) => {
    setLikedNodes(prev => ({
      ...prev,
      [nodeId]: (prev[nodeId] ?? currentLikes) + 1
    }));
  };

  const contributionTypeMeta: Record<IdeaChainNode['contributionType'], { label: string; icon: string; color: string }> = {
    'seed': { label: 'Seed Question', icon: '🌱', color: 'var(--forest-600)' },
    'example': { label: 'Practical Example', icon: '🧪', color: 'var(--sky-600)' },
    'explanation': { label: 'Friendly Explanation', icon: '📖', color: 'var(--lavender-600)' },
    'expansion': { label: 'Extension', icon: '🌿', color: 'var(--forest-700)' },
    'translation': { label: 'Translation', icon: '🌐', color: 'var(--coral-500)' },
    'creative-spin': { label: 'Creative Spin', icon: '🎨', color: 'var(--gold-600)' }
  };

  // Render a node and recursively render its children with leafy connecting lines
  const renderNode = (nodeId: string, depth = 0) => {
    const node = chain.nodes[nodeId];
    if (!node) return null;

    const meta = contributionTypeMeta[node.contributionType] || contributionTypeMeta.seed;
    const currentLikes = likedNodes[node.id] ?? node.likes;

    return (
      <div 
        key={node.id} 
        style={{ 
          position: 'relative', 
          marginLeft: depth === 0 ? '0' : 'clamp(1rem, 3vw, 2.5rem)',
          marginTop: depth === 0 ? '0' : '1.25rem'
        }}
      >
        {/* Connecting branch curve for child nodes */}
        {depth > 0 && (
          <div style={{
            position: 'absolute',
            top: '-1.25rem',
            left: '-1.25rem',
            width: '1.25rem',
            height: '2.5rem',
            borderLeft: '2.5px solid var(--forest-300)',
            borderBottom: '2.5px solid var(--forest-300)',
            borderBottomLeftRadius: '14px',
            pointerEvents: 'none'
          }} />
        )}

        {/* Node Card */}
        <div 
          className="loom-card"
          style={{
            background: depth === 0 ? 'var(--surface-elevated)' : 'var(--surface-card)',
            border: depth === 0 ? '2px solid var(--forest-400)' : '1px solid var(--border-light)',
            boxShadow: depth === 0 ? 'var(--shadow-md)' : 'var(--shadow-sm)',
            position: 'relative',
            padding: '1.25rem'
          }}
        >
          {/* Node Header */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.5rem',
            marginBottom: '0.65rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.4rem' }}>{node.authorAvatar}</span>
              <div>
                <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                  {node.authorName}
                </span>
                <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)', marginLeft: '0.5rem' }}>
                  {node.createdAt}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                padding: '0.2rem 0.6rem',
                borderRadius: 'var(--radius-full)',
                background: 'var(--surface-subtle)',
                color: meta.color,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem',
                border: '1px solid var(--border-light)'
              }}>
                <span>{meta.icon}</span> {meta.label}
              </span>
            </div>
          </div>

          {/* Node Title & Content */}
          <h4 style={{ fontSize: '1.1rem', marginBottom: '0.4rem', color: 'var(--text-primary)' }}>
            {node.title}
          </h4>
          <p style={{ fontSize: '0.925rem', lineHeight: 1.6, color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            {node.content}
          </p>

          {/* Node Footer Actions */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '0.65rem',
            borderTop: '1px solid var(--border-subtle)'
          }}>
            {/* Applaud / Like Button */}
            <button
              onClick={() => handleLike(node.id, currentLikes)}
              className="btn btn-ghost btn-sm"
              style={{
                padding: '0.3rem 0.65rem',
                color: likedNodes[node.id] ? 'var(--coral-500)' : 'var(--text-secondary)',
                fontSize: '0.825rem'
              }}
            >
              <Heart 
                size={15} 
                fill={likedNodes[node.id] ? 'var(--coral-500)' : 'none'} 
              />
              <span>{currentLikes} Applauds</span>
            </button>

            {/* Build on this Branch Button */}
            <button
              onClick={() => setActiveBranchParent(node)}
              className="btn btn-sm btn-outline"
              style={{ padding: '0.35rem 0.85rem' }}
            >
              <GitBranch size={14} />
              <span>Build on this</span>
            </button>
          </div>
        </div>

        {/* Recursive Children Nodes */}
        {node.childrenIds && node.childrenIds.length > 0 && (
          <div style={{ position: 'relative' }}>
            {node.childrenIds.map(childId => renderNode(childId, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Chain Tree Header Info */}
      <div style={{
        background: 'var(--surface-subtle)',
        padding: '1.25rem 1.5rem',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-light)',
        marginBottom: '1.5rem',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <span className={`badge badge-${chain.category}`}>
              {chain.category}
            </span>
            <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
              Updated {chain.updatedAt}
            </span>
          </div>
          <h3 style={{ margin: 0, fontSize: '1.35rem' }}>{chain.title}</h3>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
            🌱 Topic: {chain.initialTopic}
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ 
            fontSize: '0.9rem', 
            fontWeight: 700, 
            color: 'var(--forest-700)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem'
          }}>
            <Sparkles size={16} color="var(--gold-500)" />
            {chain.totalSparks} Total Vitality
          </div>
          <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            {Object.keys(chain.nodes).length} Connected Insights
          </div>
        </div>
      </div>

      {/* Render the Tree starting from root */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {renderNode(chain.rootNodeId, 0)}
      </div>

      {/* Add Branch Modal */}
      {activeBranchParent && (
        <AddBranchModal
          chain={chain}
          parentNode={activeBranchParent}
          onClose={() => setActiveBranchParent(null)}
          onSubmitBranch={onAddBranch}
        />
      )}
    </div>
  );
};
