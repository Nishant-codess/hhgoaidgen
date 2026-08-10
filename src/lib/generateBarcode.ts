import bwipjs from 'bwip-js';

export function renderBarcodeToCanvas(
  canvas: HTMLCanvasElement,
  text: string,
  colorHex = '063F32'
): void {
  try {
    bwipjs.toCanvas(canvas, {
      bcid: 'code128',
      text: text,
      scale: 3,
      height: 12,
      includetext: false,
      textxalign: 'center',
      barcolor: colorHex,
    });
  } catch (e) {
    console.error('Barcode rendering error:', e);
  }
}
