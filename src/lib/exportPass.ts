import { toPng } from 'html-to-image';

export async function exportPassAsPng(
  node: HTMLElement,
  fileName = 'HH-Goa-2026-Builder-Pass.png'
): Promise<string | null> {
  if (!node) return null;

  try {
    // Wait for fonts to be ready
    if (document.fonts) {
      await document.fonts.ready;
    }

    // High quality export options
    const dataUrl = await toPng(node, {
      quality: 0.98,
      pixelRatio: 2, // Generates high-res image (e.g. 2160x2700 from 1080x1350 scale)
      cacheBust: true,
      filter: (domNode) => {
        // Exclude export control buttons if nested inside
        return !(domNode instanceof HTMLElement && domNode.dataset.noExport === 'true');
      },
    });

    // Trigger download
    const link = document.createElement('a');
    link.download = fileName;
    link.href = dataUrl;
    link.click();

    return dataUrl;
  } catch (error) {
    console.error('Failed to export pass as PNG:', error);
    throw error;
  }
}
