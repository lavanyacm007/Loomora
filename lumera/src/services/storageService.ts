import {
  Mission,
  PlanetZone,
  IdeaChain,
  IdeaChainNode,
  CommunityActivity,
  CommunityMilestone,
  UserProfile,
  PlanetZoneId
} from '../types';

const STORAGE_KEYS = {
  USER_PROFILE: 'loomora_user_profile_v1',
  MISSIONS: 'loomora_missions_v1',
  CHAINS: 'loomora_chains_v1',
  ZONES: 'loomora_zones_v1',
  ACTIVITIES: 'loomora_activities_v1',
  MILESTONES: 'loomora_milestones_v1',
  HAS_SEEDED: 'loomora_has_seeded_v1'
};

const DEFAULT_PROFILE: UserProfile = {
  id: 'user_local_1',
  name: 'Rowan Greenleaf',
  avatar: '🌱',
  tagline: 'Gardener of curiosity & quiet helper',
  interests: ['Nature & Ecology', 'Storytelling', 'Coding for Good', 'Mindful Living', 'Community Care'],
  sparks: 135,
  level: 3,
  missionsCompletedCount: 4,
  ideasCreatedCount: 2,
  ideasExtendedCount: 5,
  totalApplaudsReceived: 38,
  joinedDate: 'Joined this season',
  achievements: [
    {
      id: 'first_spark',
      name: 'Seed Sower',
      description: 'Completed your very first Daily Spark mission.',
      icon: '✨',
      unlocked: true,
      unlockedAt: 'Yesterday',
      category: 'spark'
    },
    {
      id: 'chain_builder',
      name: 'Knowledge Weaver',
      description: 'Extended someone else\'s idea with a useful example or explanation.',
      icon: '🌿',
      unlocked: true,
      unlockedAt: '2 days ago',
      category: 'chain'
    },
    {
      id: 'kindness_bloom',
      name: 'Heart of the Grove',
      description: 'Helped someone with friendly real-world advice.',
      icon: '🌸',
      unlocked: true,
      unlockedAt: '3 days ago',
      category: 'kindness'
    },
    {
      id: 'planet_guardian',
      name: 'Isle Awakener',
      description: 'Contributed enough sparks to unlock a new planet zone.',
      icon: '🌍',
      unlocked: false,
      category: 'world'
    },
    {
      id: 'polyglot_mind',
      name: 'Bridge Builder',
      description: 'Contributed across 3 different categories.',
      icon: '🌉',
      unlocked: true,
      unlockedAt: 'Today',
      category: 'chain'
    },
    {
      id: 'grand_canopy',
      name: 'Grand Canopy Architect',
      description: 'Help an Idea Chain reach a depth of 4 branches.',
      icon: '🌳',
      unlocked: false,
      category: 'world'
    }
  ]
};

