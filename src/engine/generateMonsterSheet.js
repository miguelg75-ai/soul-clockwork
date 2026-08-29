export function generateMonsterSheet(c1, c2, f) {
  const c = document.createElement("canvas"); c.width = 128; c.height = 32; const ctx = c.getContext("2d");
  const d = (ox, oy, fr) => {
    ctx.fillStyle = "rgba(0,0,0,0.4)"; ctx.beginPath(); ctx.ellipse(ox + 16, 28, 10, 3, 0, 0, Math.PI * 2); ctx.fill();
    if (f) {
      ctx.fillStyle = "#000"; ctx.fillRect(ox + 11, oy + 11, 10, 10);
      ctx.fillStyle = c1; ctx.fillRect(ox + 12, oy + 12, 8, 8); ctx.fillStyle = c2;
      if (fr % 2 === 0) {
        ctx.beginPath(); ctx.moveTo(ox + 12, oy + 14); ctx.lineTo(ox + 2, oy + 6); ctx.lineTo(ox + 6, oy + 16); ctx.fill();
        ctx.beginPath(); ctx.moveTo(ox + 20, oy + 14); ctx.lineTo(ox + 30, oy + 6); ctx.lineTo(ox + 26, oy + 16); ctx.fill();
      } else {
        ctx.beginPath(); ctx.moveTo(ox + 12, oy + 14); ctx.lineTo(ox + 2, oy + 22); ctx.lineTo(ox + 6, oy + 18); ctx.fill();
        ctx.beginPath(); ctx.moveTo(ox + 20, oy + 14); ctx.lineTo(ox + 30, oy + 22); ctx.lineTo(ox + 26, oy + 18); ctx.fill();
      }
      ctx.fillStyle = "#ef4444"; ctx.fillRect(ox + 14, oy + 14, 2, 2);
    } else {
      ctx.fillStyle = "#000"; ctx.fillRect(ox + 9, oy + 7, 14, 14); ctx.fillRect(ox + 7, oy + 13, 18, 8);
      ctx.fillStyle = c1; ctx.fillRect(ox + 10, oy + 8, 12, 12); ctx.fillStyle = c2; ctx.fillRect(ox + 8, oy + 14, 16, 6);
      ctx.fillStyle = c1; ctx.fillRect(ox + 12, oy + 20, 8, 8);
      ctx.fillStyle = "#ef4444"; ctx.fillRect(ox + 12, oy + 12, 2, 2); ctx.fillRect(ox + 18, oy + 12, 2, 2);
    }
  };
  d(0, 0, 0); d(32, f ? -3 : 2, 1); d(64, 0, 2); d(96, f ? 3 : -2, 3); return c.toDataURL();
}
