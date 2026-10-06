import { DigitalIndicator } from "@/types/threat";

export interface UrlSecurityReport {
  urls: string[];
  domains: string[];
  emails: string[];
  phones: string[];
  upiIds: string[];
  indicators: DigitalIndicator[];
  deterministicRiskBonus: number;
  suspiciousReasons: string[];
}

const SUSPICIOUS_TLDS = new Set([
  '.xyz', '.top', '.click', '.buzz', '.cfd', '.rest', '.icu', 
  '.tk', '.ml', '.ga', '.cf', '.gq', '.work', '.live', '.online', 
  '.site', '.link', '.surf', '.space', '.bid'
]);

const SHORTENERS = new Set([
  'bit.ly', 'tinyurl.com', 't.co', 'goo.gl', 'is.gd', 'cutt.ly', 
  'rb.gy', 'ow.ly', 'buff.ly', 'rebrand.ly'
]);

const BRAND_TARGETS = [
  { brand: 'SBI', regex: /sbi|statebank/i, official: ['onlinesbi.sbi', 'sbi.co.in'] },
  { brand: 'HDFC', regex: /hdfc/i, official: ['hdfcbank.com'] },
  { brand: 'ICICI', regex: /icici/i, official: ['icicibank.com'] },
  { brand: 'Paytm', regex: /paytm/i, official: ['paytm.com'] },
  { brand: 'Google', regex: /google|gmail/i, official: ['google.com', 'accounts.google.com'] },
  { brand: 'Microsoft', regex: /microsoft|office365|outlook/i, official: ['microsoft.com', 'login.microsoftonline.com', 'live.com'] },
  { brand: 'India Post', regex: /indiapost|indiapost-gov|postal/i, official: ['indiapost.gov.in'] },
  { brand: 'Income Tax', regex: /incometax|e-filing/i, official: ['incometax.gov.in'] },
  { brand: 'Netflix', regex: /netflix/i, official: ['netflix.com'] },
  { brand: 'Amazon', regex: /amazon/i, official: ['amazon.in', 'amazon.com'] },
];

