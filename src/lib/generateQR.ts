import QRCode from 'qrcode';

export async function generateQRCodeDataUrl(
  text: string,
  colorDark = '#063F32',
  colorLight = '#00000000'
): Promise<string> {
  try {
    const dataUrl = await QRCode.toDataURL(text, {
      width: 256,
      margin: 1,
      color: {
        dark: colorDark,
        light: colorLight,
      },
      errorCorrectionLevel: 'H',
    });
    return dataUrl;
  } catch (err) {
    console.error('QR Code generation failed:', err);
    return '';
  }
}
