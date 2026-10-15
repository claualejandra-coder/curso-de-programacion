/**
 * HOLLOW KNIGHT: CRÓNICAS DE HALLOWNEST
 * Lógica del Simulador de Amuletos (11 Muescas), Efectos de Sonido Web Audio API,
 * Concentrador de Alma y HUD interactivo.
 */

// ==========================================
// BASE DE DATOS DE AMULETOS (CHARMS)
// ==========================================
const CHARMS_DATA = [
  {
    id: 'wayward-compass',
    name: 'Brújula Caprichosa',
    cost: 1,
    icon: '🧭',
    desc: 'Señala tu ubicación exacta en el mapa de Hallownest. Indispensable para no perderse en las cavernas subterráneas.',
    effect: 'Muestra ubicación en el mapa'
  },
  {
    id: 'soul-catcher',
    name: 'Atrapaalmas',
    cost: 2,
    icon: '🔮',
    desc: 'Un talismán que atrae y captura una cantidad adicional de alma cada vez que golpeas con el aguijón.',
    effect: '+3 Alma por golpe de aguijón'
  },
  {
    id: 'shaman-stone',
    name: 'Piedra de Chamán',
    cost: 3,
    icon: '🌀',
    desc: 'Gema pulida por los antiguos chamanes Caracol. Aumenta descomunalmente el tamaño y el daño de los hechizos.',
    effect: '+33% Potencia y área de Hechizos'
  },
  {
    id: 'soul-eater',
    name: 'Devorador de Almas',
    cost: 4,
    icon: '🧿',
    desc: 'Tallado para absorber ingentes torrentes de alma de cualquier criatura viviente o infectada.',
    effect: '+8 Alma adicional por golpe'
  },
  {
    id: 'unbreakable-strength',
    name: 'Fuerza Inquebrantable',
    cost: 3,
    icon: '🗡️',
    desc: 'Imbuido por la llama voraz de Comepiernas y Madame Salubra. Fortalece los músculos de quien empuña el aguijón.',
    effect: '+50% Daño de Ataques con Aguijón'
  },
  {
    id: 'mark-of-pride',
    name: 'Marca del Orgullo',
    cost: 3,
    icon: '🛡️',
    desc: 'Regalo de agradecimiento concedido por los nobles Señores de las Mantis tras derrotarlos con honor.',
    effect: '+25% Alcance del Aguijón'
  },
  {
    id: 'quick-slash',
    name: 'Corte Rápido',
    cost: 3,
    icon: '⚡',
    desc: 'Nacido en las forjas de los grandes maestros del aguijón. Permite realizar tajos consecutivos a velocidad sobrenatural.',
    effect: '+35% Velocidad de Golpe'
  },
  {
    id: 'sharp-shadow',
    name: 'Sombra Afilada',
    cost: 2,
    icon: '🌑',
    desc: 'Contiene una brizna pura de la sustancia del Vacío. Al esprintar con la Capa Sombría, corta y daña a los enemigos.',
    effect: 'El sprint sombrío inflige daño de aguijón'
  },
  {
    id: 'shape-of-unn',
    name: 'Forma de Unn',
    cost: 2,
    icon: '🐌',
    desc: 'Revela la verdadera forma de la criatura nacida en el Lago de Unn. Permite desplazarse por el suelo mientras concentras alma.',
    effect: 'Movilidad al curarse con Alma'
  },
  {
    id: 'quick-focus',
    name: 'Concentración Rápida',
    cost: 3,
    icon: '✨',
    desc: 'Un talismán de alabastro que canaliza las frecuencias del alma al doble de velocidad.',
    effect: '-50% Tiempo para curar máscaras'
  },
  {
    id: 'hiveblood',
    name: 'Sangrecolmena',
    cost: 4,
    icon: '🐝',
    desc: 'Gotea el néctar dorado milagroso de la Colmena. Cura automáticamente la última máscara de salud perdida.',
    effect: 'Regeneración pasiva de salud'
  },
  {
    id: 'defenders-crest',
    name: 'Blasón del Defensor',
    cost: 1,
    icon: '💩',
    desc: 'Trofeo otorgado por el noble Ogrim, el Caballero del Estiércol. Desprende una nube de gas heroico.',
    effect: 'Aura de daño tóxico constante'
  },
  {
    id: 'grubsong',
    name: 'Canción de Larvas',
    cost: 1,
    icon: '🐛',
    desc: 'La melodía dulce y agradecida de las larvas liberadas. Otorga alma cada vez que recibes un impacto enemigo.',
    effect: 'Genera alma al sufrir daño'
  },
  {
    id: 'sprintmaster',
    name: 'Maestro de la Carrera',
    cost: 1,
    icon: '👟',
    desc: 'Un talismán de viento ligero que estimula los pies del portador, otorgándole agilidad superior en tierra.',
    effect: '+20% Velocidad al caminar y correr'
  }
];