export function analyzeExtractedText(text: string): UrlSecurityReport {
  const urls: string[] = [];
  const domains: string[] = [];
  const emails: string[] = [];
  const phones: string[] = [];
  const upiIds: string[] = [];
  const indicators: DigitalIndicator[] = [];
  const suspiciousReasons: string[] = [];
  let deterministicRiskBonus = 0;

  // Regex extractors
  const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9-]+\.(?:xyz|top|click|co\.in|com|net|org|in|gov\.in|bank)[^\s]*)/gi;
  const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/gi;
  const phoneRegex = /(?:\+91[\s-]?)?[6-9]\d{9}\b/g;
  const upiRegex = /[a-zA-Z0-9._-]+@(okaxis|okhdfcbank|okicici|oksbi|paytm|ybl|apl|upi|freecharge)/gi;

  // Extract URLs
  const urlMatches = text.match(urlRegex) || [];
  for (const match of urlMatches) {
    const cleanUrl = match.replace(/[.,;)]+$/, '');
    if (!urls.includes(cleanUrl)) urls.push(cleanUrl);
  }

  // Extract Emails
  const emailMatches = text.match(emailRegex) || [];
  for (const match of emailMatches) {
    if (!emails.includes(match)) emails.push(match);
  }

  // Extract Phones
  const phoneMatches = text.match(phoneRegex) || [];
  for (const match of phoneMatches) {
    if (!phones.includes(match)) phones.push(match);
  }

  // Extract UPI
  const upiMatches = text.match(upiRegex) || [];
  for (const match of upiMatches) {
    if (!upiIds.includes(match)) upiIds.push(match);
  }

  // Analyze each URL
  for (const urlStr of urls) {
    let hostname = '';
    let isIp = false;
    let isSuspiciousTld = false;
    let isShortener = false;
    let isPunycode = false;
    let subdomainCount = 0;

    try {
      const parsed = new URL(urlStr.startsWith('http') ? urlStr : `https://${urlStr}`);
      hostname = parsed.hostname.toLowerCase();
      domains.push(hostname);

      // Check IP address
      if (/^(\d{1,3}\.){3}\d{1,3}$/.test(hostname)) {
        isIp = true;
        deterministicRiskBonus += 25;
        suspiciousReasons.push(`Direct IP hostname detected: ${hostname} (common phishing evasion technique)`);
        indicators.push({
          type: 'url',
          value: urlStr,
          isSuspicious: true,
          notes: 'Uses raw IP address instead of registered domain name.'
        });
      }

      // Check Punycode
      if (hostname.includes('xn--')) {
        isPunycode = true;
        deterministicRiskBonus += 30;
        suspiciousReasons.push(`Internationalized domain name (Punycode / Homograph attack): ${hostname}`);
        indicators.push({
          type: 'domain',
          value: hostname,
          isSuspicious: true,
          notes: 'Punycode characters detected, commonly used to spoof legitimate brand spellings.'
        });
      }

      // Check Shorteners
      if (SHORTENERS.has(hostname)) {
        isShortener = true;
        deterministicRiskBonus += 15;
        suspiciousReasons.push(`URL shortener masks actual destination: ${hostname}`);
        indicators.push({
          type: 'url',
          value: urlStr,
          isSuspicious: true,
          notes: 'Obfuscated link using link shortening service.'
        });
      }

      // Check Suspicious TLD
      for (const tld of Array.from(SUSPICIOUS_TLDS)) {
        if (hostname.endsWith(tld)) {
          isSuspiciousTld = true;
          deterministicRiskBonus += 18;
          suspiciousReasons.push(`High-risk top-level domain associated with disposable scams: ${tld}`);
          indicators.push({
            type: 'domain',
            value: hostname,
            isSuspicious: true,
            notes: `High-risk TLD (${tld}) frequently abused in phishing campaigns.`
          });
          break;
        }
      }

      // Subdomain count check (e.g., sbi.banking.security-portal.xyz)
      const parts = hostname.split('.');
      subdomainCount = parts.length;
      if (subdomainCount > 3 && !hostname.endsWith('.co.in') && !hostname.endsWith('.gov.in')) {
        deterministicRiskBonus += 12;
        suspiciousReasons.push(`Excessive subdomain nesting (${subdomainCount} labels): deceptive naming hierarchy`);
      }

      // Brand Spoofing Check
      for (const brand of BRAND_TARGETS) {
        if (brand.regex.test(hostname)) {
          const isOfficial = brand.official.some(off => hostname === off || hostname.endsWith(`.${off}`));
          if (!isOfficial) {
            deterministicRiskBonus += 25;
            suspiciousReasons.push(`Brand spoofing: mentions '${brand.brand}' in host '${hostname}', but official domain is ${brand.official.join(', ')}`);
            indicators.push({
              type: 'domain',
              value: hostname,
              isSuspicious: true,
              notes: `Impersonates ${brand.brand} using an unverified domain.`
            });
          }
        }
      }

    } catch {
      // Unparseable URL
    }
  }

  // Check UPI IDs
  for (const upi of upiIds) {
    if (/refund|cashback|lottery|reward|kyc/i.test(upi)) {
      deterministicRiskBonus += 20;
      suspiciousReasons.push(`Deceptive UPI VPA handle detected (${upi}) mimicking refunds or rewards`);
      indicators.push({
        type: 'upi',
        value: upi,
        isSuspicious: true,
        notes: 'VPA handle designed to deceptively trigger funds request / collect request.'
      });
    } else {
      indicators.push({
        type: 'upi',
        value: upi,
        isSuspicious: false,
        notes: 'Payment handle identified in interaction.'
      });
    }
  }

  // Check emails
  for (const email of emails) {
    const domain = email.split('@')[1] || '';
    if (SUSPICIOUS_TLDS.has('.' + domain.split('.').pop())) {
      deterministicRiskBonus += 15;
      suspiciousReasons.push(`Sender email uses disposable/suspicious domain: ${domain}`);
    }
  }

  return {
    urls,
    domains,
    emails,
    phones,
    upiIds,
    indicators,
    deterministicRiskBonus: Math.min(deterministicRiskBonus, 50),
    suspiciousReasons
  };
}
