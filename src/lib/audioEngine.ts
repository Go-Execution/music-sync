// Optimized Native Web Audio API Synthesizer Engine for atmospheric music sync previews
import type { Track } from '@/data/tracks';

class AudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private currentTrack: Track | null = null;
  private currentTrackId: string | null = null;
  private timer: number | null = null;
  private beatCount: number = 0;
  private masterGain: GainNode | null = null;
  private analyser: AnalyserNode | null = null;
  private stateListeners: Set<(state: AudioPlayerState) => void> = new Set();
  private trackListeners: Set<(track: Track | null, isPlaying: boolean) => void> = new Set();
  private playbackTime: number = 0;
  private durationSeconds: number = 180;
  private progressInterval: number | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;

      this.masterGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // High-frequency subscription (only for PlayerBar scrubber)
  public subscribe(listener: (state: AudioPlayerState) => void) {
    this.stateListeners.add(listener);
    listener(this.getState());
    return () => {
      this.stateListeners.delete(listener);
    };
  }

  // Low-frequency subscription (fires ONLY on track change or play/pause)
  public subscribeTrack(listener: (track: Track | null, isPlaying: boolean) => void) {
    this.trackListeners.add(listener);
    listener(this.currentTrack, this.isPlaying);
    return () => {
      this.trackListeners.delete(listener);
    };
  }

  private emitState() {
    if (this.stateListeners.size === 0) return;
    const state = this.getState();
    this.stateListeners.forEach((l) => l(state));
  }

  private emitTrackChange() {
    this.trackListeners.forEach((l) => l(this.currentTrack, this.isPlaying));
    this.emitState();
  }

  public getState(): AudioPlayerState {
    return {
      isPlaying: this.isPlaying,
      currentTrack: this.currentTrack,
      currentTime: this.playbackTime,
      duration: this.durationSeconds,
      progress: this.durationSeconds > 0 ? this.playbackTime / this.durationSeconds : 0,
      volume: this.masterGain ? this.masterGain.gain.value : 0.35,
    };
  }

  public setVolume(vol: number) {
    if (this.masterGain && this.ctx) {
      const safeVol = Math.max(0, Math.min(1, vol));
      this.masterGain.gain.setTargetAtTime(safeVol, this.ctx.currentTime, 0.05);
      this.emitState();
    }
  }

  public seek(ratio: number) {
    const safeRatio = Math.max(0, Math.min(1, ratio));
    this.playbackTime = safeRatio * this.durationSeconds;
    this.emitState();
  }

  public play(track: Track) {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    if (this.currentTrackId === track.id && this.isPlaying) {
      return;
    }

    if (this.currentTrackId !== track.id) {
      this.stopSynthesizer();
      this.currentTrack = track;
      this.currentTrackId = track.id;
      this.playbackTime = 0;
      this.durationSeconds = this.parseDuration(track.duration);
    }

    this.isPlaying = true;
    this.startSynthesizer(track);
    this.startProgress();
    this.emitTrackChange();
  }

  public pause() {
    this.isPlaying = false;
    this.stopSynthesizer();
    if (this.progressInterval) {
      window.clearInterval(this.progressInterval);
      this.progressInterval = null;
    }
    this.emitTrackChange();
  }

  public toggle(track: Track) {
    if (this.currentTrackId === track.id && this.isPlaying) {
      this.pause();
    } else {
      this.play(track);
    }
  }

  private parseDuration(str: string): number {
    const parts = str.split(':');
    if (parts.length === 2) {
      return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
    }
    return 210;
  }

  private startProgress() {
    if (this.progressInterval) window.clearInterval(this.progressInterval);
    this.progressInterval = window.setInterval(() => {
      if (this.isPlaying) {
        this.playbackTime += 0.5; // Update every 500ms instead of 250ms for smooth progress with 50% fewer wakeups
        if (this.playbackTime >= this.durationSeconds) {
          this.playbackTime = 0;
        }
        this.emitState();
      }
    }, 500);
  }

  private startSynthesizer(track: Track) {
    if (!this.ctx || !this.masterGain) return;

    const bpm = track.bpm || 110;
    const intervalMs = (60 / bpm) * 1000 * 0.5;

    const scaleMap: Record<string, number[][]> = {
      'Cinematic': [
        [130.81, 164.81, 196.0, 246.94],
        [110.0, 130.81, 164.81, 220.0],
        [146.83, 174.61, 220.0, 261.63],
        [98.0, 123.47, 146.83, 196.0],
      ],
      'Hip-Hop': [
        [65.41, 77.78, 98.0, 130.81],
        [58.27, 87.31, 116.54, 138.59],
        [51.91, 77.78, 103.83, 155.56],
        [73.42, 110.0, 146.83, 174.61],
      ],
      'R&B': [
        [116.54, 146.83, 174.61, 220.0],
        [130.81, 164.81, 196.0, 233.08],
        [98.0, 123.47, 146.83, 185.0],
        [103.83, 130.81, 155.56, 196.0],
      ],
      'Soul': [
        [130.81, 164.81, 196.0, 220.0],
        [146.83, 174.61, 220.0, 261.63],
        [164.81, 196.0, 246.94, 293.66],
        [174.61, 220.0, 261.63, 329.63],
      ],
      'Electronic': [
        [110.0, 164.81, 220.0, 329.63],
        [130.81, 196.0, 261.63, 392.0],
        [98.0, 146.83, 196.0, 293.66],
        [146.83, 220.0, 293.66, 440.0],
      ],
      'Pop': [
        [130.81, 164.81, 196.0, 261.63],
        [98.0, 123.47, 146.83, 196.0],
        [110.0, 130.81, 164.81, 220.0],
        [87.31, 110.0, 130.81, 174.61],
      ],
    };

    const chords = scaleMap[track.genre] || scaleMap['Cinematic'];

    this.timer = window.setInterval(() => {
      if (!this.isPlaying || !this.ctx || !this.masterGain) return;
      this.playBeat(chords, track.genre);
      this.beatCount++;
    }, intervalMs);
  }

  private playBeat(chords: number[][], genre: string) {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    const chordIndex = Math.floor((this.beatCount / 8) % chords.length);
    const chord = chords[chordIndex];

    if (this.beatCount % 8 === 0) {
      chord.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        const filter = this.ctx!.createBiquadFilter();

        osc.type = genre === 'Electronic' ? 'sawtooth' : genre === 'Hip-Hop' ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(freq, now);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(genre === 'Hip-Hop' ? 450 : 850, now);

        const chordGain = 0.05 / (idx + 1);
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(chordGain, now + 0.3);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain!);

        osc.start(now);
        osc.stop(now + 3.0);
      });
    }

    if (this.beatCount % 4 === 0) {
      const bassOsc = this.ctx.createOscillator();
      const bassGain = this.ctx.createGain();
      bassOsc.type = 'sine';
      const root = chord[0] * 0.5;
      bassOsc.frequency.setValueAtTime(root, now);

      bassGain.gain.setValueAtTime(0.18, now);
      bassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);

      bassOsc.connect(bassGain);
      bassGain.connect(this.masterGain);

      bassOsc.start(now);
      bassOsc.stop(now + 1.0);
    }

    if (this.beatCount % 2 === 0) {
      const note = chord[this.beatCount % chord.length] * 2;
      const pluck = this.ctx.createOscillator();
      const pluckGain = this.ctx.createGain();

      pluck.type = genre === 'Cinematic' ? 'sine' : 'triangle';
      pluck.frequency.setValueAtTime(note, now);

      pluckGain.gain.setValueAtTime(0.04, now);
      pluckGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);

      pluck.connect(pluckGain);
      pluckGain.connect(this.masterGain);

      pluck.start(now);
      pluck.stop(now + 0.45);
    }
  }

  private stopSynthesizer() {
    if (this.timer) {
      window.clearInterval(this.timer);
      this.timer = null;
    }
    this.beatCount = 0;
  }
}

export type AudioPlayerState = {
  isPlaying: boolean;
  currentTrack: Track | null;
  currentTime: number;
  duration: number;
  progress: number;
  volume: number;
};

export const audioEngine = new AudioEngine();
