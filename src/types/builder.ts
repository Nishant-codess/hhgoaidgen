export type TemplateTheme = 'light' | 'neon';

export interface BuilderProfile {
  name: string;
  role: string;
  stack: string;
  builderClass: string;
  photo: string | null; // Data URL or object URL
  builderId: string;
  issueDate?: string;
  serialNo?: string;
  templateTheme: TemplateTheme;
  funFact?: string; // e.g. "I once deleted production..."
  coordinates?: string; // e.g. "15.2993° N, 74.1240° E"
}

export interface Sponsor {
  name: string;
  logo: string;
  tier: 'Title' | 'Diamond' | 'Gold' | 'Silver' | 'Ecosystem' | 'Series';
  website?: string;
  verifiedSource?: string;
}

export interface EventConfig {
  name: string;
  shortName: string;
  edition: string;
  year: number;
  location: string;
  dates: string;
  hashtag: string;
  tagline: string;
  organizer: string;
  residencyCount: string;
}