const DEFAULT_ZONES: PlanetZone[] = [
  {
    id: 'knowledge-forest',
    name: 'Knowledge Forest',
    tagline: 'Where curiosity grows deep roots and tall branches',
    icon: '🌲',
    color: '#2D6A4F',
    accentColor: '#95D5B2',
    description: 'Nourished by learning, teaching, and sharing useful wisdom. Every helpful explanation plants an evergreen canopy.',
    level: 3,
    unlocked: true,
    sparksContributed: 420,
    landmarks: [
      {
        id: 'ancient-archive-tree',
        name: 'The Great Archive Oak',
        zoneId: 'knowledge-forest',
        growthStage: 3,
        maxGrowthStage: 4,
        description: 'A colossal luminescent oak where books and notes hang like golden leaves.',
        sparksRequired: 500,
        currentSparks: 420,
        contributorsCount: 48,
        x: 28,
        y: 42,
        icon: '🌳',
        unlocked: true
      },
      {
        id: 'firefly-reading-glade',
        name: 'Firefly Glade of Tips',
        zoneId: 'knowledge-forest',
        growthStage: 2,
        maxGrowthStage: 3,
        description: 'A cozy clearing with warm lanterns where concise tips spark gentle glows.',
        sparksRequired: 200,
        currentSparks: 200,
        contributorsCount: 29,
        x: 36,
        y: 35,
        icon: '✨',
        unlocked: true
      }
    ]
  },
  {
    id: 'creative-isles',
    name: 'Creative Isles',
    tagline: 'Floating archipelagos shaped by imagination',
    icon: '🎨',
    color: '#7B2CBF',
    accentColor: '#E0AAFF',
    description: 'Sculpted by art, poetic words, music, and design crafts. Creative contributions float as crystal formations.',
    level: 2,
    unlocked: true,
    sparksContributed: 310,
    landmarks: [
      {
        id: 'prism-sculpture-peak',
        name: 'Prism Sculpture Cliffs',
        zoneId: 'creative-isles',
        growthStage: 2,
        maxGrowthStage: 4,
        description: 'Crystal prisms reflecting pastel rainbows across the atmosphere.',
        sparksRequired: 400,
        currentSparks: 310,
        contributorsCount: 34,
        x: 72,
        y: 38,
        icon: '💎',
        unlocked: true
      },
      {
        id: 'harmonic-bell-tower',
        name: 'Harmonic Windchime Spire',
        zoneId: 'creative-isles',
        growthStage: 1,
        maxGrowthStage: 3,
        description: 'Resonates soft ambient chords whenever a creative idea is continued.',
        sparksRequired: 250,
        currentSparks: 180,
        contributorsCount: 19,
        x: 80,
        y: 50,
        icon: '🔔',
        unlocked: true
      }
    ]
  },
  {
    id: 'kindness-garden',
    name: 'Kindness Garden',
    tagline: 'Blooming terrace nurtured by empathy & daily care',
    icon: '🌸',
    color: '#E07A5F',
    accentColor: '#F4F1DE',
    description: 'Watered whenever people encourage each other, share safety tips, or check in on a neighbor.',
    level: 3,
    unlocked: true,
    sparksContributed: 560,
    landmarks: [
      {
        id: 'fountain-of-wishes',
        name: 'Lotus Spring of Care',
        zoneId: 'kindness-garden',
        growthStage: 3,
        maxGrowthStage: 4,
        description: 'A shimmering spring that flows with warm light and gentle soothing water.',
        sparksRequired: 600,
        currentSparks: 560,
        contributorsCount: 62,
        x: 52,
        y: 65,
        icon: '🪷',
        unlocked: true
      },
      {
        id: 'lantern-bridge',
        name: 'The Bridgeway of Encouragement',
        zoneId: 'kindness-garden',
        growthStage: 3,
        maxGrowthStage: 3,
        description: 'Arching wooden bridge lined with warm paper lanterns that glow with friendly words.',
        sparksRequired: 300,
        currentSparks: 300,
        contributorsCount: 41,
        x: 42,
        y: 58,
        icon: '🏮',
        unlocked: true
      }
    ]
  },
  {
    id: 'discovery-mountains',
    name: 'Discovery Mountains',
    tagline: 'Misty crags of puzzles, questions and wonder',
    icon: '⛰️',
    color: '#1D3557',
    accentColor: '#A8DADC',
    description: 'Built by curious questions, solved mysteries, and scientific discoveries.',
    level: 2,
    unlocked: true,
    sparksContributed: 280,
    landmarks: [
      {
        id: 'starlight-observatory',
        name: 'Starlight Dome',
        zoneId: 'discovery-mountains',
        growthStage: 2,
        maxGrowthStage: 4,
        description: 'A brass telescope dome tracking collaborative discoveries across the night sky.',
        sparksRequired: 350,
        currentSparks: 280,
        contributorsCount: 22,
        x: 50,
        y: 22,
        icon: '🔭',
        unlocked: true
      }
    ]
  },
  {
    id: 'community-city',
    name: 'Community City',
    tagline: 'The bustling commons where shared dreams unite',
    icon: '🏛️',
    color: '#D4A373',
    accentColor: '#CCD5AE',
    description: 'Evolves as group challenges are conquered and communal milestones are reached together.',
    level: 1,
    unlocked: true,
    sparksContributed: 390,
    landmarks: [
      {
        id: 'shared-solar-canopy',
        name: 'The Solar Commons Pavilion',
        zoneId: 'community-city',
        growthStage: 1,
        maxGrowthStage: 4,
        description: 'An open-air wooden agora collecting community clean energy and fellowship.',
        sparksRequired: 500,
        currentSparks: 390,
        contributorsCount: 55,
        x: 62,
        y: 72,
        icon: '☀️',
        unlocked: true
      }
    ]
  }
];