// ==========================================
// ESTADO GLOBAL DE AMULETOS Y RECURSOS
// ==========================================
const HK_State = {
  maxNotches: 11,
  equippedIds: [],
  geo: 2450,
  soul: 99,
  soundEnabled: true,

  getTotalNotches() {
    return this.equippedIds.reduce((total, id) => {
      const charm = CHARMS_DATA.find(c => c.id === id);
      return total + (charm ? charm.cost : 0);
    }, 0);
  },

  isOvercharmed() {
    return this.getTotalNotches() > this.maxNotches;
  }
};

// ==========================================
// SINTETIZADOR DE SONIDO MÍSTICO (Web Audio API)
// ==========================================
class HKSound {
  constructor() {
    this.ctx = null;
  }

  ensure() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  slash() {
    if (!HK_State.soundEnabled) return;
    try {
      this.ensure();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Golpe metálico de aguijón
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.12);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.13);
    } catch (e) {
      console.warn(e);
    }
  }

  focus() {
    if (!HK_State.soundEnabled) return;
    try {
      this.ensure();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Concentración de alma (zumbido etéreo armónico)
      [440, 554.37, 659.25, 880].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);
        osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + 0.4);

        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.05);
        osc.stop(now + 0.46);
      });
    } catch (e) {
      console.warn(e);
    }
  }

  geo() {
    if (!HK_State.soundEnabled) return;
    try {
      this.ensure();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Tintineo de Geo cristalino
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.setValueAtTime(1800, now + 0.05);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.16);
    } catch (e) {
      console.warn(e);
    }
  }

  overcharm() {
    if (!HK_State.soundEnabled) return;
    try {
      this.ensure();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Pulso siniestro de sobrecarga
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(95, now);
      osc.frequency.linearRampToValueAtTime(75, now + 0.35);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.36);
    } catch (e) {
      console.warn(e);
    }
  }
}

const AudioSFX = new HKSound();

// ==========================================
// RENDERIZADO DE AMULETOS Y MUESCAS
// ==========================================
function renderCharmsGrid() {
  const container = document.getElementById('charms-grid');
  if (!container) return;

  container.innerHTML = CHARMS_DATA.map(charm => {
    const isEquipped = HK_State.equippedIds.includes(charm.id);
    const diamonds = '◆'.repeat(charm.cost) + '◇'.repeat(Math.max(0, 4 - charm.cost));

    return `
      <div 
        class="charm-card ${isEquipped ? 'is-equipped' : ''}" 
        onclick="toggleCharm('${charm.id}')"
        title="Haz clic para ${isEquipped ? 'desequipar' : 'equipar'} este amuleto"
      >
        <div class="charm-top">
          <div class="charm-icon-wrap">${charm.icon}</div>
          <div class="charm-meta">
            <h3>${charm.name}</h3>
            <div class="charm-cost">
              <span>Muescas:</span>
              <span class="notches-diamonds">${diamonds}</span>
              <span>(${charm.cost})</span>
            </div>
          </div>
        </div>
        <p class="charm-desc">${charm.desc}</p>
        <div class="charm-tag-effect">
          ✦ ${charm.effect}
        </div>
      </div>
    `;
  }).join('');

  updateNotchesDashboard();
}

function updateNotchesDashboard() {
  const countEl = document.getElementById('notches-count');
  const warnEl = document.getElementById('overcharmed-warn');
  const slotsContainer = document.getElementById('notches-visual-slots');
  const tagsContainer = document.getElementById('equipped-charms-tags');

  const total = HK_State.getTotalNotches();
  const isOver = HK_State.isOvercharmed();

  if (countEl) {
    countEl.textContent = `${total} / ${HK_State.maxNotches} Muescas`;
    countEl.style.color = isOver ? '#ff7b1c' : 'var(--hk-soul-cyan)';
    countEl.style.borderColor = isOver ? 'rgba(255, 123, 28, 0.5)' : 'rgba(127, 231, 247, 0.3)';
  }

  if (warnEl) {
    warnEl.style.display = isOver ? 'flex' : 'none';
  }

  // Visual Slots
  if (slotsContainer) {
    let slotsHTML = '';
    const displaySlots = Math.max(HK_State.maxNotches, total);

    for (let i = 1; i <= displaySlots; i++) {
      const isFilled = i <= total;
      const isOverSlot = i > HK_State.maxNotches;
      const slotClass = isFilled ? (isOverSlot ? 'notch-slot filled overcharmed' : 'notch-slot filled') : 'notch-slot';
      slotsHTML += `<div class="${slotClass}">${isFilled ? '◆' : i}</div>`;
    }
    slotsContainer.innerHTML = slotsHTML;
  }

  // Tags de Amuletos Equipados
  if (tagsContainer) {
    if (HK_State.equippedIds.length === 0) {
      tagsContainer.innerHTML = `<span style="color: #64748b; font-size: 0.85rem; font-style: italic;">Ningún amuleto equipado actualmente. Haz clic en las tarjetas de abajo.</span>`;
    } else {
      tagsContainer.innerHTML = HK_State.equippedIds.map(id => {
        const charm = CHARMS_DATA.find(c => c.id === id);
        if (!charm) return '';
        return `
          <div class="equipped-chip" onclick="toggleCharm('${charm.id}')" title="Clic para desequipar">
            <span>${charm.icon}</span>
            <span>${charm.name} (${charm.cost})</span>
            <span style="font-weight: bold; color: #ff6b72;">✕</span>
          </div>
        `;
      }).join('');
    }
  }
}

