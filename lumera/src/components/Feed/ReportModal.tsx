import React, { useState } from 'react';
import { CommunityActivity } from '../../types';
import { ShieldAlert, CheckCircle2, X } from 'lucide-react';

interface ReportModalProps {
  activity: CommunityActivity;
  onClose: () => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({ activity, onClose }) => {
  const [reason, setReason] = useState('inappropriate');
  const [details, setDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 1800);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '480px' }}
      >
        <button 
          onClick={onClose}
          className="btn btn-ghost btn-sm"
          style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', padding: '0.4rem', borderRadius: '50%' }}
        >
          <X size={18} />
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '1.5rem 0.5rem' }}>
            <CheckCircle2 size={44} color="var(--forest-600)" style={{ margin: '0 auto 0.75rem' }} />
            <h3 style={{ fontSize: '1.35rem', color: 'var(--forest-800)' }}>Thank You for Keeping Loomora Safe</h3>
            <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
              Our friendly community stewardship team has received your report and will review this contribution promptly.
            </p>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
              <ShieldAlert size={24} color="var(--coral-500)" />
              <h3 style={{ fontSize: '1.3rem', margin: 0 }}>Community Safety Report</h3>
            </div>

            <p style={{ fontSize: '0.875rem', marginBottom: '1.25rem' }}>
              Loomora is designed to be welcoming, wholesome, and safe for all ages. Let us know why this content requires review:
            </p>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                  Reason:
                </label>
                <select
                  className="input-field"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                >
                  <option value="inappropriate">Unkind, offensive, or inappropriate content</option>
                  <option value="privacy">Exposing personal contact or location info</option>
                  <option value="spam">Spam, advertisement, or duplicate text</option>
                  <option value="harm">Unsafe or dangerous advice</option>
                  <option value="other">Other concern</option>
                </select>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                  Additional notes (optional):
                </label>
                <textarea
                  className="textarea-field"
                  placeholder="Explain briefly what seems concerning..."
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  rows={3}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                <button type="button" onClick={onClose} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-spark">
                  Submit Report
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