const DEFAULT_MISSIONS: Mission[] = [
  {
    id: 'mission_1',
    title: 'Explain Gravity in Plain Words',
    description: 'How would you explain gravity to an 8-year-old child using a friendly everyday metaphor? Keep it simple, vivid, and memorable.',
    category: 'learn',
    difficulty: 'Easy',
    estimatedTime: '3-4 mins',
    sparksReward: 25,
    planetZone: 'knowledge-forest',
    visualEffectDescription: 'Grows a golden bough on the Great Archive Oak',
    completed: true,
    completedAt: 'Yesterday',
    userSubmission: 'Think of the Sun and Earth like bowling balls placed on a stretchy trampoline. They make a bowl shape that pulls rolling marbles toward them!'
  },
  {
    id: 'mission_2',
    title: 'Tiny Act of Neighborhood Care',
    description: 'Share one small, practical kindness you did or noticed today—like holding a door, watering a dry public plant, or greeting someone who looked lonely.',
    category: 'help',
    difficulty: 'Easy',
    estimatedTime: '2-3 mins',
    sparksReward: 20,
    planetZone: 'kindness-garden',
    visualEffectDescription: 'Lights a new lantern on the Bridgeway of Encouragement',
    completed: false
  },
  {
    id: 'mission_3',
    title: 'A Micro-Poem of Ordinary Wonder',
    description: 'Write a 3 to 4 line poem celebrating an overlooked everyday object (a kettle, an old wool sweater, morning sunlight through blinds).',
    category: 'create',
    difficulty: 'Explorer',
    estimatedTime: '5 mins',
    sparksReward: 30,
    planetZone: 'creative-isles',
    visualEffectDescription: 'Polishes a lilac crystal prism on Prism Sculpture Cliffs',
    completed: false
  },
  {
    id: 'mission_4',
    title: 'Curious Science Riddle',
    description: 'Ask or answer an intriguing question about how nature works (e.g. Why don\'t sleeping birds fall out of trees? Why does fresh bread smell sweet?).',
    category: 'discover',
    difficulty: 'Explorer',
    estimatedTime: '4 mins',
    sparksReward: 30,
    planetZone: 'discovery-mountains',
    visualEffectDescription: 'Aligns the telescope lens at the Starlight Observatory',
    completed: false
  },
  {
    id: 'mission_5',
    title: 'Connect & Extend an Existing Seed',
    description: 'Pick an open idea from the Idea Chain and add a real-world tip, code snippet, translation, or beginner-friendly tip to help it grow.',
    category: 'connect',
    difficulty: 'Explorer',
    estimatedTime: '5-8 mins',
    sparksReward: 35,
    planetZone: 'knowledge-forest',
    visualEffectDescription: 'Sprouts a new branching branch in the Knowledge Tree',
    completed: false
  },
  {
    id: 'mission_6',
    title: 'Community Eco-Pledge',
    description: 'Document a simple step you took to reduce waste or preserve water today. Your pledge feeds the communal Solar Commons.',
    category: 'community',
    difficulty: 'Master',
    estimatedTime: '5 mins',
    sparksReward: 40,
    planetZone: 'community-city',
    visualEffectDescription: 'Adds a solar leaf to the Solar Commons Pavilion',
    completed: false
  }
];

