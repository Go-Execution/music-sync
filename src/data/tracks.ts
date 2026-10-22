export type Track = {
  id: string;
  title: string;
  artist: string;
  genre: 'Hip-Hop' | 'R&B' | 'Cinematic' | 'Pop' | 'Soul' | 'Electronic';
  mood: string;
  duration: string;
  bpm: number;
  key: string;
  coverImage: string;
  description: string;
  scenes: string[];
  stems: string[];
  oneStop: boolean;
  waveform: number[];
};

export const TRACKS: Track[] = [
  {
    id: 't1',
    title: 'Midnight Directive',
    artist: 'K. Sovereign',
    genre: 'Hip-Hop',
    mood: 'Confident • Gritty • High-Stakes',
    duration: '3:24',
    bpm: 92,
    key: 'C Minor',
    coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
    description: 'Heavy sub-bass, analogue 808s, and sharp brass stabs. Tailored for crime sagas, heist reveals, and intense street chases.',
    scenes: ['Action Trailers', 'Neo-Noir Crime Thrillers', 'Sports Promos'],
    stems: ['Drums', '808 Bass', 'Brass & Strings', 'Vocal Chants'],
    oneStop: true,
    waveform: [0.35, 0.6, 0.85, 0.45, 0.95, 0.7, 0.4, 0.8, 0.55, 0.9, 0.5, 0.85, 0.65, 0.35, 0.6, 0.75, 0.95, 0.6, 0.35, 0.7, 0.85, 0.45, 0.75, 0.55],
  },
  {
    id: 't2',
    title: 'Velvet Hours',
    artist: 'Aria Monet',
    genre: 'R&B',
    mood: 'Sensual • Intimate • Late Night',
    duration: '4:12',
    bpm: 74,
    key: 'Bb Major',
    coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    description: 'Warm Rhode pianos, silk vocal textures, and deep tape-saturated bass. Built for nuanced relationship dramas and luxury lifestyle spots.',
    scenes: ['Romantic Dramas', 'Luxury Fashion Ads', 'Intimate Dialogue Peaks'],
    stems: ['Lead Vocal', 'Electric Piano', 'Warm Bass', 'Rim & Percussion'],
    oneStop: true,
    waveform: [0.5, 0.7, 0.45, 0.65, 0.35, 0.85, 0.55, 0.45, 0.75, 0.35, 0.65, 0.55, 0.85, 0.45, 0.35, 0.65, 0.55, 0.75, 0.45, 0.85, 0.35, 0.55, 0.65, 0.45],
  },
  {
    id: 't3',
    title: 'Ascension (Full Orchestral)',
    artist: 'Orion Lake',
    genre: 'Cinematic',
    mood: 'Epic • Sweeping • Triumphant',
    duration: '5:38',
    bpm: 128,
    key: 'D Minor',
    coverImage: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80',
    description: 'Thunderous Taiko drums, live hybrid strings, and soaring French horns that culminate in a massive climactic battle crescendo.',
    scenes: ['Blockbuster Movie Trailers', 'Sci-Fi Space Epics', 'Documentary Climaxes'],
    stems: ['Full Strings', 'Brass Ensemble', 'Epic Percussion', 'Synthesizer Sub-layer'],
    oneStop: true,
    waveform: [0.25, 0.45, 0.65, 0.85, 0.55, 0.95, 0.75, 0.45, 0.35, 0.95, 0.65, 0.85, 0.55, 0.75, 0.35, 0.95, 0.45, 0.65, 0.85, 0.55, 0.75, 0.35, 0.95, 0.55],
  },
  {
    id: 't4',
    title: 'Neon Mirage',
    artist: 'Sable Echo',
    genre: 'Pop',
    mood: 'Uplifting • Vibrant • Forward-Moving',
    duration: '3:45',
    bpm: 118,
    key: 'G Major',
    coverImage: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80',
    description: 'Bright electric guitar hooks, energetic driving drums, and euphoric synth arpeggios crafted for youth culture and summer campaigns.',
    scenes: ['Commercial Spotlights', 'Youth Apparel', 'Tech Product Launches'],
    stems: ['Guitars', 'Lead Synths', 'Drums & Bass', 'Vocal Chops'],
    oneStop: true,
    waveform: [0.65, 0.45, 0.85, 0.55, 0.35, 0.75, 0.95, 0.45, 0.65, 0.55, 0.85, 0.35, 0.75, 0.55, 0.95, 0.45, 0.65, 0.85, 0.35, 0.55, 0.75, 0.45, 0.95, 0.65],
  },
  {
    id: 't5',
    title: 'Golden Hour Memories',
    artist: 'Mira Soul',
    genre: 'Soul',
    mood: 'Nostalgic • Warm • Heartfelt',
    duration: '4:02',
    bpm: 84,
    key: 'F Major',
    coverImage: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=800&q=80',
    description: 'Analog tape-warmed Wurlitzer, hollow-body archtop guitars, and expressive horn sections with timeless 1970s Stax authenticity.',
    scenes: ['Period Feature Films', 'Family Heritage Commercials', 'Indie Festival Hits'],
    stems: ['Wurlitzer & Piano', 'Horns', 'Live Rhythm Section', 'Acoustic Guitars'],
    oneStop: true,
    waveform: [0.45, 0.65, 0.35, 0.75, 0.55, 0.85, 0.45, 0.65, 0.35, 0.55, 0.75, 0.45, 0.85, 0.65, 0.35, 0.55, 0.75, 0.45, 0.65, 0.85, 0.55, 0.35, 0.75, 0.55],
  },
  {
    id: 't6',
    title: 'Circuit Dreams 2088',
    artist: 'Nova Pulse',
    genre: 'Electronic',
    mood: 'Hypnotic • Cybernetic • Tension',
    duration: '3:58',
    bpm: 138,
    key: 'A Minor',
    coverImage: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80',
    description: 'Pulsing modular synth sequences, industrial percussion, and razor-sharp glitch textures designed for futuristic dystopias and thrillers.',
    scenes: ['Cyberpunk Series', 'High-Octane Gaming', 'Automotive Night Sequences'],
    stems: ['Modular Sequences', 'Sub Bass', 'Glitches & Hits', 'Industrial Beat'],
    oneStop: true,
    waveform: [0.75, 0.95, 0.55, 0.85, 0.45, 0.65, 0.95, 0.35, 0.75, 0.55, 0.85, 0.45, 0.65, 0.95, 0.55, 0.75, 0.35, 0.85, 0.65, 0.45, 0.95, 0.55, 0.75, 0.35],
  },
  {
    id: 't7',
    title: 'Ghost In The Valley',
    artist: 'Maren & The Hollow',
    genre: 'Cinematic',
    mood: 'Haunting • Somber • Atmospheric',
    duration: '4:35',
    bpm: 68,
    key: 'E Minor',
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    description: 'Ethereal bowed cello, distant reverberant guitar swells, and quiet cinematic suspense that leaves breathing room for dialogue.',
    scenes: ['True Crime Documentaries', 'Psychological Thrillers', 'Pre-Dawn Scenes'],
    stems: ['Solo Cello', 'Atmospheric Swells', 'Sub Drone', 'Textural Percussion'],
    oneStop: true,
    waveform: [0.2, 0.3, 0.4, 0.6, 0.7, 0.5, 0.6, 0.8, 0.9, 0.6, 0.4, 0.5, 0.7, 0.8, 0.5, 0.4, 0.3, 0.5, 0.6, 0.4, 0.3, 0.2, 0.4, 0.3],
  },
  {
    id: 't8',
    title: 'Crown City Anthem',
    artist: 'Vance West',
    genre: 'Hip-Hop',
    mood: 'Unstoppable • Heavy • Anthemic',
    duration: '3:14',
    bpm: 144,
    key: 'F# Minor',
    coverImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
    description: 'Aggressive distorted 808 glide, trap hi-hat rolls, and victorious horn samples ready for arena broadcasts and video game soundtracks.',
    scenes: ['Sports Broadcast Promos', 'Action Game Soundtracks', 'Brand Anthems'],
    stems: ['808 & Kick', 'Hi-Hats & Snare', 'Horn Hooks', 'SFX Risers'],
    oneStop: true,
    waveform: [0.8, 0.5, 0.9, 0.7, 0.4, 0.8, 0.6, 0.9, 0.4, 0.7, 0.8, 0.5, 0.9, 0.6, 0.4, 0.8, 0.7, 0.9, 0.5, 0.8, 0.6, 0.9, 0.4, 0.7],
  },
];

