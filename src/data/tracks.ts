export type Track = {
  id: string;
  title: string;
  artist: string;
  genre: 'Hip-Hop' | 'R&B' | 'Cinematic' | 'Pop' | 'Soul' | 'Electronic' | 'Latin Urban' | 'Country';
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
  discoUrl?: string;
};

export const DISCO_CATALOG_URL = 'https://s.disco.ac/upbmnxvaqszp';
export const DREAMWORKS_PDF_URL = '/Perfect_Pitch_DreamWorks_EPK_Review.pdf';

export type ArtistEPK = {
  id: string;
  name: string;
  title: string;
  genre: string;
  heroImage: string;
  bio: string;
  followersTikTok: string;
  likesTikTok: string;
  followersInstagram: string;
  handleInstagram: string;
  leadReleases: string[];
  producerOrCollab: string;
  riyl: string[];
  licensingHighlights: string[];
  idealScenes: string[];
  discoUrl: string;
};

export const FEATURED_EPKS: ArtistEPK[] = [
  {
    id: 'braedn-lance',
    name: 'Braedn Lance',
    title: 'Singer | Songwriter | Entrepreneur',
    genre: 'Country & R&B Blend',
    heroImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1000&q=80',
    bio: 'Braedn Lance is a passionate and energetic singer blending country and R&B influences. Known for his strong character and love for connecting through music, he debuted in 2022 with "4 REAL" alongside Ty March. In 2025, he released "Big Texas", a bold anthem that celebrates Texas pride and dynamic vocal presence. Backed by Perfect Pitch Foreva.',
    followersTikTok: '161k+',
    likesTikTok: '2.5M+',
    followersInstagram: '16.4k',
    handleInstagram: '@braednlance',
    leadReleases: ['Big Texas (2025 Lead Anthem)', '4 REAL ft. Ty March (Debut Single)'],
    producerOrCollab: 'Perfect Pitch Publishing',
    riyl: ['Morgan Wallen', 'Kane Brown', 'Sam Hunt', 'Breland'],
    licensingHighlights: [
      '100% Master & Publishing Pre-Cleared',
      'Full Mix, Instrumental, TV Clean & Isolated Stems',
      'Broadcast-Ready Pro Mastered Audio',
    ],
    idealScenes: [
      'Heartland & Southern Dramas',
      'Sports Anthems & Rodeo Broadcasts',
      'Americana Lifestyle Commercials',
      'Summer Youth Culture Promos',
    ],
    discoUrl: 'https://s.disco.ac/upbmnxvaqszp',
  },
  {
    id: 'manuel-love',
    name: 'Manuel Love',
    title: 'Flagship Latin Urban & Caribbean Trap Artist',
    genre: 'Latin Urban / Reggaeton / Melodic Street',
    heroImage: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1000&q=80',
    bio: 'From Puerto Plata, Dominican Republic to the world. Manuel Love is an emerging urban Latin artist fusing Latin rhythms with honest, vibrant storytelling that reflects his Caribbean roots. In March 2025, he released his debut EP "RODIO", produced by Dekumpozed (respected Texas-based producer/A&R), backed by U.S. creative publishing house Perfect Pitch.',
    followersTikTok: '90k+',
    likesTikTok: '800k+',
    followersInstagram: '25k+',
    handleInstagram: '@manuelloveofficial',
    leadReleases: ['Romo & Musica', 'Sin Amor', 'Mi Dia', 'Debut EP: RODIO (Prod. Dekumpozed)'],
    producerOrCollab: 'Dekumpozed (Texas Production / A&R)',
    riyl: ['Bad Bunny', 'Jhay Cortez', 'Myke Towers', 'El Alfa', 'Sech'],
    licensingHighlights: [
      '100% Master and Publishing Controlled',
      'Full Mix, Instrumental, Clean Version & Stems',
      'Direct Clearance via Perfect Pitch One-Stop Desk',
    ],
    idealScenes: [
      'Global Spanish & Latin Urban Series',
      'High-Energy Action & Street Racing Sequences',
      'Romantic Dramas & Telenovela Dialogue Peaks',
      'Sports Promos & Youth Apparel Campaigns',
    ],
    discoUrl: 'https://s.disco.ac/upbmnxvaqszp',
  },
];

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
    discoUrl: DISCO_CATALOG_URL,
  },
  {
    id: 't-bl1',
    title: 'Big Texas',
    artist: 'Braedn Lance',
    genre: 'Country',
    mood: 'Bold • Energetic • Heartland Anthem',
    duration: '3:18',
    bpm: 114,
    key: 'G Major',
    coverImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
    description: 'Big acoustic drive, modern R&B drums, and rich southern storytelling. Featured artist in the Perfect Pitch DreamWorks executive EPK.',
    scenes: ['Heartland Dramas', 'Southern Sports Broadcasts', 'Summer Lifestyle Commercials'],
    stems: ['Acoustic Guitars', 'R&B Drum Kit', 'Lead & Harmony Vocals', 'Bassline'],
    oneStop: true,
    waveform: [0.5, 0.8, 0.9, 0.6, 0.85, 0.7, 0.5, 0.9, 0.6, 0.75, 0.85, 0.6, 0.7, 0.9, 0.8, 0.65, 0.85, 0.7, 0.6, 0.8, 0.95, 0.7, 0.6, 0.4],
    discoUrl: DISCO_CATALOG_URL,
  },
  {
    id: 't-ml1',
    title: 'Romo & Musica',
    artist: 'Manuel Love (Prod. Dekumpozed)',
    genre: 'Latin Urban',
    mood: 'Street Romantic • Caribbean Grit • Viral Energy',
    duration: '3:32',
    bpm: 96,
    key: 'A Minor',
    coverImage: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80',
    description: 'Sensual dembow rhythm, melodic urban flow, and lush synths. Lead anthem from Manuel Love\'s RODIO EP, backed by Perfect Pitch.',
    scenes: ['Latin Series & Features', 'Nightlife & Beach Sequences', 'Automotive Lifestyle Spots'],
    stems: ['Dembow Beat', '808 Sub', 'Melodic Synths & Plucks', 'Lead Vocal Stems'],
    oneStop: true,
    waveform: [0.6, 0.75, 0.9, 0.5, 0.85, 0.7, 0.6, 0.95, 0.7, 0.8, 0.6, 0.85, 0.75, 0.9, 0.65, 0.8, 0.7, 0.85, 0.6, 0.75, 0.9, 0.8, 0.6, 0.5],
    discoUrl: DISCO_CATALOG_URL,
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
    discoUrl: DISCO_CATALOG_URL,
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
    discoUrl: DISCO_CATALOG_URL,
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
    discoUrl: DISCO_CATALOG_URL,
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
    discoUrl: DISCO_CATALOG_URL,
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
    discoUrl: DISCO_CATALOG_URL,
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
    discoUrl: DISCO_CATALOG_URL,
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
    discoUrl: DISCO_CATALOG_URL,
  },
];

export const GENRE_FILTERS = [
  'All Tracks',
  'Cinematic',
  'Hip-Hop',
  'Latin Urban',
  'Country',
  'R&B',
  'Soul',
  'Electronic',
  'Pop',
] as const;
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
