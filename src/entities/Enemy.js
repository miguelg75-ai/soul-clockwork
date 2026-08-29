export class SpriteAnimator {
  constructor(imageKey, frames = 4) {
    this.k = imageKey;
    this.frames = frames;
    this.t = 0;
    this.f = 0;
    this.s = "idle";
    this.fps = 8;
  }

  update(dt, mv) {
    const n = mv ? "run" : "idle";
    if (this.s !== n) {
      this.s = n;
      this.f = 0;
      this.t = 0;
    }
    this.t += dt;
    if (this.t >= 1 / this.fps) {
      this.t = 0;
      this.f = (this.f + 1) % 2;
    }
  }

  render(ctx, x, y, fx, assetsImages) {
    const i = assetsImages[this.k];
    if (!i || !i.width) return;
    const w = i.width / this.frames, h = i.height;
    let fi = this.f;
    if (this.s === "run") fi += 2;
    ctx.save();
    ctx.translate(x, y);
    if (fx < 0) ctx.scale(-1, 1);
    ctx.drawImage(i, fi * w, 0, w, h, -w / 2, -h / 2 - 12, w, h);
    ctx.restore();
  }
}

export class Enemy {
  constructor() {
    this.active = false;
    this.x = 0;
    this.y = 0;
    this.hp = 20;
    this.mhp = 20;
    this.sp = 85;
    this.radius = 12;
    this.dmg = 8;
    this.kx = 0;
    this.ky = 0;
    this.t = 0;
    this.ib = false;
    this.ifb = false;
    this.st = 0;
    this.ft = 0;
    this.at = 0;
    this.ik = false;
    this.ish = false;
    this.fa = 0;
    this.an = null;
  }

  reset() {
    this.kx = this.ky = 0;
    this.ib = false;
    this.ifb = false;
    this.st = 0;
    this.ft = 0;
    this.ik = false;
    this.ish = false;
    this.fa = 0;
  }

  init(t, x, y, df, em = false, hm = false) {
    this.x = x;
    this.y = y;
    this.t = t;
    this.ib = false;
    this.ifb = false;
    let sk = "zombie";
    
    if (t === 0 || t === 5) {
      this.mhp = 18 * df;
      this.sp = 100 + (t === 5 ? 50 : 0);
      this.radius = 12;
      this.dmg = t === 5 ? 28 : 6;
      this.ik = (t === 5);
      sk = "bat";
    } else if (t === 2 || t === 6) {
      this.mhp = 42 * df;
      this.sp = 70;
      this.radius = 14;
      this.dmg = 10;
      this.ish = (t === 6);
      sk = "skeleton";
    } else if (t === 99 || t === 100) {
      this.ib = true;
      this.ifb = (t === 100);
      this.mhp = (t === 100 ? 1800 : 750) * df;
      this.sp = t === 100 ? 68 : 54;
      this.radius = 32;
      this.dmg = 32;
      sk = "boss";
    } else {
      this.mhp = 85 * df;
      this.sp = 48;
      this.radius = 16;
      this.dmg = 14;
      sk = "zombie";
    }
    
    if (em) { this.mhp *= 2.0; this.sp *= 1.3; this.dmg *= 1.5; }
    if (hm) { this.sp *= 1.30; }
    this.hp = this.mhp;
    this.an = new SpriteAnimator(sk, 4);
  }

  applyDamage(amt, px, py) {
    if (this.ish && (px !== 0 || py !== 0)) {
      const pa = Math.atan2(py, px);
      const da = Math.abs(pa - this.fa);
      const dn = Math.min((2 * Math.PI) - da, da);
      if (dn > 1.8) {
        amt *= 0.15;
        this.ft = 0.08;
      }
    }
    this.hp -= amt;
    const pm = this.ib ? 0.10 : (this.ish ? 0.22 : 1.0);
    this.kx += px * 150 * pm;
    this.ky += py * 150 * pm;
    this.ft = 0.08;
    return this.hp <= 0;
  }

  update(dt, tx, ty, pp) {
    if (!this.active) return;
    this.at += dt * 6;
    const dx = tx - this.x, dy = ty - this.y, d = Math.hypot(dx, dy) || 1;
    this.fa = Math.atan2(dy, dx);
    this.kx *= Math.max(0, 1 - dt * 6.5);
    this.ky *= Math.max(0, 1 - dt * 6.5);
    
    if (this.t === 4 || this.ifb) {
      this.st += dt;
      const rt = this.ifb ? 1.3 : 2.4;
      if (this.st >= rt) {
        this.st = 0;
        if (this.ifb) {
          for (let a = -2; a <= 2; a++) {
            const ang = this.fa + (a * 0.18);
            const p = pp.obtain();
            if (p) p.init(this.x, this.y, Math.cos(ang), Math.sin(ang), 18, 275, 1, true, "#ef4444");
          }
        } else {
          const p = pp.obtain();
          if (p) p.init(this.x, this.y, dx / d, dy / d, 14, 230, 1, true, "#ef4444");
        }
      }
    }
    
    this.x += ((dx / d) * this.sp + this.kx) * dt;
    this.y += ((dy / d) * this.sp + this.ky) * dt;
    if (this.ft > 0) this.ft -= dt;
    if (this.an) this.an.update(dt, true);
  }

  render(ctx, assetsImages) {
    if (!this.active) return;
    ctx.save();
    ctx.translate(this.x, this.y);
    if (this.ft > 0) {
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(0, 0, this.radius + 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      return;
    }
    const sc = this.ib ? (this.ifb ? 2.5 : 2.0) : 1.2;
    ctx.scale(sc, sc);
    if (this.an) this.an.render(ctx, 0, 0, Math.cos(this.fa), assetsImages);
    if (this.ish) {
      ctx.rotate(this.fa);
      ctx.strokeStyle = "#9ca3af";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(0, 0, 12, -Math.PI / 2.5, Math.PI / 2.5);
      ctx.stroke();
    }
    ctx.restore();
  }
}