const DEFAULT_CHAINS: IdeaChain[] = [
  {
    id: 'chain_gravity_analogy',
    title: 'How to Explain Gravity to an 8-Year-Old',
    category: 'learn',
    initialTopic: 'Physics concepts simplified for young curious minds',
    rootNodeId: 'node_grav_1',
    totalSparks: 140,
    planetEffect: 'Nourishes the Archive Oak roots with cosmic stardust',
    updatedAt: '2 hours ago',
    nodes: {
      'node_grav_1': {
        id: 'node_grav_1',
        chainId: 'chain_gravity_analogy',
        parentId: null,
        authorName: 'Dr. Clara Moss',
        authorAvatar: '🦉',
        title: 'The Trampoline & Bowling Ball Metaphor',
        content: 'Imagine space as a giant, soft rubber trampoline stretched flat. When you place a heavy melon in the middle, it sinks down. If you gently roll a marble across, it curves into the hollow. That curve is gravity pulling things in!',
        category: 'learn',
        contributionType: 'seed',
        createdAt: '3 days ago',
        likes: 24,
        childrenIds: ['node_grav_2', 'node_grav_3']
      },
      'node_grav_2': {
        id: 'node_grav_2',
        chainId: 'chain_gravity_analogy',
        parentId: 'node_grav_1',
        authorName: 'Leo the Maker',
        authorAvatar: '🛠️',
        title: 'At-Home Kitchen Experiment with Bedsheet',
        content: 'You can do this right now with your kid! Have two people hold the four corners of a bedsheet taut. Drop an orange in the middle, then roll ping pong balls around the rim. Kids immediately understand why satellites orbit instead of crashing straight down!',
        category: 'create',
        contributionType: 'example',
        createdAt: '2 days ago',
        likes: 19,
        childrenIds: ['node_grav_4']
      },
      'node_grav_3': {
        id: 'node_grav_3',
        chainId: 'chain_gravity_analogy',
        parentId: 'node_grav_1',
        authorName: 'Sofia Ramos',
        authorAvatar: '🌿',
        title: 'Versión en Español para Familias Bilingües',
        content: '¡Para compartir con niños hispanohablantes! Imagina que el espacio es una sábana elástica. Al colocar algo pesado en el centro, se forma un pozo donde caen suavemente las canicas. ¡Así la Tierra nos mantiene con los pies en el suelo!',
        category: 'connect',
        contributionType: 'translation',
        createdAt: '1 day ago',
        likes: 15,
        childrenIds: []
      },
      'node_grav_4': {
        id: 'node_grav_4',
        chainId: 'chain_gravity_analogy',
        parentId: 'node_grav_2',
        authorName: 'Rowan Greenleaf',
        authorAvatar: '🌱',
        title: 'Why Astronauts Float (Common Misconception)',
        content: 'A helpful addition: explain that astronauts on the Space Station aren\'t away from gravity! They are falling toward Earth at the exact same speed they are zooming forward, so they are in endless freefall—like a never-ending gentle roller coaster hill.',
        category: 'learn',
        contributionType: 'expansion',
        createdAt: '5 hours ago',
        likes: 11,
        childrenIds: []
      }
    }
  },
  {
    id: 'chain_gentle_evenings',
    title: 'Gentle Decompression Rituals for Exhausted Evenings',
    category: 'help',
    initialTopic: 'Restorative, screen-light habits to transition out of frantic workdays',
    rootNodeId: 'node_eve_1',
    totalSparks: 115,
    planetEffect: 'Floats glowing water lilies down the Kindness Lotus Spring',
    updatedAt: '4 hours ago',
    nodes: {
      'node_eve_1': {
        id: 'node_eve_1',
        chainId: 'chain_gentle_evenings',
        parentId: null,
        authorName: 'Hana Wellness',
        authorAvatar: '🍵',
        title: 'The 10-Minute Lighting Transition',
        content: 'At 8:30 PM, turn off overhead ceiling lights and switch solely to low warm lamps or candlelight. This optical cue signals your suprachiasmatic nucleus that the hunt is over and it is safe to unwind.',
        category: 'help',
        contributionType: 'seed',
        createdAt: '2 days ago',
        likes: 31,
        childrenIds: ['node_eve_2', 'node_eve_3']
      },
      'node_eve_2': {
        id: 'node_eve_2',
        chainId: 'chain_gentle_evenings',
        parentId: 'node_eve_1',
        authorName: 'Mateo Sound',
        authorAvatar: '🎧',
        title: 'Lo-Fi Rain on Leaves soundscape trick',
        content: 'Keep a small analog radio or offline speaker by the bed that plays soft field recordings of evening rain. Avoid using phones where notifications can intrude.',
        category: 'create',
        contributionType: 'expansion',
        createdAt: '1 day ago',
        likes: 18,
        childrenIds: []
      },
      'node_eve_3': {
        id: 'node_eve_3',
        chainId: 'chain_gentle_evenings',
        parentId: 'node_eve_1',
        authorName: 'Grandma Ellen',
        authorAvatar: '👵',
        title: 'Cinnamon & Chamomile Warm Mug',
        content: 'Steep whole chamomile flowers with half a cinnamon stick. Just holding the warm ceramic mug with both hands for 3 slow breaths settles nervous system tension remarkably well.',
        category: 'help',
        contributionType: 'example',
        createdAt: '18 hours ago',
        likes: 22,
        childrenIds: []
      }
    }
  },
  {
    id: 'chain_bird_feeder',
    title: 'Bird-Safe Winter Feeder from Upcycled Materials',
    category: 'community',
    initialTopic: 'Building safe local habitat supports with zero plastic waste',
    rootNodeId: 'node_bird_1',
    totalSparks: 95,
    planetEffect: 'Constructs the wooden rafters of the Solar Commons',
    updatedAt: 'Yesterday',
    nodes: {
      'node_bird_1': {
        id: 'node_bird_1',
        chainId: 'chain_bird_feeder',
        parentId: null,
        authorName: 'Artisan Jack',
        authorAvatar: '🪵',
        title: 'Untreated Pine & Wire Mesh Feeder',
        content: 'Never use chemically pressure-treated timber or glues near bird seeds. Use dry fallen cedar or untreated pine scraps with non-toxic natural beeswax seal on outer walls only.',
        category: 'community',
        contributionType: 'seed',
        createdAt: '3 days ago',
        likes: 16,
        childrenIds: ['node_bird_2']
      },
      'node_bird_2': {
        id: 'node_bird_2',
        chainId: 'chain_bird_feeder',
        parentId: 'node_bird_1',
        authorName: 'Dr. Priya Ornithology',
        authorAvatar: '🪶',
        title: 'Safety Tip: Mesh Sizing for Songbirds',
        content: 'Critical addition: Ensure wire mesh openings are either tiny (under 4mm for thistle seeds) or large enough so tiny bird feet cannot get entangled. Clean once a week with mild white vinegar to prevent avian illness.',
        category: 'learn',
        contributionType: 'expansion',
        createdAt: '2 days ago',
        likes: 27,
        childrenIds: []
      }
    }
  }
];

