// Data for Recharge Packages
const PACKAGES_DATA = [
  // Cristales Estelares
  {
    id: 'pack_60',
    category: 'crystals',
    name: '60 Cristales Estelares',
    desc: 'Esencia cristalina condensada de los cielos de Miraland.',
    image: 'assets/crystals.jpg',
    basePriceUSD: 0.99,
    bonus: '+60 Bonus Primera Recarga',
    badge: 'X2 BONUS',
    isPopular: false
  },
  {
    id: 'pack_300',
    category: 'crystals',
    name: '300 + 30 Cristales Estelares',
    desc: 'Paquete de resonancia básica para invocar atuendos de fantasía.',
    image: 'assets/crystals.jpg',
    basePriceUSD: 4.99,
    bonus: '+300 Bonus Primera Recarga',
    badge: 'POPULAR',
    isPopular: true
  },
  {
    id: 'pack_980',
    category: 'crystals',
    name: '980 + 110 Cristales Estelares',
    desc: 'Gran acúmulo de polvo estelar para estilistas dedicadas.',
    image: 'assets/crystals.jpg',
    basePriceUSD: 14.99,
    bonus: '+980 Bonus Primera Recarga',
    badge: 'X2 BONUS',
    isPopular: false
  },
  {
    id: 'pack_1980',
    category: 'crystals',
    name: '1,980 + 260 Cristales Estelares',
    desc: 'Resonancia pura para confeccionar conjuntos milagrosos de 5 estrellas.',
    image: 'assets/crystals.jpg',
    basePriceUSD: 29.99,
    bonus: '+1,980 Bonus Primera Recarga',
    badge: 'RECOMENDADO',
    isPopular: true
  },
  {
    id: 'pack_3280',
    category: 'crystals',
    name: '3,280 + 600 Cristales Estelares',
    desc: 'Fuerza estelar masiva. Te asegura tiradas continuas en el gacha.',
    image: 'assets/crystals.jpg',
    basePriceUSD: 49.99,
    bonus: '+3,280 Bonus Primera Recarga',
    badge: 'MEJOR VALOR',
    isPopular: false
  },
  {
    id: 'pack_6480',
    category: 'crystals',
    name: '6,480 + 1,600 Cristales Estelares',
    desc: 'El cofre celestial máximo. Incluye marco de avatar exclusivo de Nikki.',
    image: 'assets/crystals.jpg',
    basePriceUSD: 99.99,
    bonus: '+6,480 Bonus Primera Recarga',
    badge: 'SUPREMO',
    isPopular: true
  },

  // Pases y Membresías
  {
    id: 'pass_monthly',
    category: 'passes',
    name: 'Bendición del Destino (30 Días)',
    desc: 'Obtén 300 Cristales de inmediato + 90 Cristales diarios por 30 días (Total: 3,000).',
    image: 'assets/monthly_pass.jpg',
    basePriceUSD: 4.99,
    bonus: 'Valor x10 Garantizado',
    badge: 'PASES VIP',
    isPopular: true
  },
  {
    id: 'pass_miracle',
    category: 'passes',
    name: 'Pase de Temporada Milagroso',
    desc: 'Desbloquea el atuendo exclusivo "Rosa Celeste", tintes de alta costura y 10 Cristales de Revelación.',
    image: 'assets/monthly_pass.jpg',
    basePriceUSD: 9.99,
    bonus: 'Vestido Exclusivo',
    badge: 'TEMPORADA',
    isPopular: true
  },

  // Paquetes Especiales de Costura / Materiales
  {
    id: 'pack_materials_starter',
    category: 'fashion',
    name: 'Cofre de la Diseñadora Novata',
    desc: 'Hilos de seda estelar x500, Botones mágicos x50 y 100,000 Monedas Bling.',
    image: 'assets/materials_chest.jpg',
    basePriceUSD: 2.99,
    bonus: 'Ahorro 70%',
    badge: 'OFERTA',
    isPopular: false
  },
  {
    id: 'pack_materials_grand',
    category: 'fashion',
    name: 'Gran Tesoro de Alta Costura',
    desc: 'Telas de ensueño radiantes x2,000, Agujas divinas x100 y Cristal de Revelación x10.',
    image: 'assets/materials_chest.jpg',
    basePriceUSD: 19.99,
    bonus: 'Materiales Raros',
    badge: 'EXCLUSIVO',
    isPopular: true
  }
];

