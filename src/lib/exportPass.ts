import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';

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

export async function exportPassAsPDF(
  node: HTMLElement,
  fileName = 'HH-Goa-2026-Builder-Pass.pdf'
): Promise<void> {
  if (!node) return;

  try {
    if (document.fonts) {
      await document.fonts.ready;
    }

    // 4K Target Width = 3840px (or similar ultra-high resolution)
    // To achieve this, we can set pixelRatio up to 4 or calculate it based on the node's width
    const currentWidth = node.offsetWidth;
    const targetWidth = 2160; // 4K width for portrait, typically 2160x3840
    const ratio = Math.ceil(targetWidth / currentWidth);

    // Generate ultra high-res image
    const dataUrl = await toPng(node, {
      quality: 1.0,
      pixelRatio: ratio > 0 ? ratio : 4,
      cacheBust: true,
      filter: (domNode) => {
        return !(domNode instanceof HTMLElement && domNode.dataset.noExport === 'true');
      },
    });

    // Create a PDF using jsPDF
    // Using point unit, format corresponds to the aspect ratio of the node
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [node.offsetWidth, node.offsetHeight]
    });

    // Add image to the PDF spanning the entire page
    pdf.addImage(dataUrl, 'PNG', 0, 0, node.offsetWidth, node.offsetHeight);
    
    // Download the PDF
    pdf.save(fileName);
  } catch (error) {
    console.error('Failed to export pass as PDF:', error);
    throw error;
  }
}
