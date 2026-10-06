export interface QrScanResult {
  detected: boolean;
  data?: string;
  isUpi: boolean;
  isUrl: boolean;
  upiDetails?: {
    payeeVpa?: string;
    payeeName?: string;
    amount?: string;
    note?: string;
  };
  notes: string;
}

export function parseQrData(payload: string): QrScanResult {
  if (!payload || payload.trim().length === 0) {
    return {
      detected: false,
      isUpi: false,
      isUrl: false,
      notes: "No QR code payload detected in artifact."
    };
  }

  const clean = payload.trim();

  // Check UPI scheme: upi://pay?pa=recipient@bank&pn=Name&am=5000&cu=INR
  if (clean.startsWith('upi://pay') || clean.includes('pa=')) {
    const upiDetails: { payeeVpa?: string; payeeName?: string; amount?: string; note?: string } = {};
    try {
      const url = new URL(clean.startsWith('upi://') ? clean : `upi://pay?${clean}`);
      upiDetails.payeeVpa = url.searchParams.get('pa') || undefined;
      upiDetails.payeeName = url.searchParams.get('pn') || undefined;
      upiDetails.amount = url.searchParams.get('am') || undefined;
      upiDetails.note = url.searchParams.get('tn') || undefined;
    } catch {
      // Manual regex extraction if URL parsing fails
      const paMatch = clean.match(/pa=([^&]+)/);
      if (paMatch) upiDetails.payeeVpa = decodeURIComponent(paMatch[1]);
      const amMatch = clean.match(/am=([^&]+)/);
      if (amMatch) upiDetails.amount = decodeURIComponent(amMatch[1]);
    }

    return {
      detected: true,
      data: clean,
      isUpi: true,
      isUrl: false,
      upiDetails,
      notes: `UPI Payment QR Code detected targeting payee: ${upiDetails.payeeVpa || 'Unknown VPA'}`
    };
  }

  // Check Web URL
  if (clean.startsWith('http://') || clean.startsWith('https://') || clean.startsWith('www.')) {
    return {
      detected: true,
      data: clean,
      isUpi: false,
      isUrl: true,
      notes: `Web destination QR code detected: ${clean}`
    };
  }

  return {
    detected: true,
    data: clean,
    isUpi: false,
    isUrl: false,
    notes: `Raw text/custom payload in QR code: ${clean.substring(0, 100)}`
  };
}
