import React, { useState } from 'react';
import { UserProfile, Achievement } from '../../types';
import { Sparkles, Award, Heart, CheckCircle2, GitBranch, RefreshCw, UserCheck, Shield, Edit3 } from 'lucide-react';

interface ProfileViewProps {
  profile: UserProfile;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
  onResetData: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  profile,
  onUpdateProfile,
  onResetData
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(profile.name);
  const [tagline, setTagline] = useState(profile.tagline);
  const [selectedAvatar, setSelectedAvatar] = useState(profile.avatar);
  const [interestInput, setInterestInput] = useState('');
  const [interests, setInterests] = useState<string[]>(profile.interests);

  const avatarOptions = ['🌱', '🦉', '🌿', '🌊', '🍵', '🌺', '🎨', '🚀', '🛠️', '🦊', '✨', '🌍'];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      name: name.trim() || profile.name,
      tagline: tagline.trim() || profile.tagline,
      avatar: selectedAvatar,
      interests
    });
    setIsEditing(false);
  };

  const handleAddInterest = () => {
    if (interestInput.trim() && !interests.includes(interestInput.trim())) {
      setInterests([...interests, interestInput.trim()]);
      setInterestInput('');
    }
  };

  const handleRemoveInterest = (item: string) => {
    setInterests(interests.filter(i => i !== item));
  };

  const unlockedAchievements = profile.achievements.filter(a => a.unlocked);
  const lockedAchievements = profile.achievements.filter(a => !a.unlocked);

  return (
    <div style={{ paddingBottom: '3.5rem' }}>
      {/* Top Banner Profile Card */}
      <div 
        className="loom-card"
        style={{
          background: 'linear-gradient(135deg, var(--surface-card) 0%, var(--surface-subtle) 100%)',
          border: '1.5px solid var(--border-light)',
          borderRadius: 'var(--radius-xl)',
          padding: '2rem',
          marginBottom: '2rem',
          position: 'relative'
        }}
      >
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem'
        }}>
          {/* Avatar and Info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{
              width: '84px',
              height: '84px',
              borderRadius: '50%',
              background: 'var(--forest-100)',
              border: '3px solid var(--forest-300)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '3rem',
              boxShadow: 'var(--shadow-sm)'
            }}>
              {profile.avatar}
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <h2 style={{ margin: 0, fontSize: '1.85rem' }}>{profile.name}</h2>
                <span className="badge badge-learn">
                  Level {profile.level} Caretaker
                </span>
              </div>
              <p style={{ marginTop: '0.35rem', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                {profile.tagline}
              </p>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                {profile.joinedDate} • Member of the Loomora Global Garden
              </div>
            </div>
          </div>

          {/* Quick Edit button */}
          <div>
            <button 
              onClick={() => setIsEditing(!isEditing)} 
              className="btn btn-secondary"
            >
              <Edit3 size={15} />
              <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
            </button>
          </div>
        </div>

        {/* Edit Form */}
        {isEditing && (
          <form 
            onSubmit={handleSave} 
            style={{ 
              marginTop: '1.5rem', 
              paddingTop: '1.5rem', 
              borderTop: '1px solid var(--border-light)' 
            }}
          >
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                Choose Your Living Avatar:
              </label>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {avatarOptions.map(av => (
                  <button
                    key={av}
                    type="button"
                    onClick={() => setSelectedAvatar(av)}
                    style={{
                      fontSize: '1.6rem',
                      padding: '0.4rem 0.6rem',
                      borderRadius: 'var(--radius-md)',
                      border: selectedAvatar === av ? '2px solid var(--forest-600)' : '1px solid var(--border-light)',
                      background: selectedAvatar === av ? 'var(--forest-100)' : 'var(--surface-card)',
                      cursor: 'pointer'
                    }}
                  >
                    {av}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label 
                  htmlFor="profile-name-input"
                  style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}
                >
                  Display Name:
                </label>
                <input
                  id="profile-name-input"
                  type="text"
                  className="input-field"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={35}
                />
              </div>

              <div>
                <label 
                  htmlFor="profile-tagline-input"
                  style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}
                >
                  Personal Motto / Tagline:
                </label>
                <input
                  id="profile-tagline-input"
                  type="text"
                  className="input-field"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  maxLength={70}
                />
              </div>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label 
                htmlFor="profile-interest-input"
                style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}
              >
                Chosen Curiosity & Care Interests:
              </label>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <input
                  id="profile-interest-input"
                  type="text"
                  className="input-field"
                  placeholder="e.g. Astronomy, DIY Repair, Botany, Creative Writing..."
                  value={interestInput}
                  onChange={(e) => setInterestInput(e.target.value)}
                  style={{ maxWidth: '320px' }}
                />
                <button type="button" onClick={handleAddInterest} className="btn btn-secondary">
                  Add Interest
                </button>
              </div>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {interests.map(item => (
                  <span
                    key={item}
                    style={{
                      background: 'var(--surface-elevated)',
                      border: '1px solid var(--border-light)',
                      padding: '0.25rem 0.65rem',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.8rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem'
                    }}
                  >
                    <span>{item}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveInterest(item)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--coral-500)', fontWeight: 'bold' }}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </form>
        )}

        {/* Interests preview when not editing */}
        {!isEditing && (
          <div style={{ marginTop: '1.25rem', display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {profile.interests.map(item => (
              <span 
                key={item}
                style={{
                  background: 'var(--surface-card)',
                  border: '1px solid var(--border-light)',
                  padding: '0.25rem 0.75rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.8rem',
                  color: 'var(--forest-800)',
                  fontWeight: 500
                }}
              >
                🌿 {item}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Stats Counter Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.25rem',
        marginBottom: '2.5rem'
      }}>
        {/* Total Sparks */}
        <div className="loom-card" style={{ padding: '1.25rem', borderLeft: '4px solid var(--coral-500)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--coral-500)', marginBottom: '0.25rem', fontSize: '0.85rem', fontWeight: 600 }}>
            <Sparkles size={16} /> Total Sparks Earned
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            {profile.sparks} ✨
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            Non-monetary game vitality score
          </div>
        </div>

        {/* Missions Completed */}
        <div className="loom-card" style={{ padding: '1.25rem', borderLeft: '4px solid var(--forest-500)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--forest-600)', marginBottom: '0.25rem', fontSize: '0.85rem', fontWeight: 600 }}>
            <CheckCircle2 size={16} /> Sparks Completed
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            {profile.missionsCompletedCount}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            Real-world positive actions
          </div>
        </div>

        {/* Ideas Extended */}
        <div className="loom-card" style={{ padding: '1.25rem', borderLeft: '4px solid var(--sky-500)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--sky-600)', marginBottom: '0.25rem', fontSize: '0.85rem', fontWeight: 600 }}>
            <GitBranch size={16} /> Ideas Extended
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            {profile.ideasExtendedCount}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            Branches added to others' seeds
          </div>
        </div>

        {/* Applauds Received */}
        <div className="loom-card" style={{ padding: '1.25rem', borderLeft: '4px solid var(--lavender-500)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--lavender-600)', marginBottom: '0.25rem', fontSize: '0.85rem', fontWeight: 600 }}>
            <Heart size={16} /> Applauds Received
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            {profile.totalApplaudsReceived}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            Appreciation from community
          </div>
        </div>
      </div>

      {/* Achievements Gallery */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.45rem' }}>Achievements & Island Badges</h3>
            <p style={{ fontSize: '0.875rem', marginTop: '0.2rem' }}>
              Honoring thoughtful collaboration, curiosity, and original care.
            </p>
          </div>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--forest-700)' }}>
            {unlockedAchievements.length} of {profile.achievements.length} Unlocked
          </span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1rem'
        }}>
          {profile.achievements.map(ach => (
            <div
              key={ach.id}
              className="loom-card"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1.15rem',
                opacity: ach.unlocked ? 1 : 0.6,
                background: ach.unlocked ? 'var(--surface-card)' : 'var(--surface-subtle)',
                border: ach.unlocked ? '1px solid var(--border-light)' : '1px dashed var(--border-light)'
              }}
            >
              <div style={{
                fontSize: '2.2rem',
                width: '54px',
                height: '54px',
                borderRadius: '50%',
                background: ach.unlocked ? 'var(--surface-subtle)' : 'var(--surface-card)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                {ach.icon}
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <h4 style={{ margin: 0, fontSize: '1rem', color: ach.unlocked ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                    {ach.name}
                  </h4>
                  {ach.unlocked && (
                    <span style={{ fontSize: '0.7rem', color: 'var(--forest-600)', fontWeight: 700 }}>
                      ✓
                    </span>
                  )}
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.25rem', lineHeight: 1.4 }}>
                  {ach.description}
                </p>
                {ach.unlockedAt && (
                  <span style={{ fontSize: '0.725rem', color: 'var(--forest-700)', fontWeight: 500 }}>
                    Unlocked {ach.unlockedAt}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transparent System Notice & Reset Option */}
      <div style={{
        background: 'var(--surface-subtle)',
        border: '1px solid var(--border-light)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.25rem 1.5rem',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', maxWidth: '640px' }}>
          <Shield size={24} color="var(--forest-600)" style={{ flexShrink: 0 }} />
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            <strong>Transparent & Safe:</strong> Sparks and badges are non-monetary game rewards that celebrate real-world curiosity and collaborative helpfulness. Your data is stored safely in your local browser.
          </div>
        </div>

        <button
          onClick={() => {
            if (window.confirm('Reset sample data back to default state? This will restore original missions and sample trees.')) {
              onResetData();
            }
          }}
          className="btn btn-secondary btn-sm"
          style={{ color: 'var(--coral-600)' }}
        >
          <RefreshCw size={14} />
          <span>Reset Demo Data</span>
        </button>
      </div>
    </div>
  );
};
