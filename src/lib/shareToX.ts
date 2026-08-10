export function shareToX(builderName: string, builderId: string): void {
  const text = `Just generated my Hacker House Goa 2026 Builder Pass! 🌴🌊\n\nI'm heading to Goa to build and ship with 247 elite builders.\n\nBuilder ID: ${builderId}\nName: ${builderName}`;
  const hashtag = 'FrameInGoa';
  const url = 'https://hhgoa.com';

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    text
  )}&hashtags=${encodeURIComponent(hashtag)}&url=${encodeURIComponent(url)}`;

  window.open(twitterUrl, '_blank', 'noopener,noreferrer');
}

export async function shareNativeOrFallback(
  builderName: string,
  builderId: string,
  imageDataUrl?: string
): Promise<void> {
  const shareData = {
    title: 'HH Goa 2026 Builder Pass',
    text: `Just generated my Hacker House Goa 2026 Builder Pass! 🌴 #FrameInGoa (ID: ${builderId})`,
    url: 'https://hhgoa.com',
  };

  if (navigator.share && navigator.canShare && imageDataUrl) {
    try {
      // Convert data URL to Blob for native sharing if supported
      const res = await fetch(imageDataUrl);
      const blob = await res.blob();
      const file = new File([blob], `${builderId}-pass.png`, { type: 'image/png' });

      if (navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: shareData.title,
          text: shareData.text,
        });
        return;
      }
    } catch (e) {
      console.warn('Native file share failed, falling back to Web Share API or Twitter:', e);
    }
  }

  if (navigator.share) {
    try {
      await navigator.share(shareData);
      return;
    } catch (e) {
      console.warn('Web share cancelled or failed:', e);
    }
  }

  // Fallback to X (Twitter) intent
  shareToX(builderName, builderId);
}
