import { BuilderProfile } from '../types/builder';
import { BUILDER_CLASSES } from '../data/builderClasses';
import { getDynamicFunFact } from './dynamicFunFact';

/**
 * Format a rich, engaging, and beautified tweet message with builder stats & dynamic fun facts
 */
export function formatShareText(profile: BuilderProfile): string {
  const matchedClass = BUILDER_CLASSES.find((c) => c.id === profile.builderClass);
  const classTitle = matchedClass ? `${matchedClass.name} ${matchedClass.icon}` : 'Tech Builder 💻';

  const funFactText = profile.funFact && profile.funFact.trim().length > 0
    ? profile.funFact.trim()
    : getDynamicFunFact(profile);

  return `🚀 Just generated my Official Hacker House Goa 2026 Builder Pass! 🌴✨

👤 ${profile.name || 'Builder'}
🏷️ Class: ${classTitle}
🛠️ Stack: ${profile.stack || 'Full Stack'}
🆔 Pass ID: ${profile.builderId}

💡 Fun Fact: "${funFactText}"

Heading to Goa to build & ship! See you at the Hacker House! 🌊🔥

#FrameInGoa #HHGoa2026 @HackerHouseGoa`;
}

export function shareToX(profile: BuilderProfile): void {
  const text = formatShareText(profile);
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
  window.open(twitterUrl, '_blank', 'noopener,noreferrer');
}

export async function shareNativeOrFallback(
  profile: BuilderProfile,
  imageDataUrl?: string
): Promise<{ success: boolean; method: 'native' | 'webintent'; downloadedImage: boolean }> {
  const shareText = formatShareText(profile);
  let downloadedImage = false;

  if (imageDataUrl) {
    try {
      const res = await fetch(imageDataUrl);
      const blob = await res.blob();
      const fileName = `${(profile.builderId || 'HH-GOA').replace(/[^a-zA-Z0-9-]/g, '_')}_Pass.png`;
      const file = new File([blob], fileName, { type: 'image/png' });

      // 1. Try Native Web Share API with File Attachment
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            title: 'HH Goa 2026 Builder Pass',
            text: shareText,
            files: [file],
          });
          return { success: true, method: 'native', downloadedImage: false };
        } catch (e) {
          console.warn('User cancelled or native share failed, falling back:', e);
        }
      }

      // 2. Fallback for Desktop/Web Intent: Copy image to clipboard & auto-download image attachment
      try {
        if (navigator.clipboard && window.ClipboardItem) {
          const item = new ClipboardItem({ 'image/png': blob });
          await navigator.clipboard.write([item]);
        }
      } catch (err) {
        console.warn('Could not copy image to clipboard automatically:', err);
      }

      // Trigger PNG download so user has the card file to upload/drag-drop
      const downloadLink = document.createElement('a');
      downloadLink.download = fileName;
      downloadLink.href = imageDataUrl;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      downloadedImage = true;
    } catch (e) {
      console.warn('Error processing image data URL for share:', e);
    }
  }

  // Open X (Twitter) intent window
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
  window.open(twitterUrl, '_blank', 'noopener,noreferrer');

  return { success: true, method: 'webintent', downloadedImage };
}

