export type MissionCategory = 'learn' | 'create' | 'help' | 'discover' | 'connect' | 'community';

export type MissionDifficulty = 'Easy' | 'Explorer' | 'Master';

export interface Mission {
  id: string;
  title: string;
  description: string;
  category: MissionCategory;
  difficulty: MissionDifficulty;
  estimatedTime: string;
  sparksReward: number;
  planetZone: PlanetZoneId;
  visualEffectDescription: string;
  completed: boolean;
  completedAt?: string;
  userSubmission?: string;
}

export type PlanetZoneId = 'knowledge-forest' | 'creative-isles' | 'kindness-garden' | 'discovery-mountains' | 'community-city';

export interface PlanetZone {
  id: PlanetZoneId;
  name: string;
  tagline: string;
  icon: string;
  color: string;
  accentColor: string;
  description: string;
  level: number;
  unlocked: boolean;
  sparksContributed: number;
  landmarks: PlanetLandmark[];
}

export interface PlanetLandmark {
  id: string;
  name: string;
  zoneId: PlanetZoneId;
  growthStage: number; // 1 to 4
  maxGrowthStage: number;
  description: string;
  sparksRequired: number;
  currentSparks: number;
  contributorsCount: number;
  x: number; // SVG coordinate percentage
  y: number; // SVG coordinate percentage
  icon: string;
  unlocked: boolean;
}

export interface IdeaChainNode {
  id: string;
  chainId: string;
  parentId: string | null;
  authorName: string;
  authorAvatar: string;
  title: string;
  content: string;
  category: MissionCategory;
  contributionType: 'seed' | 'example' | 'expansion' | 'explanation' | 'translation' | 'creative-spin';
  createdAt: string;
  likes: number;
  likedByMe?: boolean;
  childrenIds: string[];
}

export interface IdeaChain {
  id: string;
  title: string;
  category: MissionCategory;
  initialTopic: string;
  rootNodeId: string;
  nodes: Record<string, IdeaChainNode>;
  totalSparks: number;
  planetEffect: string;
  updatedAt: string;
}

export interface CommunityActivity {
  id: string;
  type: 'mission_completed' | 'chain_created' | 'chain_extended' | 'milestone_reached';
  authorName: string;
  authorAvatar: string;
  title: string;
  detail: string;
  category: MissionCategory;
  timestamp: string;
  sparksEarned: number;
  likes: number;
  likedByMe?: boolean;
  chainId?: string;
  planetZone: PlanetZoneId;
}

export interface CommunityMilestone {
  id: string;
  title: string;
  description: string;
  targetSparks: number;
  currentSparks: number;
  unlocked: boolean;
  rewardDescription: string;
  zoneId: PlanetZoneId;
}

export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  tagline: string;
  interests: string[];
  sparks: number;
  level: number;
  missionsCompletedCount: number;
  ideasCreatedCount: number;
  ideasExtendedCount: number;
  totalApplaudsReceived: number;
  achievements: Achievement[];
  joinedDate: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  category: 'spark' | 'chain' | 'kindness' | 'world';
}