export const GENRE_FILTERS = ['All Tracks', 'Cinematic', 'Hip-Hop', 'R&B', 'Soul', 'Electronic', 'Pop'] as const;
export type GenreFilter = (typeof GENRE_FILTERS)[number];

export type PlacementShowcase = {
  id: string;
  projectTitle: string;
  directorOrBrand: string;
  category: 'Feature Film' | 'Global Commercial' | 'Original Series' | 'Indie Documentary';
  trackTitle: string;
  year: string;
  imageUrl: string;
  sceneDescription: string;
  syncRole: string;
  clearanceSpeed: string;
};

export const SHOWCASE_PLACEMENTS: PlacementShowcase[] = [
  {
    id: 'p1',
    projectTitle: 'DEAD RECKONING // TOKYO',
    directorOrBrand: 'Studio Neon / Dir. K. Arisawa',
    category: 'Feature Film',
    trackTitle: 'Midnight Directive',
    year: '2026',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    sceneDescription: 'Opening rain-slicked supercar pursuit through Shinjuku neon alleys into underground parking complex.',
    syncRole: 'Key Action Scene & Theatrical Trailer',
    clearanceSpeed: 'Pre-Cleared in 12 Hours',
  },
  {
    id: 'p2',
    projectTitle: 'CHRONOS: THE TITANIUM SERIES',
    directorOrBrand: 'Aethel Automotive Global',
    category: 'Global Commercial',
    trackTitle: 'Ascension (Full Orchestral)',
    year: '2026',
    imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
    sceneDescription: 'International launch spot broadcast across prime-time sports events and digital streaming hero takeovers.',
    syncRole: 'Full Broadcast & Digital Master',
    clearanceSpeed: 'One-Stop Worldwide License',
  },
  {
    id: 'p3',
    projectTitle: 'AFTER HOURS IN PARIS',
    directorOrBrand: 'Maison Étoile FW26',
    category: 'Global Commercial',
    trackTitle: 'Velvet Hours',
    year: '2026',
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
    sceneDescription: 'High-fashion editorial film shot on 35mm film in Parisian loft with custom instrumental mix.',
    syncRole: 'Soundtrack & Global Socials',
    clearanceSpeed: 'Instant 24-Hour Approval',
  },
  {
    id: 'p4',
    projectTitle: 'THE SILENT DIVIDE',
    directorOrBrand: 'Tribeca Official Selection',
    category: 'Indie Documentary',
    trackTitle: 'Ghost In The Valley',
    year: '2026',
    imageUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80',
    sceneDescription: 'Emotional climax and end-credit sequence capturing mountain expanse at dawn.',
    syncRole: 'Main Title & End Credits',
    clearanceSpeed: 'Festival Tier Direct License',
  },
];
