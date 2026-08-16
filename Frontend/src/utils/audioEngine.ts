// Web Audio API Synthesizer Engine for Maestro Portfolio
// Generates realistic acoustic piano, ambient reverbs, strings, and orchestra harmonic timbres

class SynthesizedAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private currentTrackId: string | null = null;
  private gainNode: GainNode | null = null;
  private intervalId: any = null;
  private onTimeUpdateCallback: ((time: number) => void) | null = null;
  private onEndCallback: (() => void) | null = null;
  private currentTime: number = 0;
  private duration: number = 240;
  private volume: number = 0.8;

  constructor() {
    // Lazy initialized on first user gesture
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.value = this.volume;
      this.gainNode.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Plays a rich acoustic piano note using harmonic additive synthesis
  public playAcousticNote(freq: number, startTime: number, duration: number = 2.5, velocity: number = 0.7) {
    if (!this.ctx || !this.gainNode) return;

    const oscTypes: OscillatorType[] = ['sine', 'triangle', 'sine'];
    const harmonics = [1, 2, 3, 4.02, 5.04];
    const harmonicGains = [1.0, 0.45, 0.2, 0.08, 0.03];

    harmonics.forEach((harmonic, idx) => {
      if (!this.ctx || !this.gainNode) return;
      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();

      osc.type = oscTypes[idx % oscTypes.length];
      osc.frequency.setValueAtTime(freq * harmonic, startTime);

      // Organic micro detune
      if (idx > 0) {
        osc.detune.setValueAtTime((Math.random() - 0.5) * 6, startTime);
      }

      // Piano envelope: sharp percussive attack, rapid initial decay, prolonged warm release
      const baseAmp = velocity * (harmonicGains[idx] || 0.02) * 0.15;
      noteGain.gain.setValueAtTime(0.0001, startTime);
      noteGain.gain.exponentialRampToValueAtTime(baseAmp, startTime + 0.008);
      noteGain.gain.exponentialRampToValueAtTime(baseAmp * 0.5, startTime + 0.15);
      noteGain.gain.exponentialRampToValueAtTime(0.00001, startTime + duration);

      osc.connect(noteGain);
      noteGain.connect(this.gainNode);

      osc.start(startTime);
      osc.stop(startTime + duration);
    });
  }

  // Classical/ambient arpeggio motifs for each track
  private startMusicalSequence(trackId: string) {
    if (!this.ctx) return;

    // Musical themes tailored to track vibe
    const scales: Record<string, number[]> = {
      // D Minor Nocturne: D3, F3, A3, D4, F4, A4, C5, D5
      '1': [146.83, 174.61, 220.00, 293.66, 349.23, 440.00, 523.25, 587.33, 440.00, 349.23],
      // E Minor Ambient: E3, G3, B3, E4, G4, B4, D5, E5
      '2': [164.81, 196.00, 246.94, 329.63, 392.00, 493.88, 587.33, 659.25, 493.88, 392.00],
      // Awakening A Minor: A2, E3, A3, C4, E4, A4, B4, C5
      '3': [110.00, 164.81, 220.00, 261.63, 329.63, 440.00, 493.88, 523.25, 440.00, 329.63],
      // Default: F Major / C Minor
      'default': [174.61, 220.00, 261.63, 349.23, 440.00, 523.25, 698.46, 523.25]
    };

    const notes = scales[trackId] || scales['default'];
    let noteIdx = 0;

    const playStep = () => {
      if (!this.isPlaying || !this.ctx) return;
      const now = this.ctx.currentTime;
      const rootFreq = notes[noteIdx % notes.length];
      const velocity = 0.5 + Math.random() * 0.3;
      const duration = 2.2 + Math.random() * 0.8;

      // Play melody note
      this.playAcousticNote(rootFreq, now, duration, velocity);

      // Occasional bass foundation on downbeats
      if (noteIdx % 4 === 0) {
        this.playAcousticNote(rootFreq / 2, now, 3.5, 0.8);
      }

      // Occasional harmony note
      if (noteIdx % 3 === 0) {
        const harmonyFreq = notes[(noteIdx + 2) % notes.length];
        this.playAcousticNote(harmonyFreq, now + 0.1, duration * 0.8, velocity * 0.6);
      }

      noteIdx++;
    };

    // Play right away
    playStep();

    // Schedule regular gentle piano strokes every 480ms
    if (this.intervalId) clearInterval(this.intervalId);
    this.intervalId = setInterval(() => {
      if (this.isPlaying) {
        playStep();
        this.currentTime += 0.48;
        if (this.onTimeUpdateCallback) {
          this.onTimeUpdateCallback(this.currentTime);
        }
        if (this.currentTime >= this.duration) {
          this.stop();
          if (this.onEndCallback) this.onEndCallback();
        }
      }
    }, 480);
  }

  public play(trackId: string, durationSec: number = 240, startFromSeconds: number = 0) {
    this.initContext();
    this.isPlaying = true;
    this.currentTrackId = trackId;
    this.duration = durationSec;
    this.currentTime = startFromSeconds;

    this.startMusicalSequence(trackId);
  }

  public pause() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  public resume() {
    if (!this.currentTrackId) return;
    this.initContext();
    this.isPlaying = true;
    this.startMusicalSequence(this.currentTrackId);
  }

  public stop() {
    this.isPlaying = false;
    this.currentTime = 0;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    if (this.onTimeUpdateCallback) {
      this.onTimeUpdateCallback(0);
    }
  }

  public seek(seconds: number) {
    this.currentTime = Math.max(0, Math.min(seconds, this.duration));
    if (this.onTimeUpdateCallback) {
      this.onTimeUpdateCallback(this.currentTime);
    }
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  public setTimeUpdateListener(cb: (time: number) => void) {
    this.onTimeUpdateCallback = cb;
  }

  public setEndListener(cb: () => void) {
    this.onEndCallback = cb;
  }

  public getCurrentTime(): number {
    return this.currentTime;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const audioEngine = new SynthesizedAudioEngine();
