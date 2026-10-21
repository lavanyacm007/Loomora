import React, { useState } from 'react';
import { 
  UserProfile, 
  PlanetZone, 
  Mission, 
  IdeaChain, 
  CommunityActivity, 
  CommunityMilestone, 
  IdeaChainNode 
} from '../../types';
import { LivingPlanet } from '../Planet/LivingPlanet';
import { MissionCard } from '../Missions/MissionCard';
import { MissionModal } from '../Missions/MissionModal';
import { IdeaChainCard } from '../IdeaChains/IdeaChainCard';
import { AddBranchModal } from '../IdeaChains/AddBranchModal';
import { ActivityCard } from '../Feed/ActivityCard';
import { CommunityMilestones } from '../Common/CommunityMilestones';
import { 
  Sparkles, 
  GitBranch, 
  ArrowRight, 
  Compass, 
  HelpCircle, 
  HeartHandshake, 
  BookOpen, 
  Globe 
} from 'lucide-react';

interface HomeViewProps {
  userProfile: UserProfile;
  zones: PlanetZone[];
  missions: Mission[];
  chains: IdeaChain[];
  activities: CommunityActivity[];
  milestones: CommunityMilestone[];
  onCompleteMission: (missionId: string, submissionText: string) => void;
  onAddBranch: (
    chainId: string,
    parentNodeId: string,
    title: string,
    content: string,
    type: IdeaChainNode['contributionType']
  ) => void;
  onNavigateTab: (tab: 'home' | 'missions' | 'chains' | 'feed' | 'profile') => void;
  onOpenNewChain: () => void;
  onOpenWelcome: () => void;
  onLikeActivity: (id: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  userProfile,
  zones,
  missions,
  chains,
  activities,
  milestones,
  onCompleteMission,
  onAddBranch,
  onNavigateTab,
  onOpenNewChain,
  onOpenWelcome,
  onLikeActivity
}) => {
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [branchingChain, setBranchingChain] = useState<{ chain: IdeaChain; parent: IdeaChainNode } | null>(null);

  // Compute total world sparks
  const totalWorldSparks = zones.reduce((acc, z) => acc + z.sparksContributed, 0) + 300;

  // Active uncompleted mission for "Today's Spark" card
  const todaysSpark = missions.find(m => !m.completed) || missions[0];

  // Featured Idea Chain to build upon
  const featuredChain = chains[0];
  const featuredRootNode = featuredChain ? featuredChain.nodes[featuredChain.rootNodeId] : null;

  return (
    <div style={{ paddingBottom: '4rem' }}>
      {/* Welcoming Top Hero */}
      <section style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1.25rem',
        padding: '1.5rem 0 1rem',
        marginBottom: '0.5rem'
      }}>
        <div style={{ maxWidth: '680px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
            <span className="badge badge-learn" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <span>🌱</span> Welcome back, {userProfile.name}
            </span>
            <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
              World Vitality: Level {userProfile.level} Sanctuary
            </span>
          </div>

          <h1 style={{ margin: 0, fontSize: 'clamp(2.1rem, 4vw, 2.85rem)', lineHeight: 1.15 }}>
            Small actions. One living world.
          </h1>

          <p style={{ marginTop: '0.65rem', fontSize: '1.05rem', lineHeight: 1.5, color: 'var(--text-secondary)' }}>
            Every useful insight you share, question you answer, or small real-life kindness you do becomes visible foliage, glowing waterways, and landmarks on our shared miniature planet.
          </p>
        </div>

        {/* Quick CTA Buttons */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => {
              if (todaysSpark) setSelectedMission(todaysSpark);
              else onNavigateTab('missions');
            }}
            className="btn btn-spark btn-lg"
          >
            <Sparkles size={18} />
            <span>Complete a Mission</span>
          </button>

          <button
            onClick={() => onNavigateTab('chains')}
            className="btn btn-secondary btn-lg"
          >
            <GitBranch size={18} />
            <span>Explore Idea Trees</span>
          </button>
        </div>
      </section>

      {/* The Living Planet Centerpiece */}
      <section style={{ marginTop: '1rem', marginBottom: '2.5rem' }}>
        <LivingPlanet
          zones={zones}
          totalSparks={totalWorldSparks}
          userSparks={userProfile.sparks}
          onSelectZoneForMission={(zoneId) => {
            onNavigateTab('missions');
          }}
        />
      </section>

      {/* 2-Column Highlight Grid: Today's Spark Mission Card + Build on Someone's Idea */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '1.75rem',
        marginBottom: '3rem'
      }}>
        {/* Today's Featured Spark Mission */}
        <div className="loom-card" style={{
          background: 'linear-gradient(135deg, var(--surface-card) 0%, var(--surface-subtle) 100%)',
          border: '1.5px solid var(--border-light)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span className="badge badge-help">
                <Sparkles size={13} /> Today's Featured Spark
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--coral-500)', fontWeight: 700 }}>
                +{todaysSpark?.sparksReward} Sparks
              </span>
            </div>

            <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem' }}>
              {todaysSpark?.title}
            </h3>

            <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
              {todaysSpark?.description}
            </p>

            <div style={{
              background: 'var(--surface-elevated)',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-md)',
              padding: '0.75rem 1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.85rem',
              color: 'var(--forest-800)',
              marginBottom: '1rem'
            }}>
              <span>🌱</span>
              <span><strong>Visual Reward:</strong> {todaysSpark?.visualEffectDescription}</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              ~{todaysSpark?.estimatedTime}
            </span>
            <button
              onClick={() => setSelectedMission(todaysSpark)}
              className="btn btn-spark"
              style={{ padding: '0.5rem 1.15rem' }}
            >
              <span>{todaysSpark?.completed ? 'Review Spark' : 'Complete Spark'}</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>

        {/* Build on Someone's Idea Section */}
        {featuredChain && featuredRootNode && (
          <div className="loom-card" style={{
            background: 'linear-gradient(135deg, var(--surface-card) 0%, var(--surface-subtle) 100%)',
            border: '1.5px solid var(--border-light)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span className="badge badge-connect">
                  <GitBranch size={13} /> Build on Someone's Idea
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--forest-700)', fontWeight: 600 }}>
                  {Object.keys(featuredChain.nodes).length} Connected Insights
                </span>
              </div>

              <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem' }}>
                {featuredChain.title}
              </h3>

              <div style={{
                background: 'var(--surface-card)',
                borderLeft: '3px solid var(--forest-500)',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-sm)',
                marginBottom: '1.25rem',
                fontSize: '0.875rem'
              }}>
                <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
                  {featuredRootNode.authorAvatar} {featuredRootNode.authorName} asked:
                </div>
                <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic', margin: 0 }}>
                  "{featuredRootNode.content.length > 130 ? featuredRootNode.content.substring(0, 127) + '...' : featuredRootNode.content}"
                </p>
              </div>

              <div style={{ fontSize: '0.8rem', color: 'var(--forest-700)', marginBottom: '0.75rem' }}>
                🌍 {featuredChain.planetEffect}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
              <button
                onClick={() => onNavigateTab('chains')}
                className="btn btn-ghost btn-sm"
              >
                <span>View Full Tree</span>
              </button>
              <button
                onClick={() => setBranchingChain({ chain: featuredChain, parent: featuredRootNode })}
                className="btn btn-primary"
                style={{ padding: '0.5rem 1.15rem' }}
              >
                <GitBranch size={15} />
                <span>Add Branch (+35 ✨)</span>
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Shared Community Milestones */}
      <CommunityMilestones milestones={milestones} />

      {/* Recent Community Activity Feed Section */}
      <section style={{ marginBottom: '3.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.5rem' }}>Recent World Vitality Activity</h3>
            <p style={{ fontSize: '0.875rem', marginTop: '0.25rem' }}>
              Friendly actions happening across our shared biomes right now.
            </p>
          </div>
          <button onClick={() => onNavigateTab('feed')} className="btn btn-secondary btn-sm">
            <span>Explore All</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.25rem'
        }}>
          {activities.slice(0, 3).map(act => (
            <ActivityCard
              key={act.id}
              activity={act}
              onLike={onLikeActivity}
              onOpenChain={(chainId) => onNavigateTab('chains')}
            />
          ))}
        </div>
      </section>

      {/* How Loomora Works Explainer Banner */}
      <section style={{
        background: 'var(--surface-subtle)',
        border: '1px solid var(--border-light)',
        borderRadius: 'var(--radius-xl)',
        padding: '2rem 1.75rem',
        textAlign: 'center'
      }}>
        <h3 style={{ fontSize: '1.65rem', marginBottom: '0.5rem' }}>How Actions Nourish Loomora</h3>
        <p style={{ maxWidth: '600px', margin: '0 auto 1.75rem', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
          Unlike fleeting social media feeds, every contribution on Loomora leaves a permanent, beautiful mark on the planet.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.5rem',
          textAlign: 'left'
        }}>
          <div style={{ background: 'var(--surface-card)', padding: '1.25rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⚡ 1. Complete a Spark</div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Choose a quick daily mission in learning, art, empathy, or science. Your answer is stored in your personal garden.
            </p>
          </div>

          <div style={{ background: 'var(--surface-card)', padding: '1.25rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🌿 2. Build on Ideas</div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Extend someone else's seed question with an example, code tip, or translation. Watch your branch become part of a living Knowledge Tree.
            </p>
          </div>

          <div style={{ background: 'var(--surface-card)', padding: '1.25rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🌍 3. Watch It Grow</div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Completed actions trigger tree blooms, light crystal towers, and unlock collaborative island wonders.
            </p>
          </div>
        </div>
      </section>

      {/* Modals */}
      {selectedMission && (
        <MissionModal
          mission={selectedMission}
          onClose={() => setSelectedMission(null)}
          onComplete={onCompleteMission}
        />
      )}

      {branchingChain && (
        <AddBranchModal
          chain={branchingChain.chain}
          parentNode={branchingChain.parent}
          onClose={() => setBranchingChain(null)}
          onSubmitBranch={(chainId, parentId, title, content, type) => {
            onAddBranch(chainId, parentId, title, content, type);
            setBranchingChain(null);
          }}
        />
      )}
    </div>
  );
};