const DEFAULT_ACTIVITIES: CommunityActivity[] = [
  {
    id: 'act_1',
    type: 'chain_extended',
    authorName: 'Rowan Greenleaf (You)',
    authorAvatar: '🌱',
    title: 'Extended: How to Explain Gravity to an 8-Year-Old',
    detail: 'Added branch: "Why Astronauts Float (Common Misconception)" — orbital freefall explanation.',
    category: 'learn',
    timestamp: '5 hours ago',
    sparksEarned: 35,
    likes: 11,
    chainId: 'chain_gravity_analogy',
    planetZone: 'knowledge-forest'
  },
  {
    id: 'act_2',
    type: 'mission_completed',
    authorName: 'Amina Nour',
    authorAvatar: '🌺',
    title: 'Completed Daily Spark: Tiny Act of Neighborhood Care',
    detail: '"Helped our elderly neighbor Mrs. Gable carry heavy groceries up the porch steps and watered her hydrangeas."',
    category: 'help',
    timestamp: '7 hours ago',
    sparksEarned: 20,
    likes: 18,
    planetZone: 'kindness-garden'
  },
  {
    id: 'act_3',
    type: 'chain_created',
    authorName: 'Hana Wellness',
    authorAvatar: '🍵',
    title: 'Planted new Idea Seed: Gentle Decompression Rituals',
    detail: 'Started an open knowledge chain for restorative screen-light transition habits.',
    category: 'help',
    timestamp: '2 days ago',
    sparksEarned: 40,
    likes: 31,
    chainId: 'chain_gentle_evenings',
    planetZone: 'kindness-garden'
  },
  {
    id: 'act_4',
    type: 'mission_completed',
    authorName: 'Koa Fisher',
    authorAvatar: '🌊',
    title: 'Completed Daily Spark: A Micro-Poem of Ordinary Wonder',
    detail: '"Morning kettle hums / Silver steam kisses the chill / First light in the cup."',
    category: 'create',
    timestamp: '1 day ago',
    sparksEarned: 30,
    likes: 26,
    planetZone: 'creative-isles'
  },
  {
    id: 'act_5',
    type: 'milestone_reached',
    authorName: 'Community of Loomora',
    authorAvatar: '🌍',
    title: 'Landmark Evolved: Lotus Spring of Care reached Level 3!',
    detail: 'Over 60 contributors united in kindness unlocked the glowing water lilies on the central island.',
    category: 'community',
    timestamp: '2 days ago',
    sparksEarned: 50,
    likes: 49,
    planetZone: 'kindness-garden'
  }
];