// Currency rates relative to USD
const CURRENCY_RATES = {
  USD: { symbol: '$', rate: 1.0, decimals: 2 },
  EUR: { symbol: '€', rate: 0.92, decimals: 2 },
  MXN: { symbol: '$', rate: 18.5, decimals: 2 },
  ARS: { symbol: '$', rate: 1100.0, decimals: 0 },
  CLP: { symbol: '$', rate: 930.0, decimals: 0 }
};

// Current App State
let state = {
  currentCategory: 'crystals',
  currentCurrency: 'USD',
  selectedPackage: PACKAGES_DATA[1], // default 300 crystals
  selectedPaymentMethod: 'card',
  verifiedUser: {
    uid: '702914853',
    server: 'América (Florawish)',
    name: 'Nikki_Stylist🌸',
    level: 48,
    isVerified: true
  }
};

// Web Audio API Magical Chime
function playMagicalChime(type = 'select') {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    
    if (type === 'select') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } else if (type === 'success') {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.15, ctx.currentTime + idx * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.1 + 0.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.1);
        osc.stop(ctx.currentTime + idx * 0.1 + 0.5);
      });
    }
  } catch (e) {
    // Audio context may require prior user interaction
  }
}

// Convert Price formatted string
function formatPrice(usdPrice) {
  const curr = CURRENCY_RATES[state.currentCurrency];
  const converted = usdPrice * curr.rate;
  if (curr.decimals === 0) {
    return `${curr.symbol}${Math.round(converted).toLocaleString('es-ES')} ${state.currentCurrency}`;
  }
  return `${curr.symbol}${converted.toFixed(2)} ${state.currentCurrency}`;
}

