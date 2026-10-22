export type Track = {
  id: string;
  title: string;
  artist: string;
  genre: 'Hip-Hop' | 'R&B' | 'Cinematic' | 'Pop' | 'Soul' | 'Electronic';
  mood: string;
  duration: string;
  bpm: number;
  gradient: [string, string];
  waveform: number[];
};

export const TRACKS: Track[] = [
  {
    id: 't1',
    title: 'Midnight Directive',
    artist: 'K. Sovereign',
    genre: 'Hip-Hop',
    mood: 'Confident / Bold',
    duration: '3:24',
    bpm: 90,
    gradient: ['#E51B36', '#7a0d1d'],
    waveform: [0.3, 0.5, 0.8, 0.4, 0.9, 0.6, 0.3, 0.7, 0.5, 0.9, 0.4, 0.8, 0.6, 0.3, 0.5, 0.7, 0.9, 0.5, 0.3, 0.6, 0.8, 0.4, 0.7, 0.5],
  },
  {
    id: 't2',
    title: 'Velvet Hours',
    artist: 'Aria Monet',
    genre: 'R&B',
    mood: 'Sensual / Late Night',
    duration: '4:12',
    bpm: 72,
    gradient: ['#168BFF', '#0a4a8a'],
    waveform: [0.5, 0.7, 0.4, 0.6, 0.3, 0.8, 0.5, 0.4, 0.7, 0.3, 0.6, 0.5, 0.8, 0.4, 0.3, 0.6, 0.5, 0.7, 0.4, 0.8, 0.3, 0.5, 0.6, 0.4],
  },
  {
    id: 't3',
    title: 'Ascension',
    artist: 'Orion Lake',
    genre: 'Cinematic',
    mood: 'Epic / Inspiring',
    duration: '5:38',
    bpm: 128,
    gradient: ['#E51B36', '#168BFF'],
    waveform: [0.2, 0.4, 0.6, 0.8, 0.5, 0.9, 0.7, 0.4, 0.3, 0.9, 0.6, 0.8, 0.5, 0.7, 0.3, 0.9, 0.4, 0.6, 0.8, 0.5, 0.7, 0.3, 0.9, 0.5],
  },
  {
    id: 't4',
    title: 'Neon Mirage',
    artist: 'Sable Echo',
    genre: 'Pop',
    mood: 'Uplifting / Bright',
    duration: '3:45',
    bpm: 118,
    gradient: ['#168BFF', '#E51B36'],
    waveform: [0.6, 0.4, 0.8, 0.5, 0.3, 0.7, 0.9, 0.4, 0.6, 0.5, 0.8, 0.3, 0.7, 0.5, 0.9, 0.4, 0.6, 0.8, 0.3, 0.5, 0.7, 0.4, 0.9, 0.6],
  },
  {
    id: 't5',
    title: 'Golden Hour',
    artist: 'Mira Soul',
    genre: 'Soul',
    mood: 'Warm / Nostalgic',
    duration: '4:02',
    bpm: 85,
    gradient: ['#E51B36', '#b34d1a'],
    waveform: [0.4, 0.6, 0.3, 0.7, 0.5, 0.8, 0.4, 0.6, 0.3, 0.5, 0.7, 0.4, 0.8, 0.6, 0.3, 0.5, 0.7, 0.4, 0.6, 0.8, 0.5, 0.3, 0.7, 0.5],
  },
  {
    id: 't6',
    title: 'Circuit Dreams',
    artist: 'Nova Pulse',
    genre: 'Electronic',
    mood: 'Driving / Energetic',
    duration: '3:58',
    bpm: 140,
    gradient: ['#168BFF', '#0a2d5a'],
    waveform: [0.7, 0.9, 0.5, 0.8, 0.4, 0.6, 0.9, 0.3, 0.7, 0.5, 0.8, 0.4, 0.6, 0.9, 0.5, 0.7, 0.3, 0.8, 0.6, 0.4, 0.9, 0.5, 0.7, 0.3],
  },
];

export const GENRE_FILTERS = ['All Tracks', 'Hip-Hop', 'R&B', 'Cinematic', 'Pop'] as const;
export type GenreFilter = (typeof GENRE_FILTERS)[number];