const DEFAULT_MILESTONES: CommunityMilestone[] = [
  {
    id: 'milestone_solar_canopy',
    title: 'The Solar Commons Pavilion',
    description: 'A communal wooden pavilion that powers the island lantern grid when completed.',
    targetSparks: 500,
    currentSparks: 390,
    unlocked: false,
    rewardDescription: 'Unlocks illuminated evening pathways across all 5 zones.',
    zoneId: 'community-city'
  },
  {
    id: 'milestone_bioluminescent_river',
    title: 'Bioluminescent Stream of Wonder',
    description: 'Nurtured by collaborative idea extensions between diverse makers.',
    targetSparks: 600,
    currentSparks: 560,
    unlocked: false,
    rewardDescription: 'Sprouts floating lotus crystals with gentle evening shimmer.',
    zoneId: 'kindness-garden'
  },
  {
    id: 'milestone_great_library',
    title: 'The Starlight Astrolabe',
    description: 'A celestial dome tracking every collaborative idea chain created by the community.',
    targetSparks: 400,
    currentSparks: 380,
    unlocked: false,
    rewardDescription: 'Draws constellation lines connecting ideas to starry night sky.',
    zoneId: 'discovery-mountains'
  }
];

export const storageService = {
  init() {
    if (!localStorage.getItem(STORAGE_KEYS.HAS_SEEDED)) {
      this.resetToDefaults();
    }
  },

  resetToDefaults() {
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(DEFAULT_PROFILE));
    localStorage.setItem(STORAGE_KEYS.MISSIONS, JSON.stringify(DEFAULT_MISSIONS));
    localStorage.setItem(STORAGE_KEYS.CHAINS, JSON.stringify(DEFAULT_CHAINS));
    localStorage.setItem(STORAGE_KEYS.ZONES, JSON.stringify(DEFAULT_ZONES));
    localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(DEFAULT_ACTIVITIES));
    localStorage.setItem(STORAGE_KEYS.MILESTONES, JSON.stringify(DEFAULT_MILESTONES));
    localStorage.setItem(STORAGE_KEYS.HAS_SEEDED, 'true');
  },

  getUserProfile(): UserProfile {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
      return data ? JSON.parse(data) : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  },

  updateUserProfile(profile: Partial<UserProfile>): UserProfile {
    const current = this.getUserProfile();
    const updated = { ...current, ...profile };
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(updated));
    return updated;
  },

  getMissions(): Mission[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.MISSIONS);
      return data ? JSON.parse(data) : DEFAULT_MISSIONS;
    } catch {
      return DEFAULT_MISSIONS;
    }
  },

  completeMission(missionId: string, submission: string): { mission: Mission; user: UserProfile; zone: PlanetZone } {
    const missions = this.getMissions();
    const missionIndex = missions.findIndex(m => m.id === missionId);
    if (missionIndex === -1) throw new Error('Mission not found');

    const mission = missions[missionIndex];
    if (mission.completed) throw new Error('Mission already completed');

    mission.completed = true;
    mission.completedAt = 'Just now';
    mission.userSubmission = submission;
    missions[missionIndex] = mission;
    localStorage.setItem(STORAGE_KEYS.MISSIONS, JSON.stringify(missions));

    // Update user profile
    const user = this.getUserProfile();
    user.sparks += mission.sparksReward;
    user.missionsCompletedCount += 1;
    if (user.missionsCompletedCount >= 5 && user.level < 4) {
      user.level = 4;
    }
    this.updateUserProfile(user);

    // Update Planet Zone
    const zones = this.getPlanetZones();
    const zoneIndex = zones.findIndex(z => z.id === mission.planetZone);
    let zone = zones[zoneIndex];
    if (zone) {
      zone.sparksContributed += mission.sparksReward;
      if (zone.landmarks.length > 0) {
        zone.landmarks[0].currentSparks += mission.sparksReward;
        if (zone.landmarks[0].currentSparks >= zone.landmarks[0].sparksRequired && zone.landmarks[0].growthStage < zone.landmarks[0].maxGrowthStage) {
          zone.landmarks[0].growthStage += 1;
        }
      }
      zones[zoneIndex] = zone;
      localStorage.setItem(STORAGE_KEYS.ZONES, JSON.stringify(zones));
    }

    // Add activity
    this.addActivity({
      type: 'mission_completed',
      authorName: user.name + ' (You)',
      authorAvatar: user.avatar,
      title: `Completed Daily Spark: ${mission.title}`,
      detail: submission.length > 120 ? `"${submission.substring(0, 117)}..."` : `"${submission}"`,
      category: mission.category,
      sparksEarned: mission.sparksReward,
      planetZone: mission.planetZone
    });

    return { mission, user, zone };
  },

  getIdeaChains(): IdeaChain[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CHAINS);
      return data ? JSON.parse(data) : DEFAULT_CHAINS;
    } catch {
      return DEFAULT_CHAINS;
    }
  },

  getIdeaChainById(chainId: string): IdeaChain | undefined {
    return this.getIdeaChains().find(c => c.id === chainId);
  },

  isDuplicateContent(text: string, existingTexts: string[]): boolean {
    const clean = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
    const cleanTarget = clean(text);
    if (!cleanTarget) return true;
    return existingTexts.some(ext => {
      const cExt = clean(ext);
      return cExt === cleanTarget || (cExt.length > 20 && (cExt.includes(cleanTarget) || cleanTarget.includes(cExt)));
    });
  },

  createIdeaChain(title: string, category: Mission['category'], rootContent: string, initialTopic: string): IdeaChain {
    const chains = this.getIdeaChains();
    const user = this.getUserProfile();

    const chainId = `chain_${Date.now()}`;
    const rootNodeId = `node_${Date.now()}`;

    const rootNode: IdeaChainNode = {
      id: rootNodeId,
      chainId,
      parentId: null,
      authorName: user.name + ' (You)',
      authorAvatar: user.avatar,
      title,
      content: rootContent,
      category,
      contributionType: 'seed',
      createdAt: 'Just now',
      likes: 1,
      childrenIds: []
    };

    const newChain: IdeaChain = {
      id: chainId,
      title,
      category,
      initialTopic,
      rootNodeId,
      nodes: {
        [rootNodeId]: rootNode
      },
      totalSparks: 40,
      planetEffect: `Sprouts a glowing seed in ${category === 'learn' ? 'Knowledge Forest' : category === 'create' ? 'Creative Isles' : 'Kindness Garden'}`,
      updatedAt: 'Just now'
    };

    chains.unshift(newChain);
    localStorage.setItem(STORAGE_KEYS.CHAINS, JSON.stringify(chains));

    // Update user stats
    user.sparks += 40;
    user.ideasCreatedCount += 1;
    this.updateUserProfile(user);

    // Map category to zone
    const zoneMap: Record<string, PlanetZoneId> = {
      learn: 'knowledge-forest',
      create: 'creative-isles',
      help: 'kindness-garden',
      discover: 'discovery-mountains',
      connect: 'knowledge-forest',
      community: 'community-city'
    };
    const zoneId = zoneMap[category] || 'knowledge-forest';

    this.addActivity({
      type: 'chain_created',
      authorName: user.name + ' (You)',
      authorAvatar: user.avatar,
      title: `Planted new Idea Seed: ${title}`,
      detail: rootContent.length > 120 ? `"${rootContent.substring(0, 117)}..."` : `"${rootContent}"`,
      category,
      sparksEarned: 40,
      chainId,
      planetZone: zoneId
    });

    return newChain;
  },

  addIdeaChainNode(
    chainId: string,
    parentNodeId: string,
    title: string,
    content: string,
    contributionType: IdeaChainNode['contributionType']
  ): { chain: IdeaChain; newNode: IdeaChainNode } {
    const chains = this.getIdeaChains();
    const chainIndex = chains.findIndex(c => c.id === chainId);
    if (chainIndex === -1) throw new Error('Idea Chain not found');

    const chain = chains[chainIndex];
    const parentNode = chain.nodes[parentNodeId];
    if (!parentNode) throw new Error('Parent contribution not found');

    // Duplicate check across chain
    const existingContents = Object.values(chain.nodes).map(n => n.content);
    if (this.isDuplicateContent(content, existingContents)) {
      throw new Error('This contribution is too similar to an existing node in this chain. Please add original thoughts, examples or extensions!');
    }

    const user = this.getUserProfile();
    const newNodeId = `node_${Date.now()}`;

    const newNode: IdeaChainNode = {
      id: newNodeId,
      chainId,
      parentId: parentNodeId,
      authorName: user.name + ' (You)',
      authorAvatar: user.avatar,
      title,
      content,
      category: parentNode.category,
      contributionType,
      createdAt: 'Just now',
      likes: 1,
      childrenIds: []
    };

    chain.nodes[newNodeId] = newNode;
    parentNode.childrenIds.push(newNodeId);
    chain.totalSparks += 35;
    chain.updatedAt = 'Just now';

    chains[chainIndex] = chain;
    localStorage.setItem(STORAGE_KEYS.CHAINS, JSON.stringify(chains));

    // Update user
    user.sparks += 35;
    user.ideasExtendedCount += 1;
    this.updateUserProfile(user);

    // Map category to zone
    const zoneMap: Record<string, PlanetZoneId> = {
      learn: 'knowledge-forest',
      create: 'creative-isles',
      help: 'kindness-garden',
      discover: 'discovery-mountains',
      connect: 'knowledge-forest',
      community: 'community-city'
    };
    const zoneId = zoneMap[parentNode.category] || 'knowledge-forest';

    this.addActivity({
      type: 'chain_extended',
      authorName: user.name + ' (You)',
      authorAvatar: user.avatar,
      title: `Extended: ${chain.title}`,
      detail: `Added branch: "${title}" — ${content.length > 80 ? content.substring(0, 77) + '...' : content}`,
      category: parentNode.category,
      sparksEarned: 35,
      chainId,
      planetZone: zoneId
    });

    return { chain, newNode };
  },

  getPlanetZones(): PlanetZone[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ZONES);
      return data ? JSON.parse(data) : DEFAULT_ZONES;
    } catch {
      return DEFAULT_ZONES;
    }
  },

  getActivities(): CommunityActivity[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ACTIVITIES);
      return data ? JSON.parse(data) : DEFAULT_ACTIVITIES;
    } catch {
      return DEFAULT_ACTIVITIES;
    }
  },

  addActivity(act: Omit<CommunityActivity, 'id' | 'timestamp' | 'likes'>): CommunityActivity {
    const activities = this.getActivities();
    const newAct: CommunityActivity = {
      ...act,
      id: `act_${Date.now()}`,
      timestamp: 'Just now',
      likes: 1
    };
    activities.unshift(newAct);
    // Keep max 40
    if (activities.length > 40) activities.pop();
    localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(activities));
    return newAct;
  },

  likeActivity(id: string): { likes: number; liked: boolean } {
    const activities = this.getActivities();
    const act = activities.find(a => a.id === id);
    if (!act) return { likes: 0, liked: false };

    if (act.likedByMe) {
      act.likes -= 1;
      act.likedByMe = false;
    } else {
      act.likes += 1;
      act.likedByMe = true;
    }
    localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(activities));
    return { likes: act.likes, liked: !!act.likedByMe };
  },

  getMilestones(): CommunityMilestone[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.MILESTONES);
      return data ? JSON.parse(data) : DEFAULT_MILESTONES;
    } catch {
      return DEFAULT_MILESTONES;
    }
  }
};
