export class Projectile {
  constructor() {
    this.active = false;
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.d = 18;
    this.l = 0;
    this.p = 1;
    this.ih = false;
    this.c = "#fbbf24";
    this.ig = false;
  }

  reset() {
    this.l = 0;
    this.p = 1;
    this.ih = false;
    this.ig = false;
    this.c = "#fbbf24";
  }

  init(x, y, dx, dy, dmg, spd = 520, pierce = 1, ih = false, c = "#fbbf24", ig = false) {
    this.x = x;
    this.y = y;
    this.vx = dx * spd;
    this.vy = dy * spd;
    this.d = dmg;
    this.p = pierce;
    this.ih = ih;
    this.c = c;
    this.ig = ig;
  }

  update(dt, pl, sp) {
    if (!this.active) return;
    this.x += this.vx * dt;
    this.y += this.vy * dt;
    this.l += dt;
    if (Math.random() < 0.25 && sp) {
      const s = sp.obtain();
      if (s) s.init(this.x, this.y, -this.vx * 0.1, -this.vy * 0.1, this.c);
    }
    if (this.l > (this.ig ? 2.5 : 1.8)) pl.release(this);
  }

  render(ctx) {
    if (!this.active) return;
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.fillStyle = this.c;
    if (this.ih) {
      ctx.beginPath();
      ctx.arc(0, 0, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 2;
      ctx.stroke();
    } else {
      ctx.rotate(Math.atan2(this.vy, this.vx));
      if (this.ig) {
        ctx.fillRect(-6, -2, 12, 4);
      } else {
        ctx.beginPath();
        ctx.moveTo(8, 0);
        ctx.lineTo(-4, 4);
        ctx.lineTo(-4, -4);
        ctx.fill();
      }
    }
    ctx.restore();
  }
}
