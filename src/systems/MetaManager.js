import { TALENT_DEFS } from "../data/gameData.js";

export class MetaManager {
  constructor() {
    this.STORAGE_KEY = "SOUL_SURVIVOR_SAVE_V12";
    this.data = this.load();
  }

  load() {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      if (!raw) return this.defaultData();
      const d = JSON.parse(raw);
      if (!d.talents) d.talents = {};
      if (!d.unlocks) d.unlocks = { gunner: true, ether: true };
      return d;
    } catch {
      return this.defaultData();
    }
  }

  save() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.data));
  }

  defaultData() {
    return { gold: 0, talents: {}, unlocks: { gunner: true, ether: true } };
  }

  exportData() {
    return btoa(JSON.stringify(this.data));
  }

  importData(str) {
    try {
      const parsed = JSON.parse(atob(str));
      if (parsed && parsed.talents !== undefined) {
        this.data = parsed;
        this.save();
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  }

  getCost(id) {
    const def = TALENT_DEFS[id];
    const rank = this.data.talents[id] || 0;
    if (rank >= def.maxRank) return Infinity;
    return Math.floor(def.baseCost * Math.pow(def.costMult, rank));
  }

  upgradeTalent(id) {
    const cost = this.getCost(id);
    if (this.data.gold >= cost) {
      this.data.gold -= cost;
      this.data.talents[id] = (this.data.talents[id] || 0) + 1;
      this.save();
      return true;
    }
    return false;
  }

  getStats() {
    const t = this.data.talents;
    return {
      maxHp: 100 + (t.vitality || 0) * TALENT_DEFS.vitality.bonus,
      damageMult: 1.0 + (t.might || 0) * TALENT_DEFS.might.bonus,
      speedMult: 1.0 + (t.swiftness || 0) * TALENT_DEFS.swiftness.bonus,
      pickupMult: 1.0 + (t.magnetism || 0) * TALENT_DEFS.magnetism.bonus
    };
  }

  checkUnlocks(runStats) {
    let newUnlocks = [];
    if (!this.data.unlocks.rust && runStats.ogreKilled) {
      this.data.unlocks.rust = true;
      newUnlocks.push("Bosque Maldito");
    }
    if (!this.data.unlocks.golem && this.data.gold >= 1000) {
      this.data.unlocks.golem = true;
      newUnlocks.push("Clase: Caballero");
    }
    if (!this.data.unlocks.chronos && runStats.level >= 20) {
      this.data.unlocks.chronos = true;
      newUnlocks.push("Clase: Ladrón");
    }
    if (!this.data.unlocks.alchemist && runStats.kills >= 1000) {
      this.data.unlocks.alchemist = true;
      newUnlocks.push("Clase: Brujo");
    }
    if (!this.data.unlocks.sentinel && runStats.time >= 360) {
      this.data.unlocks.sentinel = true;
      newUnlocks.push("Clase: Clérigo");
    }
    if (newUnlocks.length > 0) this.save();
    return newUnlocks;
  }
}
