export class Chest {
  constructor() {
    this.active = false;
    this.x = 0;
    this.y = 0;
    this.p = 0;
  }

  init(x, y) {
    this.active = true;
    this.x = x;
    this.y = y;
    this.p = 0;
  }

  render(ctx, dt) {
    if (!this.active) return;
    this.p += dt * 4;
    ctx.save();
    ctx.font = "24px "Courier Prime"";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.scale(1 + Math.sin(this.p) * 0.1, 1 + Math.sin(this.p) * 0.1);
    ctx.fillText("🎁", this.x, this.y);
    ctx.restore();
  }
}

export class Gem {
  constructor() {
    this.active = false;
    this.x = 0;
    this.y = 0;
    this.v = 10;
    this.at = false;
    this.sp = 0;
  }

  reset() {
    this.at = false;
    this.sp = 0;
  }

  init(x, y, v) {
    this.active = true;
    this.x = x;
    this.y = y;
    this.v = v;
  }

  update(dt, px, py, rad, pl, oc) {
    if (!this.active) return;
    const dx = px - this.x, dy = py - this.y, d = Math.hypot(dx, dy);
    if (!this.at && d < rad) this.at = true;
    if (this.at) {
      if (d < 18) {
        oc(this.v);
        pl.release(this);
        return;
      }
      this.sp = Math.min(720, this.sp + 950 * dt);
      this.x += (dx / d) * this.sp * dt;
      this.y += (dy / d) * this.sp * dt;
    }
  }

  render(ctx) {
    if (!this.active) return;
    ctx.save();
    ctx.font = "14px "Courier Prime"";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("💎", this.x, this.y);
    ctx.restore();
  }
}
