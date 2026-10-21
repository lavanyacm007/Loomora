import React, { useState } from 'react';
import { IdeaChain, IdeaChainNode, MissionCategory } from '../../types';
import { IdeaChainCard } from './IdeaChainCard';
import { IdeaChainTree } from './IdeaChainTree';
import { NewChainModal } from './NewChainModal';
import { GitBranch, Plus, Search, Filter, Sparkles, BookOpen } from 'lucide-react';

interface IdeaChainsViewProps {
  chains: IdeaChain[];
  onAddBranch: (
    chainId: string,
    parentNodeId: string,
    title: string,
    content: string,
    type: IdeaChainNode['contributionType']
  ) => void;
  onCreateChain: (title: string, category: MissionCategory, content: string, initialTopic: string) => void;
}

export const IdeaChainsView: React.FC<IdeaChainsViewProps> = ({
  chains,
  onAddBranch,
  onCreateChain
}) => {
  const [selectedChainId, setSelectedChainId] = useState<string>(chains[0]?.id || '');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showNewChainModal, setShowNewChainModal] = useState(false);

  const categories = [
    { id: 'all', label: 'All Trees', icon: '🌳' },
    { id: 'learn', label: 'Learn', icon: '📚' },
    { id: 'create', label: 'Create', icon: '🎨' },
    { id: 'help', label: 'Help', icon: '🤝' },
    { id: 'community', label: 'Community', icon: '🌐' }
  ];

  const filteredChains = chains.filter(c => {
    if (selectedCategory !== 'all' && c.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const inTitle = c.title.toLowerCase().includes(q);
      const inTopic = c.initialTopic.toLowerCase().includes(q);
      const inNodes = Object.values(c.nodes).some(n => 
        n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q) || n.authorName.toLowerCase().includes(q)
      );
      if (!inTitle && !inTopic && !inNodes) return false;
    }
    return true;
  });

  const activeChain = chains.find(c => c.id === selectedChainId) || filteredChains[0] || chains[0];

  return (
    <div style={{ paddingBottom: '3rem' }}>
      {/* View Header */}
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
            <span className="badge badge-connect">
              <GitBranch size={13} /> The Collaborative Idea Chain
            </span>
          </div>
          <h2 style={{ margin: 0, fontSize: '1.85rem' }}>
            Knowledge Trees & Idea Chains
          </h2>
          <p style={{ marginTop: '0.35rem', fontSize: '0.95rem', maxWidth: '640px' }}>
            Nobody builds alone on Loomora. Share a seed question or tip, and watch the community branch it into beginner guides, translations, code snippets, and real-world experiments.
          </p>
        </div>

        <button
          onClick={() => setShowNewChainModal(true)}
          className="btn btn-spark"
          style={{ padding: '0.75rem 1.4rem' }}
        >
          <Plus size={18} />
          <span>Plant New Idea Seed</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '0.75rem',
        marginBottom: '1.5rem'
      }}>
        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.25rem', scrollbarWidth: 'none' }}>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`btn btn-sm ${selectedCategory === cat.id ? 'btn-primary' : 'btn-secondary'}`}
              style={{ borderRadius: 'var(--radius-full)' }}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div style={{ position: 'relative', minWidth: '240px' }}>
          <Search 
            size={16} 
            color="var(--text-muted)" 
            style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} 
          />
          <input
            type="text"
            className="input-field"
            placeholder="Search ideas or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ paddingLeft: '2.4rem', height: '38px', fontSize: '0.875rem' }}
          />
        </div>
      </div>

      {/* Main 2-Column Layout: Left List, Right Active Tree View */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '1.75rem',
        alignItems: 'start'
      }}>
        {/* Left Column: List of Idea Trees */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Available Idea Chains ({filteredChains.length})
          </div>

          {filteredChains.length === 0 ? (
            <div className="loom-card" style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <p>No idea chains found matching your filter.</p>
              <button 
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }} 
                className="btn btn-secondary btn-sm"
                style={{ marginTop: '0.75rem' }}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            filteredChains.map(c => (
              <IdeaChainCard
                key={c.id}
                chain={c}
                isSelected={activeChain?.id === c.id}
                onSelect={(chain) => setSelectedChainId(chain.id)}
              />
            ))
          )}
        </div>

        {/* Right Column: Deep Tree Explorer for Selected Chain */}
        <div style={{ gridColumn: 'span 2' }}>
          {activeChain ? (
            <IdeaChainTree
              chain={activeChain}
              onAddBranch={onAddBranch}
            />
          ) : (
            <div className="loom-card" style={{ textAlign: 'center', padding: '4rem 1.5rem' }}>
              <BookOpen size={40} color="var(--forest-400)" style={{ margin: '0 auto 1rem' }} />
              <h3>Select an Idea Chain</h3>
              <p>Choose an idea from the list on the left to explore its connected branches and contribute.</p>
            </div>
          )}
        </div>
      </div>

      {/* New Chain Modal */}
      {showNewChainModal && (
        <NewChainModal
          onClose={() => setShowNewChainModal(false)}
          onCreateChain={onCreateChain}
        />
      )}
    </div>
  );
};