// Render Packages Grid
function renderPackages() {
  const grid = document.getElementById('packages-grid');
  if (!grid) return;

  const filtered = PACKAGES_DATA.filter(pkg => pkg.category === state.currentCategory);
  
  grid.innerHTML = filtered.map(pkg => {
    const isSelected = state.selectedPackage && state.selectedPackage.id === pkg.id;
    return `
      <div class="package-card ${isSelected ? 'selected' : ''}" data-id="${pkg.id}">
        <span class="card-badge ${pkg.category === 'passes' ? 'monthly' : ''}">${pkg.badge}</span>
        <div class="card-image-wrap">
          <img src="${pkg.image}" alt="${pkg.name}" loading="lazy">
        </div>
        <div class="card-title">${pkg.name}</div>
        <div class="card-desc">${pkg.desc}</div>
        <div class="card-bonus-tag">
          <span>✨</span> ${pkg.bonus}
        </div>
        <div class="card-price-row">
          <span class="card-price">${formatPrice(pkg.basePriceUSD)}</span>
          <div class="card-select-btn">
            ${isSelected ? '✓' : '+'}
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Attach card click handlers
  grid.querySelectorAll('.package-card').forEach(card => {
    card.addEventListener('click', () => {
      const pkgId = card.getAttribute('data-id');
      const found = PACKAGES_DATA.find(p => p.id === pkgId);
      if (found) {
        state.selectedPackage = found;
        playMagicalChime('select');
        renderPackages();
        updateCheckoutSummary();
      }
    });
  });
}

// Update Checkout Summary Drawer
function updateCheckoutSummary() {
  const previewName = document.getElementById('summary-item-name');
  const previewAccount = document.getElementById('summary-account-info');
  const previewImg = document.getElementById('summary-item-img');
  const previewTotal = document.getElementById('summary-total-price');
  const checkoutBtn = document.getElementById('btn-checkout-submit');

  if (state.selectedPackage) {
    if (previewName) previewName.textContent = state.selectedPackage.name;
    if (previewImg) previewImg.src = state.selectedPackage.image;
    if (previewTotal) previewTotal.textContent = formatPrice(state.selectedPackage.basePriceUSD);
    
    if (state.verifiedUser.isVerified) {
      if (previewAccount) previewAccount.textContent = `UID: ${state.verifiedUser.uid} • ${state.verifiedUser.server}`;
      if (checkoutBtn) {
        checkoutBtn.disabled = false;
        checkoutBtn.innerHTML = `Completar Recarga Mágica <span>✦</span>`;
      }
    } else {
      if (previewAccount) previewAccount.textContent = 'Por favor verifica tu UID de jugador arriba';
      if (checkoutBtn) {
        checkoutBtn.disabled = true;
        checkoutBtn.textContent = 'Ingresa y Verifica tu UID';
      }
    }
  }
}

// Verify UID Handler
function setupUIDVerification() {
  const verifyBtn = document.getElementById('btn-verify-uid');
  const uidInput = document.getElementById('input-uid');
  const serverSelect = document.getElementById('select-server');
  const profileBox = document.getElementById('user-profile-box');
  const profileName = document.getElementById('profile-name');
  const profileMeta = document.getElementById('profile-meta');

  if (!verifyBtn || !uidInput) return;

  verifyBtn.addEventListener('click', () => {
    const val = uidInput.value.trim();
    if (val.length < 5) {
      alert('Por favor ingresa un UID válido (mínimo 5 dígitos).');
      uidInput.focus();
      return;
    }

    verifyBtn.disabled = true;
    verifyBtn.innerHTML = '✨ Verificando en Miraland...';

    setTimeout(() => {
      state.verifiedUser = {
        uid: val,
        server: serverSelect ? serverSelect.value : 'América (Florawish)',
        name: `Nikki_Estilista_${val.slice(-3)}`,
        level: Math.floor(Math.random() * 30) + 25,
        isVerified: true
      };

      if (profileName) profileName.textContent = state.verifiedUser.name;
      if (profileMeta) profileMeta.textContent = `Nivel ${state.verifiedUser.level} • Servidor: ${state.verifiedUser.server}`;
      if (profileBox) profileBox.style.display = 'flex';

      verifyBtn.disabled = false;
      verifyBtn.innerHTML = '✓ Cuenta Verificada';
      playMagicalChime('select');
      updateCheckoutSummary();
    }, 700);
  });
}

// Payment Methods Handler
function setupPaymentMethods() {
  const pmCards = document.querySelectorAll('.payment-method-card');
  pmCards.forEach(card => {
    card.addEventListener('click', () => {
      pmCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      state.selectedPaymentMethod = card.getAttribute('data-method');
      playMagicalChime('select');
    });
  });
}

// Category Tabs Handler
function setupTabs() {
  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      state.currentCategory = tab.getAttribute('data-tab');
      playMagicalChime('select');
      renderPackages();
    });
  });
}

// Currency Selector Handler
function setupCurrencySelector() {
  const selector = document.getElementById('currency-selector');
  if (!selector) return;
  selector.addEventListener('change', (e) => {
    state.currentCurrency = e.target.value;
    renderPackages();
    updateCheckoutSummary();
  });
}

// FAQ Accordion Handler
function setupFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    if (header) {
      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });
}

// Interactive Checkout Modal & Receipt
function setupModal() {
  const modal = document.getElementById('checkout-modal');
  const checkoutBtn = document.getElementById('btn-checkout-submit');
  const closeBtn = document.getElementById('btn-modal-close');
  const doneBtn = document.getElementById('btn-modal-done');

  if (!modal || !checkoutBtn) return;

  checkoutBtn.addEventListener('click', () => {
    if (!state.verifiedUser.isVerified) {
      alert('Ingresa y verifica tu UID de juego antes de continuar.');
      return;
    }

    // Populate receipt data
    const orderId = 'NIKKI-' + Math.floor(100000 + Math.random() * 900000);
    const dateStr = new Date().toLocaleDateString('es-ES', { 
      year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' 
    });

    document.getElementById('receipt-order-id').textContent = orderId;
    document.getElementById('receipt-date').textContent = dateStr;
    document.getElementById('receipt-uid').textContent = `${state.verifiedUser.uid} (${state.verifiedUser.name})`;
    document.getElementById('receipt-server').textContent = state.verifiedUser.server;
    document.getElementById('receipt-item').textContent = state.selectedPackage.name;
    document.getElementById('receipt-bonus').textContent = state.selectedPackage.bonus;
    document.getElementById('receipt-total').textContent = formatPrice(state.selectedPackage.basePriceUSD);
    
    // Method text
    const methodNames = {
      card: 'Tarjeta de Crédito / Débito',
      paypal: 'PayPal Express',
      apple_google: 'Apple / Google Pay',
      oxxo: 'Pago en Efectivo / OXXO',
      razer: 'Razer Gold / Pin'
    };
    document.getElementById('receipt-method').textContent = methodNames[state.selectedPaymentMethod] || 'Pago Seguro';

    modal.classList.add('open');
    playMagicalChime('success');
    triggerConfetti();
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => modal.classList.remove('open'));
  }

  if (doneBtn) {
    doneBtn.addEventListener('click', () => {
      modal.classList.remove('open');
      playMagicalChime('select');
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('open');
  });
}

// Confetti & Star Sparkles Animation
function triggerConfetti() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const sparkles = [];
  const colors = ['#ff7da7', '#ffd056', '#7fe5d9', '#ffffff', '#e0b0ff'];

  for (let i = 0; i < 90; i++) {
    sparkles.push({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      vx: (Math.random() - 0.5) * 16,
      vy: (Math.random() - 0.6) * 16,
      size: Math.random() * 6 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      decay: Math.random() * 0.015 + 0.01
    });
  }

  function renderSparkles() {
    let alive = false;
    sparkles.forEach(s => {
      s.x += s.vx;
      s.y += s.vy;
      s.vy += 0.25; // gravity
      s.alpha -= s.decay;

      if (s.alpha > 0) {
        alive = true;
        ctx.save();
        ctx.globalAlpha = Math.max(0, s.alpha);
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    });

    if (alive) {
      requestAnimationFrame(renderSparkles);
    }
  }

  renderSparkles();
}

// Background Twinkling Starlight Canvas
function initStarfieldCanvas() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const stars = [];
  const numStars = 65;

  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.8,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      alpha: Math.random(),
      alphaChange: (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
      isShooting: false
    });
  }

  function loop() {
    ctx.clearRect(0, 0, width, height);

    stars.forEach(star => {
      star.x += star.speedX;
      star.y += star.speedY;
      star.alpha += star.alphaChange;

      if (star.alpha <= 0.1 || star.alpha >= 0.9) {
        star.alphaChange = -star.alphaChange;
      }

      if (star.x < 0) star.x = width;
      if (star.x > width) star.x = 0;
      if (star.y < 0) star.y = height;
      if (star.y > height) star.y = 0;

      // Draw star
      ctx.save();
      ctx.globalAlpha = star.alpha;
      ctx.fillStyle = '#ffcce1';
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#ffd056';
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    requestAnimationFrame(loop);
  }

  loop();
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initStarfieldCanvas();
  renderPackages();
  updateCheckoutSummary();
  setupUIDVerification();
  setupPaymentMethods();
  setupTabs();
  setupCurrencySelector();
  setupFAQ();
  setupModal();
});
