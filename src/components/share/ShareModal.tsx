import React, { useState } from 'react';
import { Share2, Check, Download, Copy, ExternalLink, Sparkles, X } from 'lucide-react';
import { BuilderProfile } from '../../types/builder';

interface ShareModalProps {
  profile: BuilderProfile;
  imageDataUrl: string | null;
  shareText: string;
  onClose: () => void;
  onLaunchTwitter: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  profile,
  imageDataUrl,
  shareText,
  onClose,
  onLaunchTwitter,
}) => {
  const [copiedText, setCopiedText] = useState(false);

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2500);
    } catch (err) {
      console.warn('Copy text failed:', err);
    }
  };

  const handleDownloadImage = () => {
    if (!imageDataUrl) return;
    const downloadLink = document.createElement('a');
    downloadLink.download = `${(profile.builderId || 'HH-GOA').replace(/[^a-zA-Z0-9-]/g, '_')}_Pass.png`;
    downloadLink.href = imageDataUrl;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="share-modal-backdrop" onClick={onClose}>
      <div className="share-modal-card" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="share-modal-close" onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>

        <div className="share-modal-header">
          <div className="share-modal-badge">
            <Sparkles size={14} color="#f2c230" /> INSTANT SOCIAL SHARE
          </div>
          <h2 className="share-modal-title">Share #FrameInGoa to X</h2>
          <p className="share-modal-sub">
            Your custom Builder Pass is prepared and ready to post!
          </p>
        </div>

        {/* Card Thumbnail Preview & Status */}
        <div className="share-modal-body">
          {imageDataUrl && (
            <div className="share-card-preview-stage">
              <img src={imageDataUrl} alt="Builder Pass Preview" className="share-card-thumb" />
            </div>
          )}

          {/* Status checklist */}
          <div className="share-status-checklist">
            <div className="status-item done">
              <span className="status-icon"><Check size={14} /></span>
              <span><strong>Pass Image Saved</strong> (Downloaded & in Clipboard)</span>
            </div>
            <div className="status-item done">
              <span className="status-icon"><Check size={14} /></span>
              <span><strong>Tweet Message Beautified</strong> (Includes tech stack & fun fact)</span>
            </div>
          </div>

          {/* Twitter Upload Instruction Banner */}
          <div className="share-instructions-box">
            <div className="instructions-title">
              💡 How to attach your pass image on X (Twitter):
            </div>
            <ol className="instructions-list">
              <li>Click <strong>"Open X & Paste Image"</strong> below.</li>
              <li>When X opens, press <kbd className="shortcut-kbd">Cmd + V</kbd> (or <kbd className="shortcut-kbd">Ctrl + V</kbd>) in the tweet box to paste your pass image instantly!</li>
              <li>Or click the image icon on X and select the downloaded PNG file from your downloads folder.</li>
            </ol>
          </div>

          {/* Tweet Text Box Preview */}
          <div className="share-text-box">
            <div className="text-box-header">
              <span>PREVIEW TWEET TEXT</span>
              <button type="button" className="btn-copy-sm" onClick={handleCopyText}>
                {copiedText ? <Check size={12} /> : <Copy size={12} />}
                {copiedText ? 'Copied!' : 'Copy Text'}
              </button>
            </div>
            <pre className="text-box-content">{shareText}</pre>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="share-modal-actions">
          <button
            type="button"
            className="btn-launch-twitter"
            onClick={() => {
              onLaunchTwitter();
              onClose();
            }}
          >
            <Share2 size={18} />
            Open X & Paste Image (Cmd+V)
            <ExternalLink size={14} style={{ marginLeft: '4px' }} />
          </button>

          <button type="button" className="btn-download-pass-alt" onClick={handleDownloadImage}>
            <Download size={14} /> Re-download Pass PNG
          </button>
        </div>
      </div>
    </div>
  );
};
