export class MapObstacle {
  constructor(x, y, type = "pillar") {
    this.x = x;
    this.y = y;
    this.type = type; // "pillar" | "break_chest"
    this.radius = type === "pillar" ? 22 : 16;
    this.hp = type === "pillar" ? 999999 : 35;
    this.maxHp = this.hp;
    this.active = true;
  }

  applyDamage(amt) {
    if (this.type === "pillar") return false;
    this.hp -= amt;
    return this.hp <= 0;
  }

  render(ctx) {
    if (!this.active) return;
    ctx.save();
    ctx.translate(this.x, this.y);
    if (this.type === "pillar") {
      ctx.fillStyle = "#0c0a09"; ctx.beginPath(); ctx.arc(0, 4, this.radius, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#57534e"; ctx.fillRect(-18, -26, 36, 48);
      ctx.fillStyle = "#78716c"; ctx.fillRect(-14, -22, 28, 40);
      ctx.strokeStyle = "#292524"; ctx.lineWidth = 3; ctx.strokeRect(-18, -26, 36, 48);
    } else {
      ctx.fillStyle = "#451a03"; ctx.fillRect(-14, -12, 28, 24);
      ctx.strokeStyle = "#d97706"; ctx.lineWidth = 2; ctx.strokeRect(-14, -12, 28, 24);
      ctx.fillStyle = "#fbbf24"; ctx.fillRect(-4, -4, 8, 8);
      if (this.hp < this.maxHp) {
        ctx.fillStyle = "#000"; ctx.fillRect(-14, -18, 28, 4);
        ctx.fillStyle = "#22c55e"; ctx.fillRect(-14, -18, 28 * (this.hp / this.maxHp), 4);
      }
    }
    ctx.restore();
  }
}

export class DamageText {
  constructor() {
    this.active = false;
    this.x = 0;
    this.y = 0;
    this.l = 0;
    this.ml = 0.5;
    this.t = "";
    this.ic = false;
  }

  reset() {
    this.l = 0;
  }

  init(x, y, amt, ic) {
    this.active = true;
    this.x = x + (Math.random() * 16 - 8);
    this.y = y + (Math.random() * 12 - 6);
    this.t = Math.floor(amt).toString();
    this.ic = ic;
    this.l = 0;
    this.ml = ic ? 0.7 : 0.5;
  }

  update(dt, p) {
    if (!this.active) return;
    this.y -= (this.ic ? 45 : 30) * dt;
    this.l += dt;
    if (this.l >= this.ml) p.release(this);
  }

  render(ctx) {
    if (!this.active) return;
    const pr = this.l / this.ml;
    const al = Math.max(0, 1 - Math.pow(pr, 3));
    const sc = this.ic ? (1.5 - pr * 0.4) : (1.0 - pr * 0.2);
    ctx.save();
    ctx.globalAlpha = al;
    ctx.translate(this.x, this.y);
    ctx.scale(sc, sc);
    ctx.font = this.ic ? "900 16px "Courier Prime", monospace" : "bold 12px "Courier Prime", monospace";
    ctx.fillStyle = this.ic ? "#fde047" : "#f8fafc";
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 3;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.strokeText(this.t, 0, 0);
    ctx.fillText(this.t, 0, 0);
    ctx.restore();
  }
}

export class BloodDrop {
  constructor() {
    this.active = false;
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.l = 0;
    this.c = "#7f1d1d";
  }

  reset() {
    this.l = 0;
  }

  init(x, y, vx, vy, c) {
    this.active = true;
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.l = 2.0 + Math.random() * 3.0;
    this.c = c;
  }

  update(dt, p) {
    if (!this.active) return;
    this.vx *= 0.88;
    this.vy *= 0.88;
    this.x += this.vx * dt;
    this.y += this.vy * dt;
    this.l -= dt;
    if (this.l <= 0) p.release(this);
  }

  render(ctx) {
    if (!this.active) return;
    ctx.save();
    ctx.globalAlpha = Math.min(1, this.l);
    ctx.fillStyle = this.c;
    ctx.fillRect(this.x - 2, this.y - 2, 4, 4);
    ctx.restore();
  }
}

export class AcidPuddle {
  constructor() {
    this.active = false;
    this.x = 0;
    this.y = 0;
    this.r = 45;
    this.d = 12;
    this.l = 0;
    this.ml = 4.0;
    this.t = 0;
    this.ip = false;
  }

  init(x, y, dmg, rad, ip = false) {
    this.active = true;
    this.x = x;
    this.y = y;
    this.d = dmg;
    this.r = rad;
    this.l = 0;
    this.ml = ip ? 6.0 : 3.5;
    this.t = 0;
    this.ip = ip;
  }

  update(dt, g, en, nb, oh) {
    if (!this.active) return;
    this.l += dt;
    this.t += dt;
    if (this.t >= 0.28) {
      this.t = 0;
      const c = g.query(this.x, this.y, this.r, nb);
      for (let i = 0; i < c; i++) {
        const e = en[nb[i]];
        if (e && e.active && Math.hypot(e.x - this.x, e.y - this.y) < this.r + e.radius) {
          const appliedDmg = this.ip ? (this.d + e.mhp * 0.02) : this.d;
          oh(e, appliedDmg);
        }
      }
    }
    if (this.l >= this.ml) this.active = false;
  }

  render(ctx) {
    if (!this.active) return;
    ctx.save();
    ctx.fillStyle = this.ip ? "rgba(126,34,206,0.4)" : "rgba(22,101,52,0.4)";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();
  }
}
