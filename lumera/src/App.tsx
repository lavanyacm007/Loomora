import React, { useState, useEffect } from 'react';
import { 
  UserProfile, 
  PlanetZone, 
  Mission, 
  IdeaChain, 
  CommunityActivity, 
  CommunityMilestone, 
  IdeaChainNode, 
  MissionCategory 
} from './types';
import { storageService } from './services/storageService';
import { Navbar, NavTab } from './components/Navbar';
import { HomeView } from './components/Home/HomeView';
import { MissionsSection } from './components/Missions/MissionsSection';
import { IdeaChainsView } from './components/IdeaChains/IdeaChainsView';
import { ActivityFeed } from './components/Feed/ActivityFeed';
import { ProfileView } from './components/Profile/ProfileView';
import { WelcomeModal } from './components/Common/WelcomeModal';
import { NewChainModal } from './components/IdeaChains/NewChainModal';
import { Sparkles, Heart } from 'lucide-react';
import './App.css';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<NavTab>('home');
  const [userProfile, setUserProfile] = useState<UserProfile>(storageService.getUserProfile());
  const [zones, setZones] = useState<PlanetZone[]>(storageService.getPlanetZones());
  const [missions, setMissions] = useState<Mission[]>(storageService.getMissions());
  const [chains, setChains] = useState<IdeaChain[]>(storageService.getIdeaChains());
  const [activities, setActivities] = useState<CommunityActivity[]>(storageService.getActivities());
  const [milestones, setMilestones] = useState<CommunityMilestone[]>(storageService.getMilestones());
  
  // Modals & Toasts
  const [showWelcome, setShowWelcome] = useState(false);
  const [showNewChainModal, setShowNewChainModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    // Initialize default local state if empty
    storageService.init();
    refreshAllData();

    // Check if first-time visitor
    const hasVisited = localStorage.getItem('loomora_visited_v1');
    if (!hasVisited) {
      setShowWelcome(true);
      localStorage.setItem('loomora_visited_v1', 'true');
    }
  }, []);

  const refreshAllData = () => {
    setUserProfile(storageService.getUserProfile());
    setZones(storageService.getPlanetZones());
    setMissions(storageService.getMissions());
    setChains(storageService.getIdeaChains());
    setActivities(storageService.getActivities());
    setMilestones(storageService.getMilestones());
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Complete a Daily Spark mission
  const handleCompleteMission = (missionId: string, submissionText: string) => {
    try {
      const res = storageService.completeMission(missionId, submissionText);
      refreshAllData();
      triggerToast(`✨ Spark planted! +${res.mission.sparksReward} Sparks added to ${res.zone.name}`);
    } catch (err: any) {
      alert(err.message || 'Error completing mission');
    }
  };

  // Add a branch to an existing Idea Chain
  const handleAddBranch = (
    chainId: string,
    parentNodeId: string,
    title: string,
    content: string,
    type: IdeaChainNode['contributionType']
  ) => {
    try {
      storageService.addIdeaChainNode(chainId, parentNodeId, title, content, type);
      refreshAllData();
      triggerToast(`🌿 Branch sprouted! +35 Sparks earned for extending knowledge.`);
    } catch (err: any) {
      alert(err.message || 'Error adding branch');
    }
  };

  // Plant a new Idea Seed
  const handleCreateChain = (
    title: string,
    category: MissionCategory,
    content: string,
    initialTopic: string
  ) => {
    try {
      const newChain = storageService.createIdeaChain(title, category, content, initialTopic);
      refreshAllData();
      triggerToast(`🌱 Idea seed planted! +40 Sparks added to the living planet.`);
    } catch (err: any) {
      alert(err.message || 'Error planting idea seed');
    }
  };

  // Like/Applaud an activity
  const handleLikeActivity = (id: string) => {
    storageService.likeActivity(id);
    setActivities(storageService.getActivities());
  };

  // Update profile
  const handleUpdateProfile = (updated: Partial<UserProfile>) => {
    storageService.updateUserProfile(updated);
    setUserProfile(storageService.getUserProfile());
    triggerToast('Profile and preferences updated!');
  };

  // Reset to sample defaults
  const handleResetData = () => {
    storageService.resetToDefaults();
    refreshAllData();
    triggerToast('Demo data restored to initial state.');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        userProfile={userProfile}
        onOpenNewChain={() => setShowNewChainModal(true)}
        onOpenWelcome={() => setShowWelcome(true)}
      />

      {/* Main Content Area */}
      <main className="app-container" style={{ flexGrow: 1, paddingTop: '1.5rem' }}>
        {currentTab === 'home' && (
          <HomeView
            userProfile={userProfile}
            zones={zones}
            missions={missions}
            chains={chains}
            activities={activities}
            milestones={milestones}
            onCompleteMission={handleCompleteMission}
            onAddBranch={handleAddBranch}
            onNavigateTab={(tab) => {
              setCurrentTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenNewChain={() => setShowNewChainModal(true)}
            onOpenWelcome={() => setShowWelcome(true)}
            onLikeActivity={handleLikeActivity}
          />
        )}

        {currentTab === 'missions' && (
          <MissionsSection
            missions={missions}
            onCompleteMission={handleCompleteMission}
          />
        )}

        {currentTab === 'chains' && (
          <IdeaChainsView
            chains={chains}
            onAddBranch={handleAddBranch}
            onCreateChain={handleCreateChain}
          />
        )}

        {currentTab === 'feed' && (
          <ActivityFeed
            activities={activities}
            onLikeActivity={handleLikeActivity}
            onOpenChain={(chainId) => {
              setCurrentTab('chains');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentTab === 'profile' && (
          <ProfileView
            profile={userProfile}
            onUpdateProfile={handleUpdateProfile}
            onResetData={handleResetData}
          />
        )}
      </main>

      {/* Cozy Footer */}
      <footer style={{
        background: 'var(--surface-subtle)',
        borderTop: '1px solid var(--border-light)',
        padding: '2.5rem 0',
        marginTop: 'auto'
      }}>
        <div className="app-container" style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          fontSize: '0.875rem',
          color: 'var(--text-secondary)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.25rem' }}>🌍</span>
            <strong>Loomora</strong> — Small actions. One living world.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <button onClick={() => setCurrentTab('home')} className="btn btn-ghost btn-sm" style={{ padding: 0 }}>
              Living World
            </button>
            <button onClick={() => setCurrentTab('missions')} className="btn btn-ghost btn-sm" style={{ padding: 0 }}>
              Daily Sparks
            </button>
            <button onClick={() => setCurrentTab('chains')} className="btn btn-ghost btn-sm" style={{ padding: 0 }}>
              Idea Chains
            </button>
            <button onClick={() => setCurrentTab('feed')} className="btn btn-ghost btn-sm" style={{ padding: 0 }}>
              Community Explore
            </button>
            <button onClick={() => setShowWelcome(true)} className="btn btn-ghost btn-sm" style={{ padding: 0 }}>
              About Vision
            </button>
          </div>

          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Cozy collaborative prototype • Saved locally
          </div>
        </div>
      </footer>

      {/* Floating Spark Toast */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          background: 'var(--forest-800)',
          color: '#FFFFFF',
          padding: '0.9rem 1.4rem',
          borderRadius: 'var(--radius-full)',
          boxShadow: 'var(--shadow-xl)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
          fontSize: '0.925rem',
          fontWeight: 600,
          zIndex: 9999,
          animation: 'scaleUp 200ms ease-out'
        }}>
          <Sparkles size={18} color="var(--gold-400)" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Welcome & Tour Modal */}
      {showWelcome && (
        <WelcomeModal
          onClose={() => setShowWelcome(false)}
          onExploreMissions={() => {
            setCurrentTab('missions');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {/* New Idea Seed Modal */}
      {showNewChainModal && (
        <NewChainModal
          onClose={() => setShowNewChainModal(false)}
          onCreateChain={handleCreateChain}
        />
      )}
    </div>
  );
};

export default App;
