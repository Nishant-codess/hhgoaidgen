import { useRef, useState } from 'react';
import { BuilderProfile } from './types/builder';
import { generateBuilderId, generateSerialNo } from './lib/generateId';
import { BuilderPass } from './components/pass/BuilderPass';
import { BuilderForm } from './components/builder/BuilderForm';
import { exportPassAsPng, exportPassAsPDF } from './lib/exportPass';
import { formatShareText, shareToX } from './lib/shareToX';
import { ShareModal } from './components/share/ShareModal';
import { Download, FileText, Share2 } from 'lucide-react';
import { PalmIllustration } from './assets/illustrations/Palm';
import { SiteHeader } from './components/layout/SiteHeader';
import { SiteFooter } from './components/layout/SiteFooter';
import { LandingPage } from './components/landing/LandingPage';
import { VibeCheck } from './components/vibecheck/VibeCheck';
import { EditorParticles } from './components/pass/EditorParticles';
import './index.css';

import { getDynamicFunFact } from './lib/dynamicFunFact';

export function App() {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [currentView, setCurrentView] = useState<'landing' | 'generator'>('landing');
  const [showVibeCheck, setShowVibeCheck] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Initial demo builder profile state
  const initialStack = 'React · Node.js · PostgreSQL · AWS';
  const initialRole = 'Full Stack Developer';
  const initialClass = 'terminal-wizard';

  const [profile, setProfile] = useState<BuilderProfile>({
    name: 'Nishant Ranjan',
    role: initialRole,
    stack: initialStack,
    builderClass: initialClass,
    photo: null,
    builderId: 'HH-GOA-042',
    issueDate: 'OCT 2026',
    serialNo: generateSerialNo(),
    templateTheme: 'light',
    funFact: getDynamicFunFact({ stack: initialStack, role: initialRole, builderClass: initialClass }),
  });
  const [shareModalData, setShareModalData] = useState<{
    imageDataUrl: string | null;
    shareText: string;
  } | null>(null);

  const handleProfileChange = (updated: Partial<BuilderProfile>) => {
    setProfile((prev) => ({ ...prev, ...updated }));
  };

  const handleGenerateNewId = () => {
    const newId = generateBuilderId();
    const newSerial = generateSerialNo();
    setProfile((prev) => ({
      ...prev,
      builderId: newId,
      serialNo: newSerial,
    }));
    showToast(`Generated new ID: ${newId}`);
  };

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  const handleDownloadPNG = async () => {
    if (!cardRef.current) return;
    try {
      setIsExporting(true);
      showToast('Generating high-res 4K PNG pass...');
      const fileName = `${(profile.builderId || 'HH-GOA').replace(/[^a-zA-Z0-9-]/g, '_')}_Pass.png`;
      await exportPassAsPng(cardRef.current, fileName);
      showToast('Pass PNG downloaded successfully!');
    } catch (err) {
      console.error(err);
      showToast('PNG Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!cardRef.current) return;
    try {
      setIsExporting(true);
      showToast('Generating high-res PDF pass...');
      const fileName = `${(profile.builderId || 'HH-GOA').replace(/[^a-zA-Z0-9-]/g, '_')}_Pass.pdf`;
      await exportPassAsPDF(cardRef.current, fileName);
      showToast('4K PDF downloaded successfully!');
    } catch (err) {
      console.error(err);
      showToast('PDF Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleShare = async () => {
    if (!profile.photo) {
      showToast('Please upload a photo first to share your pass!');
      return;
    }

    try {
      showToast('Preparing your pass image for #FrameInGoa...');
      let imageDataUrl: string | null = null;
      if (cardRef.current) {
        try {
          if (document.fonts) {
            await document.fonts.ready;
          }
          const { toPng } = await import('html-to-image');
          imageDataUrl = await toPng(cardRef.current, {
            quality: 0.98,
            pixelRatio: 2,
            cacheBust: true,
            filter: (domNode) => !(domNode instanceof HTMLElement && domNode.dataset.noExport === 'true'),
          });
        } catch (e) {
          console.warn('Share preview capture optional:', e);
        }
      }

      // Copy PNG blob to clipboard & trigger auto download if image URL is ready
      if (imageDataUrl) {
        try {
          const res = await fetch(imageDataUrl);
          const blob = await res.blob();
          if (navigator.clipboard && window.ClipboardItem) {
            const item = new ClipboardItem({ 'image/png': blob });
            await navigator.clipboard.write([item]);
          }
          const fileName = `${(profile.builderId || 'HH-GOA').replace(/[^a-zA-Z0-9-]/g, '_')}_Pass.png`;
          const downloadLink = document.createElement('a');
          downloadLink.download = fileName;
          downloadLink.href = imageDataUrl;
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
        } catch (err) {
          console.warn('Clipboard / download error on share:', err);
        }
      }

      const shareText = formatShareText(profile);
      setShareModalData({ imageDataUrl, shareText });
    } catch (err) {
      console.error(err);
      showToast('Share flow encountered an issue. Opening Twitter...');
      shareToX(profile);
    }
  };

  return (
    <div className="app-layout">
      {/* Background Decor */}
      <div className="app-bg-gradient" />
      <div className="app-bg-texture" />

      {/* Shared Site Header */}
      <SiteHeader
        currentView={currentView}
        onNavigate={(view) => setCurrentView(view)}
        onOpenVibeCheck={() => setShowVibeCheck(true)}
      />

      {/* Main View Router */}
      {currentView === 'landing' ? (
        <LandingPage
          onNavigateToGenerator={() => setCurrentView('generator')}
          onOpenVibeCheck={() => setShowVibeCheck(true)}
        />
      ) : (
        <main className="app-main-content">
          <EditorParticles />
          
          <div className="content-container">
            {/* Left Column: Form Builder & Customization Controls */}
            <div className="form-column">
              <BuilderForm
                profile={profile}
                onChange={handleProfileChange}
                onGenerateNewId={handleGenerateNewId}
                onDownload={handleDownloadPNG}
                onDownloadPDF={handleDownloadPDF}
                onShare={handleShare}
                isExporting={isExporting}
              />
            </div>

            {/* Right Column: Live High-Tech Pass Preview */}
            <div className="panel-preview-column">
              <div className="preview-sticky-wrapper">
                <div className="preview-header-bar">
                  <span className="live-indicator">
                    <span className="pulse-dot" /> LIVE IDENTITY CARD PREVIEW
                  </span>
                  <span className="preview-hint">HD Print Ready</span>
                </div>

                <div className="card-renderer-stage" ref={cardRef}>
                  <BuilderPass profile={profile} />
                </div>

                {/* Quick Action Bar under pass preview */}
                <div className="preview-bottom-bar">
                  <button
                    type="button"
                    className="quick-btn download"
                    onClick={handleDownloadPNG}
                    disabled={isExporting}
                  >
                    <Download size={15} /> Save PNG
                  </button>

                  <button
                    type="button"
                    className="quick-btn pdf"
                    onClick={handleDownloadPDF}
                    disabled={isExporting}
                  >
                    <FileText size={15} /> Save 4K PDF
                  </button>

                  {profile.photo && (
                    <button
                      type="button"
                      className="quick-btn share"
                      onClick={handleShare}
                      disabled={isExporting}
                    >
                      <Share2 size={15} /> Share #FrameInGoa
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* Shared Site Footer */}
      <SiteFooter />

      {/* Builder Vibe Check Quiz Modal */}
      {showVibeCheck && (
        <VibeCheck
          onClose={() => setShowVibeCheck(false)}
          onNavigateToGenerator={() => {
            setShowVibeCheck(false);
            setCurrentView('generator');
          }}
        />
      )}

      {/* Share to X Interactive Guidance Modal */}
      {shareModalData && (
        <ShareModal
          profile={profile}
          imageDataUrl={shareModalData.imageDataUrl}
          shareText={shareModalData.shareText}
          onClose={() => setShareModalData(null)}
          onLaunchTwitter={() => shareToX(profile)}
        />
      )}

      {/* Toast Notification */}
      {notification && (
        <div className="app-toast">
          <PalmIllustration size={20} color="#F2C230" />
          <span>{notification}</span>
        </div>
      )}
    </div>
  );
}