function toggleCharm(charmId) {
  const charm = CHARMS_DATA.find(c => c.id === charmId);
  if (!charm) return;

  const idx = HK_State.equippedIds.indexOf(charmId);

  if (idx !== -1) {
    // Desequipar
    HK_State.equippedIds.splice(idx, 1);
    AudioSFX.slash();
  } else {
    // Equipar
    HK_State.equippedIds.push(charmId);
    if (HK_State.isOvercharmed()) {
      AudioSFX.overcharm();
      showHKToast(`¡SOBRECARGADO! Has superado las 11 muescas. Recibirás el doble de daño.`, 'warn');
    } else {
      AudioSFX.slash();
      showHKToast(`Amuleto equipado: ${charm.name}`, 'soul');
    }
  }

  renderCharmsGrid();
}

function clearCharms() {
  if (HK_State.equippedIds.length === 0) return;
  HK_State.equippedIds = [];
  AudioSFX.slash();
  renderCharmsGrid();
  showHKToast('Todas las muescas han sido desequipadas.', 'soul');
}

// Builds Predefinidas
function loadPreset(buildName) {
  if (buildName === 'sword') {
    // Build de Aguijón Rápido y Daño (10 muescas)
    HK_State.equippedIds = ['unbreakable-strength', 'quick-slash', 'mark-of-pride', 'wayward-compass'];
    showHKToast('Build equipada: "Maestro del Aguijón"', 'soul');
  } else if (buildName === 'magic') {
    // Build de Hechizos Chamanes (11 muescas)
    HK_State.equippedIds = ['shaman-stone', 'soul-catcher', 'soul-eater', 'quick-focus'];
    showHKToast('Build equipada: "Mago del Alma y Hechizos"', 'soul');
  } else if (buildName === 'explorer') {
    // Build de Explorador y Supervivencia (8 muescas)
    HK_State.equippedIds = ['wayward-compass', 'shape-of-unn', 'grubsong', 'sprintmaster', 'quick-focus'];
    showHKToast('Build equipada: "Explorador de Hallownest"', 'soul');
  }
  AudioSFX.focus();
  renderCharmsGrid();
}

// ==========================================
// ACCIONES HUD (GEO & ALMA)
// ==========================================
function addGeo() {
  HK_State.geo += 50;
  AudioSFX.geo();
  const geoEl = document.getElementById('geo-val');
  if (geoEl) geoEl.textContent = HK_State.geo.toLocaleString();
  showHKToast('+50 Geo obtenido de las profundidades', 'geo');
}

function focusSoul() {
  AudioSFX.focus();
  const vessel = document.getElementById('soul-vessel');
  if (vessel) {
    vessel.style.transform = 'scale(1.15)';
    setTimeout(() => vessel.style.transform = 'scale(1)', 300);
  }
  showHKToast('¡Alma concentrada! Máscara de salud restaurada.', 'soul');
}

// Toast Notificaciones
function showHKToast(message, type = 'soul') {
  let container = document.getElementById('hk-toast-box');
  if (!container) {
    container = document.createElement('div');
    container.id = 'hk-toast-box';
    container.style.cssText = `
      position: fixed; bottom: 2rem; right: 2rem; display: flex; flex-direction: column; gap: 0.6rem; z-index: 9999; pointer-events: none;
    `;
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  const borderCol = type === 'warn' ? '#ff7b1c' : (type === 'geo' ? '#fbbf24' : '#7fe7f7');
  const bgCol = type === 'warn' ? 'rgba(35, 15, 8, 0.95)' : 'rgba(8, 14, 24, 0.95)';

  toast.style.cssText = `
    background: ${bgCol}; color: #fff; border: 1px solid ${borderCol};
    box-shadow: 0 10px 25px rgba(0,0,0,0.8), 0 0 15px ${borderCol}44;
    padding: 0.75rem 1.25rem; border-radius: 999px; font-family: 'Cinzel', serif; font-size: 0.85rem;
    display: flex; align-items: center; gap: 0.6rem; animation: hk-fade-in 0.3s ease;
  `;

  toast.innerHTML = `<span>${type === 'warn' ? '⚠️' : (type === 'geo' ? '🪙' : '✧')}</span> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  renderCharmsGrid();

  const geoBtn = document.getElementById('geo-counter');
  if (geoBtn) geoBtn.addEventListener('click', addGeo);

  const soulBtn = document.getElementById('soul-vessel');
  if (soulBtn) soulBtn.addEventListener('click', focusSoul);
});
