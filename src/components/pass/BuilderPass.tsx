import { forwardRef, useEffect, useRef, useState } from 'react';
import { BuilderProfile } from '../../types/builder';
import { generateQRCodeDataUrl } from '../../lib/generateQR';
import { renderBarcodeToCanvas } from '../../lib/generateBarcode';
import { getResponsiveFontSize } from '../../lib/textFit';
import { BUILDER_CLASSES } from '../../data/builderClasses';
import { CocktailIllustration } from '../../assets/illustrations/Cocktail';
import { BirdsIllustration } from '../../assets/illustrations/Birds';
import { SailboatIllustration } from '../../assets/illustrations/Sailboat';
import { ShellIllustration } from '../../assets/illustrations/Shell';
import { PassportMarks } from '../../assets/illustrations/PassportMarks';
import './pass.css';

interface BuilderPassProps {
  profile: BuilderProfile;
}

export const BuilderPass = forwardRef<HTMLDivElement, BuilderPassProps>(
  ({ profile }, ref) => {
    const {
      name = 'NISHANT RANJAN',
      role = 'FULL STACK DEVELOPER',
      builderClass = 'terminal-wizard',
      photo = null,
      builderId = 'HH-GOA-042',
      templateTheme = 'light',
      stack = 'React · Node.js · PostgreSQL · AWS',
    } = profile;

    const displayName = (name || 'NISHANT RANJAN').toUpperCase();
    const displayRole = (role || 'FULL STACK DEVELOPER').toUpperCase();
    const currentClassObj =
      BUILDER_CLASSES.find((c) => c.id === builderClass) || BUILDER_CLASSES[0];

    const [qrSrc, setQrSrc] = useState('');
    const barcodeRef = useRef<HTMLCanvasElement | null>(null);

    const themeColors = {
      light: {
        bg: '#F8F4E6',
        primary: '#064E3B', /* Deep Tropical Green */
        secondary: '#F43F68', /* Coral */
        accent: '#F4C542', /* Golden Yellow */
        text: '#064E3B',
      },
      neon: {
        bg: '#060c1a',
        primary: '#fbbf24',
        secondary: '#fda4af',
        accent: '#B026FF',
        text: '#FFFFFF',
      },
    };

    const colors = themeColors[templateTheme as keyof typeof themeColors] || themeColors.light;

    useEffect(() => {
      const qrColor = templateTheme === 'neon' ? '#F8FAFC' : colors.primary;
      const qrBg = templateTheme === 'neon' ? '#050816' : '#00000000';
      generateQRCodeDataUrl(
        'https://hhgoa.com',
        qrColor,
        qrBg
      ).then(setQrSrc);
    }, [builderId, colors.primary, templateTheme]);

    useEffect(() => {
      if (barcodeRef.current && builderId) {
        const barColor = templateTheme === 'neon' ? 'FBBF24' : colors.primary.replace('#', '');
        renderBarcodeToCanvas(
          barcodeRef.current,
          builderId,
          barColor
        );
      }
    }, [builderId, colors.primary, templateTheme]);

    const defaultAvatarSvg = `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><rect width="300" height="300" fill="${colors.bg}"/><circle cx="150" cy="120" r="50" fill="${colors.primary}" opacity="0.1"/><path d="M70 280C70 210 110 180 150 180C190 180 230 210 230 280Z" fill="${colors.primary}" opacity="0.1"/></svg>`)}`;

    const nameFontSize = getResponsiveFontSize(displayName, 1.8, 1, 15);

    return (
      <div className="builder-pass-card-container">
        <div className={`pass-card-v3 theme-${templateTheme}`} ref={ref}>
          {/* Inner decorative border */}
          <div className="pass-inner-border"></div>

          {/* DECORATIVE ELEMENTS (Absolutely positioned) */}
          {templateTheme === 'light' && (
            <>
              {/* Micro illustrations */}
              <PassportMarks className="dec-passport-marks" />
              <BirdsIllustration className="dec-birds" />
              <SailboatIllustration className="dec-sailboat" />
              <ShellIllustration className="dec-shell" />
              
              <img src="/assets/decorations/tag.png" className="dec-tag" alt="" />
              <img src="/assets/decorations/stamp.png" className="dec-stamp" alt="" />
              <img src="/assets/decorations/circle_stamp.png" className="dec-circle-stamp" alt="" />
              <img src="/assets/decorations/signpost.png" className="dec-signpost" alt="" />
              <img src="/assets/decorations/beach_hut.png" className="dec-hut" alt="" />
              <img src="/assets/decorations/sticker.png" className="dec-sticker" alt="" />
            </>
          )}
          {templateTheme === 'neon' && (
            <>
              {/* Fallback neon decorations */}
              <div className="neon-grid-overlay"></div>
              <div className="neon-glow-blob blob-1"></div>
              <div className="neon-glow-blob blob-2"></div>
            </>
          )}

          {/* TOP LOGOS */}
          <div className="top-logos">
            <img src="/assets/logos/2-47.svg" alt="2:47 PM Studio" className="logo-247" />
            <div className="logo-hh-container">
              <img src="/assets/logos/Hacker house.png" alt="Hacker House" className="logo-hh" />
              <img src="/assets/logos/goa_hindi.svg" alt="Goa" className="goa-hindi-overlay" />
            </div>
          </div>

          {/* TOP HEADER */}
          <div className="pass-header">
            <div className="header-title">
              <span className="title-en">HACKER</span>
              <span className="title-hi">
                {templateTheme === 'neon' ? <span className="gradient-text">गोआ</span> : 'गोआ'}
              </span>
              <span className="title-en">HOUSE</span>
            </div>
            <div className="header-subtitle">
              ✦ 28 - 31 OCT 2026 • GOA, INDIA ✦
            </div>
          </div>

          {/* CENTER PROFILE AREA */}
          <div className="pass-profile-area">
            <div className="photo-container">
              <div className="photo-border-ring">
                <img
                  src={photo || defaultAvatarSvg}
                  alt={displayName}
                  className="profile-photo"
                />
              </div>
            </div>

            <div className="name-banner" style={{ fontSize: nameFontSize }}>
              {templateTheme === 'neon' ? (
                <span className="gradient-text">{displayName}</span>
              ) : (
                displayName
              )}
            </div>

            <div className="role-pill">
              {displayRole}
            </div>
          </div>

          {/* BOTTOM GRID */}
          <div className="pass-bottom-grid">
            {/* Column 1 */}
            <div className="grid-col col-1">
              <div className="col-header">
                {templateTheme === 'neon' ? <span className="gradient-text">BUILDER CLASS</span> : 'BUILDER CLASS'}
              </div>
              <div className="col-sub">{currentClassObj.name.toUpperCase()}</div>
              <div className="qr-box">
                {qrSrc && <img src={qrSrc} alt="QR" className="qr-code" />}
                {templateTheme === 'light' && qrSrc && (
                  <div className="qr-center-icon">
                    <CocktailIllustration size={16} color="#064E3B" />
                  </div>
                )}
                {templateTheme === 'neon' && qrSrc && (
                  <div className="qr-center-icon-neon">
                    <CocktailIllustration size={12} color="#FBBF24" />
                  </div>
                )}
              </div>
            </div>

            {/* Column 2 */}
            <div className="grid-col col-2">
              <div className="col-header">
                {templateTheme === 'neon' ? <span className="gradient-text">TECH STACK</span> : 'TECH STACK'}
              </div>
              <div className="fun-fact-text">{stack}</div>
            </div>

            {/* Column 3 */}
            <div className="grid-col col-3">
              <div className="col-header">
                {templateTheme === 'neon' ? <span className="gradient-text">CURRENTLY SHIPPING</span> : 'CURRENTLY SHIPPING'}
              </div>
              <div className="col-sub highlight">BUILDING THE FUTURE</div>
              <div className="id-box">
                <div className="id-value">{builderId}</div>
                {templateTheme === 'neon' && <div className="barcode-divider"></div>}
                <canvas ref={barcodeRef} className="barcode-canvas" />
              </div>
            </div>
          </div>

          {/* BOTTOM RIBBON */}
          <div className="pass-footer-ribbon">
            <div className="ribbon-logos left-logos">
              <img src="/assets/logos/aptoslabs_logo.jpeg" alt="Aptos" />
              <img src="/assets/logos/nillion_logo.jpeg" alt="Nillion" />
              <img src="/assets/logos/core_dao_logo.jpeg" alt="Core" />
              <img src="/assets/logos/devfolio_logo.jpeg" alt="Devfolio" />
            </div>
            <span>#FRAMEINGOA</span>
            <div className="ribbon-logos right-logos">
              <img src="/assets/logos/diamante_io_logo.jpeg" alt="Diamante" />
              <img src="/assets/logos/ethindia_logo.jpeg" alt="ETHIndia" />
              <img src="/assets/logos/polygonlabs_logo.jpeg" alt="Polygon" />
              <img src="/assets/logos/thegraph_logo.jpeg" alt="The Graph" />
            </div>
          </div>

        </div>
      </div>
    );
  }
);

BuilderPass.displayName = 'BuilderPass';
