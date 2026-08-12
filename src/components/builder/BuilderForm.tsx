import React from 'react';
import { BuilderProfile } from '../../types/builder';
import { BUILDER_CLASSES } from '../../data/builderClasses';
import { PhotoUploader } from './PhotoUploader';
import { Download, Share2, RefreshCw, Sparkles, Palette, Sun, Zap } from 'lucide-react';

interface BuilderFormProps {
  profile: BuilderProfile;
  onChange: (updated: Partial<BuilderProfile>) => void;
  onGenerateNewId: () => void;
  onDownload: () => void;
  onDownloadPDF?: () => void;
  onShare: () => void;
  isExporting?: boolean;
}

export const BuilderForm: React.FC<BuilderFormProps> = ({
  profile,
  onChange,
  onGenerateNewId,
  onDownload,
  onDownloadPDF,
  onShare,
  isExporting = false,
}) => {
  return (
    <div className="builder-form-card">
      <div className="form-header">
        <h2 className="form-title">
          <Sparkles className="title-icon" size={20} /> BUILD YOUR GOA IDENTITY
        </h2>
        <p className="form-subtitle">
          Personalize your details. Switch themes and watch your pass render live.
        </p>
      </div>

      <div className="form-body">
        {/* Template Theme Selector */}
        <div className="form-group">
          <label className="form-label">
            <Palette size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
            SELECT CARD THEME TEMPLATE
          </label>
          <div className="theme-toggle-group">
            <button
              type="button"
              className={`theme-toggle-btn ${profile.templateTheme === 'light' ? 'active' : ''}`}
              onClick={() => onChange({ templateTheme: 'light' })}
            >
              <Sun size={14} style={{ verticalAlign: 'middle', marginRight: '6px' }} /> Light Beach Passport
            </button>
            <button
              type="button"
              className={`theme-toggle-btn ${profile.templateTheme === 'neon' ? 'active' : ''}`}
              onClick={() => onChange({ templateTheme: 'neon' })}
            >
              <Zap size={14} style={{ verticalAlign: 'middle', marginRight: '6px' }} /> Neon Cyberpunk
            </button>
          </div>
        </div>

        {/* Photo Upload */}
        <PhotoUploader
          photo={profile.photo}
          onPhotoChange={(photoUrl) => onChange({ photo: photoUrl })}
        />

        {/* Full Name */}
        <div className="form-group">
          <label htmlFor="name-input" className="form-label">
            FULL NAME <span className="req">*</span>
          </label>
          <input
            id="name-input"
            type="text"
            className="form-input"
            value={profile.name}
            onChange={(e) => onChange({ name: e.target.value })}
            placeholder="e.g. Satoshi Nakamoto"
            maxLength={36}
          />
        </div>

        {/* Stack / Role */}
        <div className="form-group">
          <label htmlFor="role-input" className="form-label">
            ROLE / TITLE <span className="req">*</span>
          </label>
          <input
            id="role-input"
            type="text"
            className="form-input"
            value={profile.role}
            onChange={(e) => onChange({ role: e.target.value })}
            placeholder="e.g. Full Stack Developer"
            maxLength={32}
          />
        </div>

        {/* Tech Stack */}
        <div className="form-group">
          <label htmlFor="stack-input" className="form-label">
            TECH STACK <span className="req">*</span>
          </label>
          <input
            id="stack-input"
            type="text"
            className="form-input"
            value={profile.stack}
            onChange={(e) => onChange({ stack: e.target.value })}
            placeholder="e.g. React · Node.js · PostgreSQL · AWS"
          />
          <div className="input-hint">Separate technologies with dots or commas</div>
        </div>

        {/* Builder Class Dropdown */}
        <div className="form-group">
          <label htmlFor="class-select" className="form-label">
            BUILDER CLASS
          </label>
          <select
            id="class-select"
            className="form-select"
            value={profile.builderClass}
            onChange={(e) => onChange({ builderClass: e.target.value })}
          >
            {BUILDER_CLASSES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} — {c.description}
              </option>
            ))}
          </select>
        </div>

        {/* Coordinates / Beach Bag custom field */}
        <div className="form-group">
          <label htmlFor="coords-input" className="form-label">
            GOA COORDINATES
          </label>
          <input
            id="coords-input"
            type="text"
            className="form-input"
            value={profile.coordinates || '15.2993° N, 74.1240° E'}
            onChange={(e) => onChange({ coordinates: e.target.value })}
            placeholder="15.2993° N, 74.1240° E"
          />
        </div>

        {/* Builder ID Row */}
        <div className="form-group id-generator-row">
          <div className="id-info">
            <span className="id-label">GENERATED ID:</span>
            <span className="id-val">{profile.builderId}</span>
          </div>
          <button
            type="button"
            className="btn-regen-id"
            onClick={onGenerateNewId}
            title="Generate new ID"
          >
            <RefreshCw size={14} /> New ID
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="form-actions">
        <div style={{ display: 'flex', gap: '8px', width: '100%', marginBottom: '12px' }}>
          <button
            type="button"
            className="btn-primary-action download-btn"
            onClick={onDownload}
            disabled={isExporting}
            style={{ flex: 1, padding: '12px 10px', fontSize: '14px' }}
          >
            <Download size={18} />
            {isExporting ? 'Exporting...' : 'PNG (2160x2700)'}
          </button>

          {onDownloadPDF && (
            <button
              type="button"
              className="btn-primary-action download-btn"
              onClick={onDownloadPDF}
              disabled={isExporting}
              style={{ flex: 1, padding: '12px 10px', fontSize: '14px', background: 'var(--accent-red)' }}
            >
              <Download size={18} />
              4K PDF
            </button>
          )}
        </div>

        <button
          type="button"
          className="btn-secondary-action share-btn"
          onClick={onShare}
        >
          <Share2 size={18} />
          Share to X (#FrameInGoa)
        </button>
      </div>
    </div>
  );
};
