import { useRef, useState } from 'react';
import { BuilderProfile } from './types/builder';
import { generateBuilderId, generateSerialNo } from './lib/generateId';
import { BuilderPass } from './components/pass/BuilderPass';
import { BuilderForm } from './components/builder/BuilderForm';
import { exportPassAsPng, exportPassAsPDF } from './lib/exportPass';
import { shareNativeOrFallback } from './lib/shareToX';
import { PalmIllustration } from './assets/illustrations/Palm';
import { SiteHeader } from './components/layout/SiteHeader';
import { SiteFooter } from './components/layout/SiteFooter';
import { LandingPage } from './components/landing/LandingPage';
import { VibeCheck } from './components/vibecheck/VibeCheck';
import { EditorParticles } from './components/pass/EditorParticles';
import './index.css';

export function App() {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [currentView, setCurrentView] = useState<'landing' | 'generator'>('landing');
  const [showVibeCheck, setShowVibeCheck] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Initial demo builder profile state
  const [profile, setProfile] = useState<BuilderProfile>({
    name: 'Nishant Ranjan',
    role: 'Full Stack Developer',
    stack: 'React · Node.js · PostgreSQL · AWS',
    builderClass: 'terminal-wizard',
    photo: null,
    builderId: 'HH-GOA-042',
    issueDate: 'OCT 2026',
    serialNo: generateSerialNo(),
    templateTheme: 'light',
    funFact: 'I once accidentally deleted production... and survived.',
  });

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

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setIsExporting(true);
    try {
      const fileName = `${profile.name.replace(/\s+/g, '_')}_HH_Goa_2026_Pass.png`;
      await exportPassAsPng(cardRef.current, fileName);
      showToast('🎉 High-resolution PNG downloaded successfully!');
    } catch (err) {
      console.error(err);
      showToast('❌ Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!cardRef.current) return;
    setIsExporting(true);
    try {
      const fileName = `${profile.name.replace(/\s+/g, '_')}_HH_Goa_2026_Pass.pdf`;
      await exportPassAsPDF(cardRef.current, fileName);
      showToast('🎉 4K PDF downloaded successfully!');
    } catch (err) {
      console.error(err);
      showToast('❌ PDF Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleShare = async () => {
    try {
      showToast('🚀 Opening Share flow for #FrameInGoa...');
      let imageDataUrl: string | undefined;
      if (cardRef.current) {
        try {
          const { toPng } = await import('html-to-image');
          imageDataUrl = await toPng(cardRef.current, { quality: 0.9, pixelRatio: 1.5 });
        } catch (e) {
          console.warn('Share preview capture optional:', e);
        }
      }
      await shareNativeOrFallback(profile.name, profile.builderId, imageDataUrl);
    } catch (err) {
      console.error(err);
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

      {/* Main View Routing */}
      {currentView === 'landing' ? (
        <LandingPage
          onNavigateToGenerator={() => setCurrentView('generator')}
          onOpenVibeCheck={() => setShowVibeCheck(true)}
        />
      ) : (
        <main className="app-main-content">
          <EditorParticles />
          <div className="content-container">
            {/* Left Column: Form Controls */}
            <div className="panel-form-column">
              <BuilderForm
                profile={profile}
                onChange={handleProfileChange}
                onGenerateNewId={handleGenerateNewId}
                onDownload={handleDownload}
                onDownloadPDF={handleDownloadPDF}
                onShare={handleShare}
                isExporting={isExporting}
              />
            </div>

            {/* Right Column: Live Card Renderer & Preview */}
            <div className="panel-preview-column">
              <div className="preview-sticky-wrapper">
                <div className="preview-header-bar">
                  <div className="live-indicator">
                    <span className="pulse-dot" /> LIVE CARD PREVIEW
                  </div>
                  <div className="preview-hint">
                    {profile.templateTheme === 'light' ? 'LIGHT BEACH PASSPORT' : 'NEON CYBERPUNK'}
                  </div>
                </div>

                {/* Card Canvas */}
                <div className="card-renderer-stage">
                  <BuilderPass ref={cardRef} profile={profile} />
                </div>

                {/* Quick Actions under preview */}
                <div className="preview-bottom-bar" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    className="quick-btn download"
                    onClick={handleDownload}
                    disabled={isExporting}
                    style={{ flex: 1 }}
                  >
                    ⚡ PNG (2160×2700)
                  </button>
                  <button
                    type="button"
                    className="quick-btn download"
                    onClick={handleDownloadPDF}
                    disabled={isExporting}
                    style={{ flex: 1, background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)' }}
                  >
                    📄 4K PDF
                  </button>
                  <button type="button" className="quick-btn share" onClick={handleShare} style={{ flex: '1 1 100%' }}>
                    🌴 Share #FrameInGoa
                  </button>
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
