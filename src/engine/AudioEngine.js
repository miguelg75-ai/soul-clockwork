export class AudioEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.bgmGain = null;
    this.sfxGain = null;
    this.isMuted = false;
    this.isPlayingBGM = false;
    this.nextNoteTime = 0;
    this.step = 0;
    this.timerID = null;
    this.mapType = "ether";
    this.scaleEther = [130.81, 146.83, 155.56, 174.61, 196.00, 207.65, 246.94, 261.63];
    this.basslineEther = [0, 0, 2, 2, 3, 3, 4, 4, 5, 5, 4, 4, 6, 6, 4, 2];
    this.scaleRust = [110.00, 116.54, 138.59, 146.83, 164.81, 174.61, 196.00, 220.00];
    this.basslineRust = [0, 0, 0, 1, 0, 0, 3, 1, 0, 0, 0, 1, 4, 3, 1, 0];
  }

  init() {
    if (this.ctx) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    this.ctx = new AC();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = 0.35;
    this.masterGain.connect(this.ctx.destination);
    
    this.bgmGain = this.ctx.createGain();
    this.bgmGain.gain.value = 0.18;
    this.bgmGain.connect(this.masterGain);
    
    this.sfxGain = this.ctx.createGain();
    this.sfxGain.gain.value = 0.6;
    this.sfxGain.connect(this.masterGain);
    
    this.startBGM();
  }

  setMap(m) {
    this.mapType = m;
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.masterGain) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.35, this.ctx.currentTime);
    }
    return !this.isMuted;
  }

  startBGM() {
    if (this.isPlayingBGM || !this.ctx) return;
    this.isPlayingBGM = true;
    this.nextNoteTime = this.ctx.currentTime + 0.05;
    this.schedule();
  }

  schedule() {
    if (!this.isPlayingBGM || !this.ctx) return;
    while (this.nextNoteTime < this.ctx.currentTime + 0.2) {
      this.playBGMStep(this.nextNoteTime, this.step);
      this.nextNoteTime += 0.25 * (60.0 / 128.0);
      this.step = (this.step + 1) % 16;
    }
    this.timerID = setTimeout(() => this.schedule(), 50);
  }

  playBGMStep(t, s) {
    if (!this.ctx || !this.bgmGain) return;
    const iR = this.mapType === "rust";
    const sc = iR ? this.scaleRust : this.scaleEther;
    const bl = iR ? this.basslineRust : this.basslineEther;
    
    if (s % 4 === 0) {
      const o = this.ctx.createOscillator(), g = this.ctx.createGain();
      o.type = iR ? "square" : "triangle";
      o.frequency.setValueAtTime(iR ? 90 : 110, t);
      o.frequency.exponentialRampToValueAtTime(iR ? 20 : 30, t + 0.08);
      g.gain.setValueAtTime(iR ? 0.4 : 0.5, t);
      g.gain.linearRampToValueAtTime(0, t + 0.08);
      o.connect(g); g.connect(this.bgmGain); o.start(t); o.stop(t + 0.09);
    }
    
    if (s % 2 === 0 || (iR && s % 4 === 3)) {
      const o = this.ctx.createOscillator(), g = this.ctx.createGain();
      o.type = iR ? "square" : "sawtooth";
      o.frequency.setValueAtTime(sc[bl[s % bl.length]] * 0.5, t);
      g.gain.setValueAtTime(iR ? 0.2 : 0.3, t);
      g.gain.exponentialRampToValueAtTime(0.01, t + 0.18);
      o.connect(g); g.connect(this.bgmGain); o.start(t); o.stop(t + 0.2);
    }
  }

  playShoot() {
    if (!this.ctx) return;
    const t = this.ctx.currentTime, o = this.ctx.createOscillator(), g = this.ctx.createGain();
    o.type = "square"; o.frequency.setValueAtTime(380, t); o.frequency.exponentialRampToValueAtTime(40, t + 0.08);
    g.gain.setValueAtTime(0.3, t); g.gain.linearRampToValueAtTime(0, t + 0.08);
    o.connect(g); g.connect(this.sfxGain); o.start(t); o.stop(t + 0.08);
  }

  playHit() {
    if (!this.ctx) return;
    const t = this.ctx.currentTime, o = this.ctx.createOscillator(), g = this.ctx.createGain();
    o.type = "triangle"; o.frequency.setValueAtTime(180, t); o.frequency.exponentialRampToValueAtTime(40, t + 0.08);
    g.gain.setValueAtTime(0.3, t); g.gain.linearRampToValueAtTime(0, t + 0.08);
    o.connect(g); g.connect(this.sfxGain); o.start(t); o.stop(t + 0.08);
  }

  playExplosion() {
    if (!this.ctx) return;
    const t = this.ctx.currentTime, o = this.ctx.createOscillator(), g = this.ctx.createGain();
    o.type = "sawtooth"; o.frequency.setValueAtTime(100, t); o.frequency.exponentialRampToValueAtTime(20, t + 0.3);
    g.gain.setValueAtTime(0.5, t); g.gain.exponentialRampToValueAtTime(0.01, t + 0.3);
    o.connect(g); g.connect(this.sfxGain); o.start(t); o.stop(t + 0.35);
  }

  playGem() {
    if (!this.ctx) return;
    const t = this.ctx.currentTime, o = this.ctx.createOscillator(), g = this.ctx.createGain();
    o.type = "sine"; o.frequency.setValueAtTime(880, t); o.frequency.exponentialRampToValueAtTime(1320, t + 0.04);
    g.gain.setValueAtTime(0.18, t); g.gain.linearRampToValueAtTime(0, t + 0.05);
    o.connect(g); g.connect(this.sfxGain); o.start(t); o.stop(t + 0.05);
  }

  playLevelUp() {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    [261.63, 329.63, 392.00, 523.25].forEach((f, i) => {
      const o = this.ctx.createOscillator(), g = this.ctx.createGain();
      o.type = "sine"; o.frequency.value = f;
      const st = t + i * 0.06;
      g.gain.setValueAtTime(0, st); g.gain.linearRampToValueAtTime(0.3, st + 0.02);
      g.gain.exponentialRampToValueAtTime(0.001, st + 0.4);
      o.connect(g); g.connect(this.sfxGain); o.start(st); o.stop(st + 0.45);
    });
  }

  playEvolutionFanfare() {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50].forEach((f, i) => {
      const o = this.ctx.createOscillator(), g = this.ctx.createGain();
      o.type = "sawtooth"; o.frequency.value = f;
      const st = t + i * 0.07;
      g.gain.setValueAtTime(0, st); g.gain.linearRampToValueAtTime(0.35, st + 0.03);
      g.gain.exponentialRampToValueAtTime(0.001, st + 0.6);
      o.connect(g); g.connect(this.sfxGain); o.start(st); o.stop(st + 0.65);
    });
  }

  playUnlock() {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    [440, 554.37, 659.25, 880].forEach((f, i) => {
      const o = this.ctx.createOscillator(), g = this.ctx.createGain();
      o.type = "square"; o.frequency.value = f;
      const st = t + i * 0.1;
      g.gain.setValueAtTime(0, st); g.gain.linearRampToValueAtTime(0.2, st + 0.05);
      g.gain.exponentialRampToValueAtTime(0.001, st + 0.5);
      o.connect(g); g.connect(this.sfxGain); o.start(st); o.stop(st + 0.55);
    });
  }
}
