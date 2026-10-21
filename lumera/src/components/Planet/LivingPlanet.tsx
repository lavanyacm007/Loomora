import React, { useState } from 'react';
import { PlanetZone, PlanetLandmark, PlanetZoneId } from '../../types';
import { ZoneDetailModal } from './ZoneDetailModal';
import { Sparkles, Sun, Sunset, Moon, Eye, Info, Compass } from 'lucide-react';

interface LivingPlanetProps {
  zones: PlanetZone[];
  totalSparks: number;
  userSparks: number;
  onSelectZoneForMission?: (zoneId: string) => void;
}

export type TimeOfDay = 'day' | 'sunset' | 'starlight';

export const LivingPlanet: React.FC<LivingPlanetProps> = ({
  zones,
  totalSparks,
  userSparks,
  onSelectZoneForMission
}) => {
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('day');
  const [selectedZoneFilter, setSelectedZoneFilter] = useState<string>('all');
  const [inspectingLandmark, setInspectingLandmark] = useState<{ landmark: PlanetLandmark; zone: PlanetZone } | null>(null);
  const [hoveredLandmark, setHoveredLandmark] = useState<PlanetLandmark | null>(null);

  // Sync starlight mode class on body
  const handleTimeChange = (time: TimeOfDay) => {
    setTimeOfDay(time);
    if (time === 'starlight') {
      document.body.classList.add('starlight-mode');
    } else {
      document.body.classList.remove('starlight-mode');
    }
  };

  // Find landmarks
  const allLandmarks = zones.flatMap(z => z.landmarks.map(l => ({ landmark: l, zone: z })));

  // Sky and water gradient colors based on timeOfDay
  const skyGradients = {
    day: {
      bg: 'linear-gradient(180deg, #EBF5FB 0%, #FAF7F0 85%)',
      islandShadow: 'rgba(27, 67, 50, 0.12)',
      waterColor: '#70D6FF',
      waterDeep: '#38A3A5',
      grassLight: '#74C69D',
      grassMid: '#52B788',
      grassDeep: '#2D6A4F',
      mountainColor: '#8E9AAF',
      mountainSnow: '#F8F9FA'
    },
    sunset: {
      bg: 'linear-gradient(180deg, #FDE2D2 0%, #FFE5D9 40%, #FAF0E6 100%)',
      islandShadow: 'rgba(92, 42, 29, 0.16)',
      waterColor: '#F48C6A',
      waterDeep: '#D8572A',
      grassLight: '#95D5B2',
      grassMid: '#40916C',
      grassDeep: '#1B4332',
      mountainColor: '#9A6B88',
      mountainSnow: '#FFD7BA'
    },
    starlight: {
      bg: 'linear-gradient(180deg, #09111E 0%, #111D2E 55%, #18273B 100%)',
      islandShadow: 'rgba(0, 0, 0, 0.45)',
      waterColor: '#00B4D8',
      waterDeep: '#0077B6',
      grassLight: '#2D6A4F',
      grassMid: '#1B4332',
      grassDeep: '#0D281E',
      mountainColor: '#344E66',
      mountainSnow: '#90E0EF'
    }
  };

  const currentTheme = skyGradients[timeOfDay];

  // Calculate overall planet level
  const islandLevel = totalSparks > 2500 ? 4 : totalSparks > 1500 ? 3 : totalSparks > 800 ? 2 : 1;
  const levelNames = ['Seedling Haven', 'Blooming Isle', 'Harmonic Biosphere', 'Cosmic Sanctuary'];

  return (
    <div className="living-planet-container" style={{ position: 'relative', width: '100%', marginBottom: '2rem' }}>
      {/* Top Header info and Atmosphere Toggles */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        marginBottom: '1rem',
        padding: '0 0.25rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <span className="badge badge-learn" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
              <Compass size={13} /> Level {islandLevel}: {levelNames[islandLevel - 1]}
            </span>
            <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
              Interactive Collaborative World
            </span>
          </div>
          <h2 style={{ fontSize: '1.65rem', margin: 0 }}>
            The Living Isle of Loomora
          </h2>
        </div>

        {/* Atmosphere & Mood Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--surface-card)', padding: '0.35rem 0.5rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-xs)' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', paddingLeft: '0.4rem', textTransform: 'uppercase' }}>
            Ambiance:
          </span>
          <button 
            onClick={() => handleTimeChange('day')}
            className={`btn btn-sm ${timeOfDay === 'day' ? 'btn-primary' : 'btn-ghost'}`}
            style={{ padding: '0.3rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.8rem' }}
            title="Sunny Day"
          >
            <Sun size={14} /> Day
          </button>
          <button 
            onClick={() => handleTimeChange('sunset')}
            className={`btn btn-sm ${timeOfDay === 'sunset' ? 'btn-spark' : 'btn-ghost'}`}
            style={{ padding: '0.3rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.8rem' }}
            title="Golden Sunset"
          >
            <Sunset size={14} /> Sunset
          </button>
          <button 
            onClick={() => handleTimeChange('starlight')}
            className={`btn btn-sm ${timeOfDay === 'starlight' ? 'btn-primary' : 'btn-ghost'}`}
            style={{ 
              padding: '0.3rem 0.75rem', 
              borderRadius: 'var(--radius-full)', 
              fontSize: '0.8rem',
              background: timeOfDay === 'starlight' ? '#3A86FF' : 'transparent'
            }}
            title="Starlight Night (Bioluminescent Glow)"
          >
            <Moon size={14} /> Starlight
          </button>
        </div>
      </div>

      {/* Zone Quick-Filter Pills */}
      <div style={{ 
        display: 'flex', 
        gap: '0.5rem', 
        overflowX: 'auto', 
        paddingBottom: '0.75rem',
        scrollbarWidth: 'none',
        marginBottom: '0.5rem'
      }}>
        <button
          onClick={() => setSelectedZoneFilter('all')}
          className={`btn btn-sm ${selectedZoneFilter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ borderRadius: 'var(--radius-full)', padding: '0.35rem 0.85rem' }}
        >
          🌐 Whole World
        </button>
        {zones.map(z => (
          <button
            key={z.id}
            onClick={() => setSelectedZoneFilter(z.id)}
            className={`btn btn-sm ${selectedZoneFilter === z.id ? 'btn-primary' : 'btn-secondary'}`}
            style={{ 
              borderRadius: 'var(--radius-full)', 
              padding: '0.35rem 0.85rem',
              borderColor: selectedZoneFilter === z.id ? 'transparent' : 'var(--border-light)'
            }}
          >
            <span>{z.icon}</span>
            <span>{z.name.split(' ')[0]}</span>
          </button>
        ))}
      </div>

      {/* Main Interactive World Canvas Card */}
      <div 
        className="loom-card"
        style={{
          padding: '0',
          overflow: 'hidden',
          background: currentTheme.bg,
          border: '1.5px solid var(--border-light)',
          position: 'relative',
          minHeight: '440px',
          boxShadow: 'var(--shadow-md)',
          borderRadius: 'var(--radius-xl)',
          transition: 'background 500ms ease'
        }}
      >
        {/* Floating Clouds & Ambience Overlay */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          {/* Animated SVG Clouds */}
          <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
            <g className="animate-float" style={{ opacity: timeOfDay === 'starlight' ? 0.25 : 0.75 }}>
              <ellipse cx="15%" cy="16%" rx="60" ry="20" fill={timeOfDay === 'sunset' ? '#FFE3D8' : '#FFFFFF'} />
              <ellipse cx="18%" cy="13%" rx="40" ry="24" fill={timeOfDay === 'sunset' ? '#FFE3D8' : '#FFFFFF'} />
            </g>
            <g className="animate-float" style={{ animationDelay: '-2s', opacity: timeOfDay === 'starlight' ? 0.2 : 0.65 }}>
              <ellipse cx="82%" cy="22%" rx="75" ry="24" fill={timeOfDay === 'sunset' ? '#FFD8C7' : '#FFFFFF'} />
              <ellipse cx="85%" cy="18%" rx="50" ry="26" fill={timeOfDay === 'sunset' ? '#FFD8C7' : '#FFFFFF'} />
            </g>
            {timeOfDay === 'starlight' && (
              <>
                {/* Constellation stars */}
                <circle cx="10%" cy="10%" r="2" fill="#FFFFFF" opacity="0.8" />
                <circle cx="25%" cy="15%" r="1.5" fill="#FFE5D9" opacity="0.9" />
                <circle cx="45%" cy="8%" r="2" fill="#BAE6FD" opacity="0.7" />
                <circle cx="70%" cy="12%" r="2.5" fill="#FFFFFF" opacity="0.9" />
                <circle cx="90%" cy="14%" r="1.5" fill="#FDE68A" opacity="0.8" />
                <circle cx="85%" cy="28%" r="2" fill="#C77DFF" opacity="0.75" />
                {/* Connecting Constellation line */}
                <path d="M 10 10 L 25 15 L 45 8" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="3,3" />
                <path d="M 70 12 L 90 14 L 85 28" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="3,3" />
              </>
            )}
          </svg>
        </div>

        {/* Interactive Isometric Island World SVG */}
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg 
            viewBox="0 0 1000 620" 
            style={{ width: '100%', height: 'auto', maxHeight: '560px', display: 'block' }}
          >
            <defs>
              {/* Island Gradient */}
              <linearGradient id="islandTopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={currentTheme.grassLight} />
                <stop offset="60%" stopColor={currentTheme.grassMid} />
                <stop offset="100%" stopColor={currentTheme.grassDeep} />
              </linearGradient>

              {/* Island Cliff Strata */}
              <linearGradient id="cliffGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#4A3B32" />
                <stop offset="40%" stopColor="#382B24" />
                <stop offset="100%" stopColor="#1E1713" />
              </linearGradient>

              {/* Water River Gradient */}
              <linearGradient id="riverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={currentTheme.waterColor} />
                <stop offset="100%" stopColor={currentTheme.waterDeep} />
              </linearGradient>

              {/* Glow filter for starlight mode */}
              <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Island Floating Base Shadow */}
            <ellipse 
              cx="500" 
              cy="530" 
              rx="360" 
              ry="75" 
              fill={currentTheme.islandShadow} 
            />

            {/* Cliff underside / rock strata */}
            <path 
              d="M 180 370 
                 Q 260 490, 500 500 
                 Q 740 490, 820 370 
                 Q 800 420, 680 460 
                 Q 500 480, 320 460 
                 Q 200 420, 180 370 Z" 
              fill="url(#cliffGrad)" 
            />
            {/* Rock cracks and strata highlights */}
            <path d="M 280 410 L 320 460" stroke="#5E4B40" strokeWidth="3" opacity="0.6" />
            <path d="M 450 430 L 480 480" stroke="#5E4B40" strokeWidth="4" opacity="0.7" />
            <path d="M 640 415 L 670 455" stroke="#5E4B40" strokeWidth="3" opacity="0.6" />

            {/* Main Island Plateau */}
            <path 
              d="M 170 340 
                 C 150 250, 310 180, 480 180 
                 C 680 180, 830 240, 830 330 
                 C 830 410, 690 465, 500 465 
                 C 300 465, 170 410, 170 340 Z" 
              fill="url(#islandTopGrad)" 
            />

            {/* Shoreline Beach Rim */}
            <path 
              d="M 175 350 
                 C 160 380, 270 445, 490 455 
                 C 710 465, 820 400, 825 345 
                 C 810 425, 680 460, 490 460 
                 C 310 460, 190 425, 175 350 Z" 
              fill={timeOfDay === 'sunset' ? '#F4A261' : '#E9D8A6'} 
              opacity="0.85" 
            />

            {/* Meandering Bioluminescent Stream / River from Mountains to Kindness Garden */}
            <path 
              d="M 500 230 
                 Q 460 280, 485 330 
                 Q 510 380, 470 425" 
              fill="none" 
              stroke="url(#riverGrad)" 
              strokeWidth="14" 
              strokeLinecap="round" 
              filter={timeOfDay === 'starlight' ? 'url(#glowEffect)' : undefined}
            />
            {/* River Shimmer lines */}
            <path 
              d="M 495 240 Q 465 285, 485 330" 
              fill="none" 
              stroke="#FFFFFF" 
              strokeWidth="2.5" 
              opacity={timeOfDay === 'starlight' ? '0.9' : '0.5'} 
              strokeDasharray="8 6" 
            />

            {/* ZONE 1: DISCOVERY MOUNTAINS (North Peak) */}
            <g 
              style={{ 
                opacity: selectedZoneFilter === 'all' || selectedZoneFilter === 'discovery-mountains' ? 1 : 0.25, 
                transition: 'opacity 300ms' 
              }}
            >
              {/* Back Mountain Peaks */}
              <polygon points="460,220 510,130 560,220" fill={currentTheme.mountainColor} />
              <polygon points="485,155 510,130 535,155" fill={currentTheme.mountainSnow} />
              
              <polygon points="530,230 580,150 630,230" fill={currentTheme.mountainColor} opacity="0.85" />
              <polygon points="560,175 580,150 600,175" fill={currentTheme.mountainSnow} />

              {/* Starlight Observatory Dome Landmark */}
              <g 
                onClick={() => {
                  const item = allLandmarks.find(l => l.landmark.id === 'starlight-observatory');
                  if (item) setInspectingLandmark(item);
                }}
                onMouseEnter={() => {
                  const item = allLandmarks.find(l => l.landmark.id === 'starlight-observatory');
                  if (item) setHoveredLandmark(item.landmark);
                }}
                onMouseLeave={() => setHoveredLandmark(null)}
                style={{ cursor: 'pointer' }}
              >
                {/* Dome Base */}
                <ellipse cx="505" cy="200" rx="22" ry="10" fill="#264653" />
                <path d="M 487 200 A 18 18 0 0 1 523 200 Z" fill="#E76F51" />
                <path d="M 493 194 A 12 12 0 0 1 517 194 Z" fill="#F4A261" />
                {/* Brass Telescope Tube */}
                <line x1="505" y1="190" x2="525" y2="168" stroke="#E9C46A" strokeWidth="5" strokeLinecap="round" />
                <circle cx="525" cy="168" r="4" fill="#3A86FF" filter={timeOfDay === 'starlight' ? 'url(#glowEffect)' : undefined} />
                
                {/* Sparkle Ping */}
                <circle cx="505" cy="180" r="14" fill="none" stroke="#E9C46A" strokeWidth="1" strokeDasharray="3 3" className="animate-pulse-glow" />
              </g>
            </g>

            {/* ZONE 2: KNOWLEDGE FOREST (North-West / Left Grove) */}
            <g 
              style={{ 
                opacity: selectedZoneFilter === 'all' || selectedZoneFilter === 'knowledge-forest' ? 1 : 0.25, 
                transition: 'opacity 300ms' 
              }}
            >
              {/* Surrounding Pine & Evergreen Trees */}
              <g className="animate-sway">
                {/* Tree 1 */}
                <polygon points="250,330 270,270 290,330" fill="#1B4332" />
                <polygon points="255,300 270,250 285,300" fill="#2D6A4F" />
                {/* Tree 2 */}
                <polygon points="310,340 330,285 350,340" fill="#1B4332" />
                <polygon points="315,310 330,265 345,310" fill="#40916C" />
                {/* Tree 3 */}
                <polygon points="220,350 240,300 260,350" fill="#142F23" />
              </g>

              {/* The Great Archive Oak (Interactive Landmark) */}
              <g 
                onClick={() => {
                  const item = allLandmarks.find(l => l.landmark.id === 'ancient-archive-tree');
                  if (item) setInspectingLandmark(item);
                }}
                onMouseEnter={() => {
                  const item = allLandmarks.find(l => l.landmark.id === 'ancient-archive-tree');
                  if (item) setHoveredLandmark(item.landmark);
                }}
                onMouseLeave={() => setHoveredLandmark(null)}
                style={{ cursor: 'pointer' }}
              >
                {/* Trunk */}
                <path d="M 285 345 Q 295 315, 290 280 Q 280 310, 275 345 Z" fill="#582F0E" />
                {/* Lush Oak Canopy Layers */}
                <circle cx="288" cy="270" r="32" fill="#2D6A4F" />
                <circle cx="270" cy="260" r="26" fill="#40916C" />
                <circle cx="308" cy="262" r="26" fill="#52B788" />
                <circle cx="288" cy="245" r="24" fill="#74C69D" />

                {/* Golden Leaves / Books dangling with glow */}
                <circle cx="275" cy="275" r="4" fill="#FDE68A" filter={timeOfDay === 'starlight' ? 'url(#glowEffect)' : undefined} />
                <circle cx="300" cy="280" r="5" fill="#F4A261" filter={timeOfDay === 'starlight' ? 'url(#glowEffect)' : undefined} />
                <circle cx="288" cy="240" r="4.5" fill="#FDE68A" filter={timeOfDay === 'starlight' ? 'url(#glowEffect)' : undefined} />
                
                {/* Landmark Pulse ring */}
                <circle cx="288" cy="265" r="38" fill="none" stroke="#74C69D" strokeWidth="1.5" strokeDasharray="4 4" className="animate-pulse-glow" />
              </g>

              {/* Firefly Glade Lights */}
              <circle cx="350" cy="320" r="3" fill="#E9C46A" className="animate-pulse-glow" />
              <circle cx="370" cy="305" r="2.5" fill="#E9C46A" className="animate-pulse-glow" style={{ animationDelay: '-1s' }} />
            </g>

            {/* ZONE 3: CREATIVE ISLES (Floating Right Rock Archipelago) */}
            <g 
              style={{ 
                opacity: selectedZoneFilter === 'all' || selectedZoneFilter === 'creative-isles' ? 1 : 0.25, 
                transition: 'opacity 300ms' 
              }}
            >
              {/* Separate Floating Isle */}
              <g className="animate-float" style={{ animationDuration: '6s' }}>
                {/* Underside */}
                <path d="M 680 320 Q 730 380, 770 340 L 760 300 Q 710 300, 680 320 Z" fill="#3D2645" />
                {/* Isle Top Grass */}
                <ellipse cx="725" cy="305" rx="45" ry="20" fill="#7B2CBF" opacity="0.8" />
                <ellipse cx="725" cy="303" rx="42" ry="18" fill="url(#islandTopGrad)" />

                {/* Prism Sculpture Peak Landmark */}
                <g 
                  onClick={() => {
                    const item = allLandmarks.find(l => l.landmark.id === 'prism-sculpture-peak');
                    if (item) setInspectingLandmark(item);
                  }}
                  onMouseEnter={() => {
                    const item = allLandmarks.find(l => l.landmark.id === 'prism-sculpture-peak');
                    if (item) setHoveredLandmark(item.landmark);
                  }}
                  onMouseLeave={() => setHoveredLandmark(null)}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Crystal Shards */}
                  <polygon points="720,298 726,245 733,298" fill="#C77DFF" filter="url(#glowEffect)" />
                  <polygon points="710,298 715,260 722,298" fill="#E0AAFF" />
                  <polygon points="730,298 738,265 744,298" fill="#9D4EDD" />
                  {/* Floating light particles */}
                  <circle cx="726" cy="235" r="4" fill="#FFFFFF" filter="url(#glowEffect)" />
                </g>

                {/* Harmonic Windchime Spire Landmark */}
                <g 
                  onClick={() => {
                    const item = allLandmarks.find(l => l.landmark.id === 'harmonic-bell-tower');
                    if (item) setInspectingLandmark(item);
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <line x1="755" y1="300" x2="755" y2="275" stroke="#E9C46A" strokeWidth="2" />
                  <circle cx="755" cy="275" r="4" fill="#F4A261" />
                  <line x1="752" y1="279" x2="752" y2="288" stroke="#E0AAFF" strokeWidth="1" />
                  <line x1="758" y1="279" x2="758" y2="288" stroke="#E0AAFF" strokeWidth="1" />
                </g>

                {/* Energy Bridge from main island to floating rock */}
                <path 
                  d="M 645 340 Q 665 320, 685 315" 
                  stroke="#C77DFF" 
                  strokeWidth="3" 
                  strokeDasharray="4 4" 
                  fill="none" 
                  opacity="0.8" 
                />
              </g>
            </g>

            {/* ZONE 4: KINDNESS GARDEN (South Center Spring & Lantern Bridge) */}
            <g 
              style={{ 
                opacity: selectedZoneFilter === 'all' || selectedZoneFilter === 'kindness-garden' ? 1 : 0.25, 
                transition: 'opacity 300ms' 
              }}
            >
              {/* Lotus Spring of Care Basin */}
              <g 
                onClick={() => {
                  const item = allLandmarks.find(l => l.landmark.id === 'fountain-of-wishes');
                  if (item) setInspectingLandmark(item);
                }}
                onMouseEnter={() => {
                  const item = allLandmarks.find(l => l.landmark.id === 'fountain-of-wishes');
                  if (item) setHoveredLandmark(item.landmark);
                }}
                onMouseLeave={() => setHoveredLandmark(null)}
                style={{ cursor: 'pointer' }}
              >
                {/* Water Spring Pool */}
                <ellipse cx="480" cy="405" rx="35" ry="18" fill="url(#riverGrad)" filter={timeOfDay === 'starlight' ? 'url(#glowEffect)' : undefined} />
                
                {/* Concentric Water Ripples */}
                <ellipse cx="480" cy="405" rx="25" ry="12" fill="none" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.6" className="animate-pulse-glow" />
                
                {/* Lotus Flowers Floating */}
                <circle cx="475" cy="402" r="5" fill="#FFB703" />
                <circle cx="475" cy="402" r="8" fill="#FB8500" opacity="0.4" />
                
                <circle cx="495" cy="408" r="4.5" fill="#E07A5F" />
                <circle cx="465" cy="410" r="4" fill="#F48C6A" />

                {/* Flower Petals */}
                <ellipse cx="475" cy="399" rx="3" ry="5" fill="#FFE5D9" />
                <ellipse cx="472" cy="404" rx="4" ry="2.5" fill="#FFE5D9" />
                <ellipse cx="478" cy="404" rx="4" ry="2.5" fill="#FFE5D9" />
              </g>

              {/* Lantern Bridge Landmark */}
              <g 
                onClick={() => {
                  const item = allLandmarks.find(l => l.landmark.id === 'lantern-bridge');
                  if (item) setInspectingLandmark(item);
                }}
                onMouseEnter={() => {
                  const item = allLandmarks.find(l => l.landmark.id === 'lantern-bridge');
                  if (item) setHoveredLandmark(item.landmark);
                }}
                onMouseLeave={() => setHoveredLandmark(null)}
                style={{ cursor: 'pointer' }}
              >
                {/* Arching Wooden Bridge */}
                <path d="M 435 375 Q 465 355, 495 375" fill="none" stroke="#6F4E37" strokeWidth="7" strokeLinecap="round" />
                <path d="M 440 375 Q 465 360, 490 375" fill="none" stroke="#A67B5B" strokeWidth="3" />
                
                {/* Glowing Lantern Posts */}
                <circle cx="445" cy="365" r="4" fill="#F77F00" filter={timeOfDay === 'starlight' ? 'url(#glowEffect)' : undefined} />
                <circle cx="485" cy="365" r="4" fill="#F77F00" filter={timeOfDay === 'starlight' ? 'url(#glowEffect)' : undefined} />
              </g>
            </g>

            {/* ZONE 5: COMMUNITY CITY (South-West / Solar Pavilion) */}
            <g 
              style={{ 
                opacity: selectedZoneFilter === 'all' || selectedZoneFilter === 'community-city' ? 1 : 0.25, 
                transition: 'opacity 300ms' 
              }}
            >
              {/* The Solar Commons Pavilion Landmark */}
              <g 
                onClick={() => {
                  const item = allLandmarks.find(l => l.landmark.id === 'shared-solar-canopy');
                  if (item) setInspectingLandmark(item);
                }}
                onMouseEnter={() => {
                  const item = allLandmarks.find(l => l.landmark.id === 'shared-solar-canopy');
                  if (item) setHoveredLandmark(item.landmark);
                }}
                onMouseLeave={() => setHoveredLandmark(null)}
                style={{ cursor: 'pointer' }}
              >
                {/* Wooden Agora Columns */}
                <rect x="580" y="380" width="5" height="22" fill="#8B5E3C" />
                <rect x="615" y="380" width="5" height="22" fill="#8B5E3C" />
                <rect x="640" y="385" width="5" height="22" fill="#8B5E3C" />
                {/* Solar Canopy Roof */}
                <polygon points="570,380 610,360 655,385" fill="#E9C46A" />
                <polygon points="580,378 610,363 645,383" fill="#D4A373" />
                {/* Sun Crystal Jewel on Peak */}
                <circle cx="610" cy="358" r="5" fill="#E76F51" filter={timeOfDay === 'starlight' ? 'url(#glowEffect)' : undefined} />
                
                {/* Pulse Ring */}
                <circle cx="610" cy="375" r="28" fill="none" stroke="#E9C46A" strokeWidth="1.5" strokeDasharray="3 3" className="animate-pulse-glow" />
              </g>
            </g>

            {/* Interactive Pins / Beacon Badges Over Landmarks */}
            {allLandmarks.map(({ landmark, zone }) => {
              const isMatch = selectedZoneFilter === 'all' || selectedZoneFilter === zone.id;
              if (!isMatch) return null;

              // Convert % coords to SVG 1000x620 coords
              const posX = (landmark.x / 100) * 1000;
              const posY = (landmark.y / 100) * 620;

              return (
                <g 
                  key={landmark.id}
                  transform={`translate(${posX}, ${posY})`}
                  onClick={() => setInspectingLandmark({ landmark, zone })}
                  onMouseEnter={() => setHoveredLandmark(landmark)}
                  onMouseLeave={() => setHoveredLandmark(null)}
                  style={{ cursor: 'pointer' }}
                  className="animate-float"
                >
                  {/* Pin Drop Shadow */}
                  <ellipse cx="0" cy="8" rx="10" ry="3.5" fill="rgba(0,0,0,0.2)" />
                  {/* Glowing Pin Bubble */}
                  <circle cx="0" cy="0" r="14" fill="#FFFFFF" stroke={zone.color} strokeWidth="2.5" />
                  <text 
                    x="0" 
                    y="5" 
                    textAnchor="middle" 
                    fontSize="13"
                    style={{ userSelect: 'none' }}
                  >
                    {landmark.icon}
                  </text>
                  {/* Little growth star badge */}
                  <circle cx="10" cy="-8" r="6" fill="var(--gold-500)" stroke="#FFFFFF" strokeWidth="1.5" />
                  <text x="10" y="-5" textAnchor="middle" fontSize="8" fill="#FFFFFF" fontWeight="bold">
                    {landmark.growthStage}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Hover / Quick Info Banner Overlay at Bottom */}
        <div style={{
          position: 'absolute',
          bottom: '1rem',
          left: '1rem',
          right: '1rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.75rem',
          background: 'rgba(255, 255, 255, 0.88)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          padding: '0.75rem 1.25rem',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-light)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          {hoveredLandmark ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <span style={{ fontSize: '1.4rem' }}>{hoveredLandmark.icon}</span>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {hoveredLandmark.name} • Stage {hoveredLandmark.growthStage}/{hoveredLandmark.maxGrowthStage}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  {hoveredLandmark.description}
                </div>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              <Info size={16} color="var(--forest-600)" />
              <span>
                <strong>Click any landmark</strong> to inspect vitality, contributors, or nourish it with Sparks.
              </span>
            </div>
          )}

          {/* Quick Vitality Counter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--forest-700)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Sparkles size={14} color="var(--gold-500)" />
              {totalSparks} Global Sparks
            </span>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--coral-500)' }}>
              ✨ {userSparks} Your Sparks
            </span>
          </div>
        </div>
      </div>

      {/* Landmark Inspector Modal */}
      {inspectingLandmark && (
        <ZoneDetailModal
          landmark={inspectingLandmark.landmark}
          zone={inspectingLandmark.zone}
          onClose={() => setInspectingLandmark(null)}
          onContributeToZone={(zoneId) => {
            setInspectingLandmark(null);
            if (onSelectZoneForMission) onSelectZoneForMission(zoneId);
          }}
        />
      )}
    </div>
  );
};
