export const MAPS = {
  ether: { id: 'ether', name: 'Catacumbas', desc: 'Piedra fría oscura.', color: '#94a3b8', bg1: '#1c1917', bg2: '#292524', unlocked: true },
  rust: { id: 'rust', name: 'Bosque Maldito', desc: 'Pantano tóxico.', color: '#4ade80', bg1: '#142015', bg2: '#1b2d1c', reqDesc: 'Derrota al Rey Ogro (Minuto 2)' }
};
export const CLASSES = {
  gunner: { id: 'gunner', name: 'Arquero', weapon: 'brass_revolver', desc: 'Disparo rápido', hpMod: 0, spdMod: 0, unlocked: true },
  golem: { id: 'golem', name: 'Caballero', weapon: 'steam_vortex', desc: 'Aura de Daño', hpMod: 50, spdMod: -25, reqDesc: 'Acumula 1000 Oro total' },
  chronos: { id: 'chronos', name: 'Ladrón', weapon: 'galvanic_strike', desc: 'Críticos altos', hpMod: -25, spdMod: 35, reqDesc: 'Alcanza el Nivel 20' },
  alchemist: { id: 'alchemist', name: 'Brujo', weapon: 'acid_flask', desc: 'Charcos veneno', hpMod: 10, spdMod: 0, reqDesc: 'Elimina 1000 criaturas en 1 partida' },
  sentinel: { id: 'sentinel', name: 'Clérigo', weapon: 'aether_chains', desc: 'Armas giratorias', hpMod: 35, spdMod: -15, reqDesc: 'Sobrevive 6 Minutos' }
};
export const TALENT_DEFS = {
  vitality: { name: 'Sangre Fuerte', desc: '+20 HP Máx', baseCost: 40, costMult: 1.5, maxRank: 5, bonus: 20 },
  might: { name: 'Fuerza Bruta', desc: '+8% Daño', baseCost: 60, costMult: 1.6, maxRank: 5, bonus: 0.08 },
  swiftness: { name: 'Botas Ligeras', desc: '+5% Velocidad', baseCost: 40, costMult: 1.4, maxRank: 5, bonus: 0.05 },
  magnetism: { name: 'Imán de Oro', desc: '+20% Radio', baseCost: 30, costMult: 1.3, maxRank: 5, bonus: 0.20 }
};
export const UPGRADE_POOL = [
  { id: 'brass_revolver', name: 'Dagas', isPass: false, desc: 'Disparo continuo.', maxLvl: 5 },
  { id: 'steam_vortex', name: 'Aura Fuego', isPass: false, desc: 'Aura circular.', maxLvl: 5 },
  { id: 'galvanic_strike', name: 'Rayo Divino', isPass: false, desc: 'Rayos del cielo.', maxLvl: 5 },
  { id: 'gear_launcher', name: 'Hachas', isPass: false, desc: 'Hachas perforan.', maxLvl: 5 },
  { id: 'acid_flask', name: 'Frasco Veneno', isPass: false, desc: 'Charco tóxico.', maxLvl: 5 },
  { id: 'aether_chains', name: 'Biblia', isPass: false, desc: 'Libros giran.', maxLvl: 5 },
  { id: 'volatile_oil', name: 'Anillo Poder', isPass: true, desc: '+15% Daño.', maxLvl: 5 },
  { id: 'pressure_boiler', name: 'Capa Extensa', isPass: true, desc: '+20% Área.', maxLvl: 5 },
  { id: 'cobalt_magnet', name: 'Orbe Atracción', isPass: true, desc: '+30% Radio.', maxLvl: 5 }
];
export const EVOLUTIONS = {
  soul_gatling: { id: 'soul_gatling', name: 'MIL DAGAS', baseWeapon: 'brass_revolver', reqPassive: 'volatile_oil', desc: '¡EVOLUCIÓN!' },
  aether_furnace: { id: 'aether_furnace', name: 'INFIERNO', baseWeapon: 'steam_vortex', reqPassive: 'pressure_boiler', desc: '¡EVOLUCIÓN!' },
  tesla_judgement: { id: 'tesla_judgement', name: 'COLERA', baseWeapon: 'galvanic_strike', reqPassive: 'cobalt_magnet', desc: '¡EVOLUCIÓN!' },
  plague_deluge: { id: 'plague_deluge', name: 'PESTE', baseWeapon: 'acid_flask', reqPassive: 'volatile_oil', desc: '¡EVOLUCIÓN!' },
  thorn_vortex: { id: 'thorn_vortex', name: 'VISPERAS', baseWeapon: 'aether_chains', reqPassive: 'pressure_boiler', desc: '¡EVOLUCIÓN!' }
};
