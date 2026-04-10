// --- APEX SECURITY & REMOTE CONTROL ---
(function() {
  window.apex_checkout_url = "https://lastlink.com/p/CAA303628/checkout-payment/"; // Fallback
  
  async function initSecurity() {
    try {
      // 1. Busca configuração (fallback local ou API se disponível)
      const resp = await fetch('/config.json');
      const config = await resp.json();
      window.apex_checkout_url = config.checkout_url;
      const official = config.official_domain;
      
      // 2. Verificação de Domínio (Anti-Clone)
      const currentHost = window.location.hostname;
      const isLocal = currentHost === 'localhost' || currentHost === '127.0.0.1' || currentHost === '0.0.0.0';
      
      if (official && currentHost !== official && !isLocal && !currentHost.includes('vercel.app')) {
        console.warn('Ambiente não autorizado detectado.');
        // Reporta o clone silenciosamente
        fetch('/api/report', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            domain: currentHost,
            path: window.location.pathname,
            timestamp: new Date().toISOString()
          })
        }).catch(() => {});
      }
    } catch (e) {
      console.error('Security Init Error:', e);
    }
  }
  initSecurity();
})();

// 15 Core Questions with Image-based types
const quizData = [
  {
    type: "multi-slider", 
    question: "Para personalizar seu protocolo, preciso de 2 dados:",
    sliders: [
      { id: "age", label: "Idade", min: 18, max: 80, initial: 32, unit: " anos", statusLabels: { 18: "JOVEM", 40: "ADULTO", 60: "SÊNIOR" } },
      { id: "weight", label: "Peso", min: 50, max: 150, initial: 80, unit: "kg", statusLabels: { 50: "LEVE", 85: "MÉDIO", 110: "PESADO" } }
    ],
    checkbox: "Prefiro não informar peso exato"
  },
  {
    type: "gradient-slider",
    question: "Qual sua média de sono por noite?",
    min: 3,
    max: 10,
    initial: 7,
    unit: "h",
    statusLabels: { 3: "Insuficiente", 6: "Regular", 8: "Ideal", 10: "Excesso" }
  },
  {
    type: "multi-choice",
    question: "Sobre sua energia e disposição diária",
    subtitle: "Selecione o que você sente com frequência",
    options: ["Energia Constante", "Cansaço à Tarde", "Sono não Reparador", "Estresse no Trabalho", "Foco e Clareza", "Névoa Mental", "Alta Libido", "Baixa Disposição"]
  },
  {
    type: "xy-pad", 
    question: "Mapeie sua rotina diária", 
    labels: { top: "ATIVO", bottom: "SEDENTÁRIO", left: "TRABALHO FÍSICO", right: "ESCRITÓRIO/HOME OFFICE" },
    subtitles: { top: "Atleta/Atividade Intensa", bottom: "Pouca Movimentação", left: "Trabalho Braçal", right: "Longas Horas Sentado" },
    descriptions: { top: "Corpo em movimento constante", bottom: "Rotina predominantemente estática", left: "Exigência física profissional", right: "Risco alto de compressão pélvica" }
  },
  {type: "choice", question: "SINAL DE VIGOR: Com que frequência você acorda pronto para a ação?", options: ["Nunca", "Raramente (1-2x por semana)", "Frequentemente (3-4x)", "Sempre (Sinal de saúde plena)"]},
  {type: "choice", question: "CONTROLE ABSOLUTO: Quanto tempo você domina a performance antes de chegar ao ápice?", options: ["Gostaria de durar mais", "2 a 7 minutos (Média)", "7 a 15 minutos (Boa)", "Mais de 15 minutos (Excelente)"]},
  {type: "rating", question: "POTÊNCIA: Em uma escala de 1 a 5, como você avalia sua rigidez no momento de pico?", options: ["1", "2", "3", "4", "5"], label: "Rigidez"},
  {type: "rating", question: "NÍVEL DE SATISFAÇÃO: Quão realizado você se sente com sua performance atual?", options: ["1", "2", "3", "4", "5"], label: "Satisfação"},
  {type: "choice", question: "IMPACTO PSICOLÓGICO: Esses episódios chegam a abalar sua segurança na hora H?", options: ["Sim, sinto muita insegurança", "Às vezes perco o foco", "Não, me sinto confiante"]},
  {type: "choice", question: "Você utiliza tabaco ou vapes com frequência?", options: ["Sim, diariamente", "Ocasionalmente", "Não utilizo"]},
  {
    type: "rating", 
    question: "Como você avalia sua qualidade alimentar?", 
    options: ["1", "2", "3", "4", "5"], 
    label: "Saúde"
  },
  {
    type: "gradient-slider",
    question: "Como você classificaria seu nível de estresse recente?",
    min: 0,
    max: 10,
    initial: 5,
    unit: "",
    statusLabels: { 0: "Zen", 4: "Moderado", 7: "Elevado", 9: "Crítico" }
  },
  {
    type: "choice",
    question: "Qual sua frequência de consumo de álcool ou estimulantes?",
    options: ["Raramente / Nunca", "Socialmente (1-2x semana)", "Frequentemente (3-4x)", "Diariamente"]
  },
  {
    type: "visual-choice",
    question: "Análise de Tensão Pélvica: Identifique sua condição atual",
    image: "pelvic_blood_flow_diagram_1775301438774.png",
    options: ["Leveza e Vigor (Fluxo Otimizado)", "Tensão Ocasional (Fluxo Regular)", "Peso e Congestão (Fluxo Restrito)", "Desconforto Constante (Fluxo Crítico)"],
    objective: "Mapeamento Biológico"
  },
  {
    type: "choice", 
    question: "TRANSFORMAÇÃO: Qual desses resultados mudaria seu jogo hoje?", 
    options: ["Controle Absoluto e Duradouro", "Rigidez e Firmeza Superior", "Aumento Explosivo de Libido", "Performance e Saúde Preventiva", "Energia e Vigor Inabalável"]
  }
];

const inspirations = [
  {
    step: 5, 
    title: "Sua Condição Tem Solução.",
    image: "vitality.png", 
    text: "Não importa seu nível atual. Nosso algoritmo já identificou padrões nas suas respostas. Homens com sintomas semelhantes dão um basta na frustração e recuperam o vigor em semanas."
  },
  {
    step: 10, 
    title: "A Ciência da Alta Performance",
    image: "couple.png", 
    text: "O segredo dos homens de alta performance não são pílulas perigosas. Com bio-otimização natural, você restaura sua confiança e desperta a admiração da parceira. A sua cura definitiva está quase pronta."
  },
  {
    step: 15, 
    title: "Diagnóstico Finalizado.",
    image: "badge.png", 
    text: "Analisamos cada um dos seus inputs. Existe um caminho rigoroso e validado para você reativar sua performance máxima. Pare de perder oportunidades e veja sua solução exata agora."
  }
];

let currentStep = 0;
let selections = {};
let isShowingInspiration = false;
let finalAnalysisData = null;

const mainContent = document.getElementById('main-content');
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const backBtn = document.getElementById('back-btn');
const progressFill = document.getElementById('progress-fill');
const socialTicker = document.getElementById('social-ticker');
const heroSection = document.getElementById('hero');
const quizRoot = document.getElementById('quiz-root');

// --- Optimized GSAP Entrance ---
window.addEventListener('DOMContentLoaded', () => {
  const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });
  
  // Community Feedback appears ALMOST instantly (0.1s offset)
  tl.from("#social-proof-section", { y: 15, opacity: 0, duration: 0.5 }, 0.1)
    .from(".hero-badge", { y: 20, opacity: 0, duration: 0.6 }, "-=0.2")
    .from(".hero-title", { y: 30, opacity: 0, stagger: 0.08 }, "-=0.4")
    .from(".hero-subtitle", { y: 15, opacity: 0 }, "-=0.4")
    .from(".hero-cta-btn", { scale: 0.95, opacity: 0, duration: 0.4 }, "-=0.3");
});

function startQuiz() {
  const socialProof = document.getElementById('social-proof-section');
  if (socialProof) socialProof.style.display = 'none';
  
  gsap.to(heroSection, {
    opacity: 0,
    y: -30,
    duration: 0.5,
    ease: "power3.inOut",
    onComplete: () => {
      heroSection.style.display = 'none';
      quizRoot.style.display = 'block';
      gsap.fromTo(quizRoot, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 });
      renderStep(true); // Initial scroll to top
    }
  });
}

/**
 * Renders the current quiz step.
 * @param {boolean} shouldScroll - Whether to scroll to the top of the page.
 */
function renderStep(shouldScroll = false) {
  const step = quizData[currentStep];
  
  gsap.to(mainContent, { 
    opacity: 0, 
    y: 5, 
    duration: 0.15, 
    onComplete: () => {
      // Dynamic Social Proof Indicator
      if (!window.globalProofVal) {
        window.globalProofVal = Math.floor(Math.random() * (142 - 110 + 1)) + 110;
      }
      const proofEl = document.getElementById('social-proof-indicator');
      if (proofEl) proofEl.innerText = `${window.globalProofVal} homens iniciaram seu plano nas últimas 24h`;
      
      // ONLY scroll if explicitly requested (e.g., new step)
      if (shouldScroll) {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }

      isShowingInspiration = false;
      nextBtn.innerText = "Continuar";
      
      questionEl.style.display = 'block';
      questionEl.innerText = step.question;
      optionsEl.innerHTML = '';
      
      const totalSteps = quizData.length;
      const progress = ((currentStep + 1) / totalSteps) * 100;
      progressFill.style.width = `${progress}%`;
      document.getElementById('step-counter').innerText = `${String(currentStep + 1).padStart(2, '0')} / ${String(totalSteps).padStart(2, '0')}`;

      if (step.type === 'multi-slider') {
        renderMultiSlider(step);
      } else if (step.type === 'gradient-slider') {
        renderGradientSlider(step);
      } else if (step.type === 'multi-choice') {
        renderMultiChoice(step);
      } else if (step.type === 'xy-pad') {
        renderXYPad(step);
      } else if (step.type === 'choice') {
        renderChoice(step);
      } else if (step.type === 'rating') {
        renderRating(step);
      } else if (step.type === 'visual-choice') {
        renderVisualChoice(step);
      }

      backBtn.style.display = currentStep > 0 ? 'block' : 'none';
      updateNextButton();
      
      gsap.to(mainContent, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" });
    }
  });
}

// --- Specific Renderers ---

function renderMultiSlider(step) {
  const container = document.createElement('div');
  container.className = 'dual-slider-container';
  const currentVals = selections[currentStep] || {};
  
  step.sliders.forEach(s => {
    if (currentVals[s.id] === undefined) currentVals[s.id] = s.initial;
    const group = document.createElement('div');
    group.className = 'slider-group';
    
    const getStatus = (val) => {
      let label = "";
      Object.keys(s.statusLabels).forEach(k => { if (val >= parseFloat(k)) label = s.statusLabels[k]; });
      return label;
    };

    group.innerHTML = `
      <div class="slider-header"><span class="slider-label">${s.label}</span><span class="slider-status-tag" id="status-${s.id}">${getStatus(currentVals[s.id])}</span></div>
      <div class="slider-large-value"><span id="val-${s.id}">${currentVals[s.id]}</span>${s.unit}</div>
      <input type="range" class="custom-slider" min="${s.min}" max="${s.max}" step="1" value="${currentVals[s.id]}">
    `;
    
    const input = group.querySelector('input');
    input.oninput = (e) => {
      currentVals[s.id] = e.target.value;
      group.querySelector(`#val-${s.id}`).innerText = e.target.value;
      group.querySelector(`#status-${s.id}`).innerText = getStatus(e.target.value);
      selections[currentStep] = { ...currentVals };
      updateNextButton();
    };
    container.appendChild(group);
  });
  optionsEl.appendChild(container);
  if (selections[currentStep] === undefined) selections[currentStep] = { ...currentVals };
}

function renderGradientSlider(step) {
  if (selections[currentStep] === undefined) selections[currentStep] = step.initial;
  const val = selections[currentStep];
  const getStatus = (v) => {
    let label = "";
    Object.keys(step.statusLabels).forEach(k => { if (v >= parseFloat(k)) label = step.statusLabels[k]; });
    return label;
  };

  const container = document.createElement('div');
  container.innerHTML = `
    <div class="slider-large-value" style="margin-top: 20px;"><span id="grad-val">${val}</span>${step.unit}</div>
    <div style="text-align: center; color: rgba(255,255,255,0.5); margin-bottom: 30px; font-weight: 600;" id="grad-status">${getStatus(val)}</div>
    <div class="gradient-slider-track relative"><input type="range" class="custom-slider" min="${step.min}" max="${step.max}" value="${val}" style="position: absolute; top: -12px; left: 0; width: 100%; height: 30px; z-index: 10;"></div>
  `;
  
  const input = container.querySelector('input');
  input.oninput = (e) => {
    selections[currentStep] = e.target.value;
    container.querySelector('#grad-val').innerText = e.target.value;
    container.querySelector('#grad-status').innerText = getStatus(e.target.value);
    nextBtn.innerText = `Confirmar ${e.target.value}${step.unit} >`;
  };
  nextBtn.innerText = `Confirmar ${val}${step.unit} >`;
  optionsEl.appendChild(container);
}

function renderMultiChoice(step) {
  const sub = document.createElement('p');
  sub.className = 'sub-question';
  sub.innerText = step.subtitle;
  optionsEl.appendChild(sub);

  const grid = document.createElement('div');
  grid.className = 'multi-choice-grid';
  const selected = selections[currentStep] || [];
  
  step.options.forEach((opt, idx) => {
    const card = document.createElement('div');
    card.className = `option-card ${selected.includes(idx) ? 'multi-selected' : ''}`;
    card.innerHTML = `<span class="option-text">${opt}</span><div class="check-circle" style="${selected.includes(idx) ? 'background:#000;' : ''}"><i data-lucide="check" class="w-3 h-3 text-white ${selected.includes(idx) ? '' : 'hidden'}"></i></div>`;
    card.onclick = () => {
      if (selected.includes(idx)) selected.splice(selected.indexOf(idx), 1);
      else selected.push(idx);
      selections[currentStep] = selected;
      renderStep(false); // DO NOT SCROLL on multi-choice selection
    };
    grid.appendChild(card);
  });
  optionsEl.appendChild(grid);
  lucide.createIcons();
}

function renderXYPad(step) {
  const headerInfo = document.createElement('div');
  headerInfo.style.textAlign = 'center';
  headerInfo.style.marginBottom = '20px';
  headerInfo.innerHTML = `<h3 id="xy-sub" style="font-size: 24px; color: #fff; margin-bottom: 5px;">...</h3><p id="xy-desc" style="color: rgba(255,255,255,0.4); font-size: 14px;">...</p>`;
  optionsEl.appendChild(headerInfo);

  const padContainer = document.createElement('div');
  padContainer.className = 'xy-pad-modern';
  padContainer.innerHTML = `
    <div class="xy-axis-modern xy-axis-v"></div><div class="xy-axis-modern xy-axis-h"></div>
    <div class="xy-axis-label label-top">${step.labels.top}</div><div class="xy-axis-label label-bottom">${step.labels.bottom}</div>
    <div class="xy-axis-label label-left">${step.labels.left}</div><div class="xy-axis-label label-right">${step.labels.right}</div>
    <div id="xy-handle" class="xy-handle-target" style="left: 50%; top: 50%;"><div class="target-outer"></div><div class="target-inner"></div><div class="target-dot"></div></div>
  `;
  
  const handleMove = (e) => {
    const rect = padContainer.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX || (e.touches && e.touches[0].clientX)) - rect.left) / rect.width * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY || (e.touches && e.touches[0].clientY)) - rect.top) / rect.height * 100));
    const handle = padContainer.querySelector('#xy-handle');
    handle.style.left = `${x}%`; handle.style.top = `${y}%`;
    selections[currentStep] = { x, y };
    updateDynamicLabels(x, y);
    updateNextButton();
  };

  const updateDynamicLabels = (x, y) => {
    let sub = "", desc = "";
    if (x >= 50 && y <= 50) { sub = step.subtitles.top; desc = step.descriptions.top; }
    else if (x < 50 && y <= 50) { sub = step.subtitles.left; desc = step.descriptions.left; }
    else if (x < 50 && y > 50) { sub = step.subtitles.bottom; desc = step.descriptions.bottom; }
    else { sub = step.subtitles.right; desc = step.descriptions.right; }
    headerInfo.querySelector('#xy-sub').innerText = sub;
    headerInfo.querySelector('#xy-desc').innerText = desc;
  };

  padContainer.onmousedown = (e) => { handleMove(e); window.onmousemove = handleMove; window.onmouseup = () => window.onmousemove = null; };
  padContainer.ontouchmove = (e) => { e.preventDefault(); handleMove(e); };

  if (selections[currentStep]) {
    const {x, y} = selections[currentStep];
    setTimeout(() => {
      const handle = padContainer.querySelector('#xy-handle');
      if (handle) { handle.style.left = `${x}%`; handle.style.top = `${y}%`; updateDynamicLabels(x, y); }
    }, 0);
  } else {
    selections[currentStep] = { x: 50, y: 50 };
    updateDynamicLabels(50, 50);
  }
  optionsEl.appendChild(padContainer);
}

function renderChoice(step) {
  step.options.forEach((option, index) => {
    const card = document.createElement('div');
    card.className = `option-card ${selections[currentStep] === index ? 'selected' : ''}`;
    card.innerHTML = `<span class="option-text">${option}</span><div class="check-circle"><i data-lucide="check" class="w-3 h-3 text-white ${selections[currentStep] === index ? '' : 'hidden'}"></i></div>`;
    card.onclick = () => selectOption(index);
    optionsEl.appendChild(card);
  });
  lucide.createIcons();
}

function renderRating(step) {
  const grid = document.createElement('div');
  grid.className = 'rating-grid';
  step.options.forEach((option, index) => {
    const item = document.createElement('div');
    item.className = `rating-item ${selections[currentStep] === index ? 'selected' : ''}`;
    item.innerText = option;
    item.onclick = () => selectOption(index);
    grid.appendChild(item);
  });
  optionsEl.appendChild(grid);
}

function renderVisualChoice(step) {
  const container = document.createElement('div');
  container.className = 'visual-choice-container';
  container.innerHTML = `
    <div class="visual-choice-img-wrapper"><img src="${step.image}" class="visual-choice-img" alt="Scan Pélvico"><div class="visual-glow-overlay"></div></div>
    <div class="visual-choice-options">
      ${step.options.map((option, index) => `
        <div class="option-card ${selections[currentStep] === index ? 'selected' : ''}" onclick="selectOption(${index})">
          <span class="option-text">${option}</span>
          <div class="check-circle"><i data-lucide="check" class="w-3 h-3 text-white ${selections[currentStep] === index ? '' : 'hidden'}"></i></div>
        </div>
      `).join('')}
    </div>
  `;
  optionsEl.appendChild(container);
  lucide.createIcons();
}

function selectOption(index) {
  selections[currentStep] = index;
  renderStep(false); // DO NOT SCROLL on quick selection
}

function updateNextButton() {
  const step = quizData[currentStep];
  let isEnabled = false;

  if (isShowingInspiration) isEnabled = true;
  else if (step.type === 'multi-choice') isEnabled = (selections[currentStep] && selections[currentStep].length > 0);
  else if (step.type === 'multi-slider' || step.type === 'gradient-slider' || step.type === 'xy-pad') isEnabled = true;
  else if (selections[currentStep] !== undefined) isEnabled = true;

  nextBtn.disabled = !isEnabled;
  if (isEnabled) {
    nextBtn.classList.remove('opacity-50', 'bg-white/10', 'text-white');
    nextBtn.classList.add('bg-white', 'text-black');
  } else {
    nextBtn.classList.add('opacity-50', 'bg-white/10', 'text-white');
    nextBtn.classList.remove('bg-white', 'text-black');
  }
}

function navigateNext() {
  if (isShowingInspiration) {
    if (currentStep < quizData.length - 1) { currentStep++; renderStep(true); }
    else showAnalyzing();
    return;
  }

  const inspiration = inspirations.find(i => i.step === currentStep + 1);
  if (inspiration && selections[currentStep] !== undefined) {
    showInspiration(inspiration);
    return;
  }

  if (selections[currentStep] !== undefined) {
    if (currentStep < quizData.length - 1) { currentStep++; renderStep(true); }
    else showAnalyzing();
  }
}

function showInspiration(data) {
  isShowingInspiration = true;
  mainContent.style.opacity = '0';
  setTimeout(() => {
    questionEl.style.display = 'none';
    optionsEl.innerHTML = `
      <div class="inspiration-container flex flex-col items-center text-center mt-2 px-2">
        <img src="${data.image}" class="inspiration-img w-full rounded-3xl mb-8 shadow-xl" alt="Inspiration">
        <h2 class="text-3xl font-black mb-4">${data.title}</h2>
        <p class="text-white/80 leading-relaxed">${data.text}</p>
      </div>
    `;
    nextBtn.innerText = "Continuar →";
    mainContent.style.opacity = '1';
  }, 200);
}

function showAnalyzing() {
  if (window.analysisActive) return;
  window.analysisActive = true;
  document.getElementById('footer-controls').style.display = 'none';
  document.getElementById('step-counter').style.display = 'none';

  mainContent.innerHTML = `<div class="flex flex-col items-center">
    <div class="w-20 h-20 mb-10 relative flex items-center justify-center"><div class="absolute inset-0 border-2 border-primary/20 rounded-full animate-ping"></div><i data-lucide="shield" class="w-8 h-8 text-primary"></i></div>
    <div class="text-center mb-10"><h2 class="text-2xl font-black text-accent mb-2">Análise Completa</h2><p>Preparando seu diagnóstico...</p></div>
    <div class="w-full bg-white/5 p-8 rounded-3xl">
      <div class="h-2 bg-white/10 rounded-full overflow-hidden mb-4"><div id="load-bar-fill" class="h-full w-0 bg-accent transition-all duration-300"></div></div>
      <div class="flex justify-between text-[10px] font-bold text-white uppercase tracking-widest"><span id="load-status-text">Processando</span><span id="load-pct-text">0%</span></div>
    </div>
  </div>`;
  lucide.createIcons();

  let progress = 0;
  const fill = document.getElementById('load-bar-fill');
  const pctText = document.getElementById('load-pct-text');
  
  if (!finalAnalysisData) {
    const g = () => 75 + Math.floor(Math.random() * 21);
    finalAnalysisData = { ejac: g(), erect: g(), vigor: g() };
    finalAnalysisData.score = parseFloat(((finalAnalysisData.ejac + finalAnalysisData.erect + finalAnalysisData.vigor) / 30).toFixed(1));
  }

  const interval = setInterval(() => {
    progress += 2; if (progress > 100) progress = 100;
    if (fill) fill.style.width = `${progress}%`;
    if (pctText) pctText.innerText = `${progress}%`;
    if (progress >= 100) { clearInterval(interval); setTimeout(showPlan, 600); }
  }, 40);
}

function showPlan() {
  const s = finalAnalysisData;
  mainContent.innerHTML = `
    <div class="flex flex-col items-center">
      <h2 class="text-2xl font-bold mb-10">Análise de Performance</h2>
      <div class="card-stitch w-full mb-8 flex flex-col items-center gap-4">
        <div class="text-5xl font-black text-white" id="score-counter">${s.score}</div>
        <span class="text-[10px] font-bold text-primary uppercase tracking-widest">Apex Score</span>
      </div>
      <div class="w-full space-y-4 mb-10">
        ${[
          { l: 'Controle', v: s.ejac, i: 'zap' },
          { l: 'Rigidez', v: s.erect, i: 'shield' },
          { l: 'Vigor', v: s.vigor, i: 'flame' }
        ].map(item => `
          <div class="bg-white/5 p-4 rounded-xl border border-white/5">
            <div class="flex justify-between text-[10px] font-bold text-white/60 mb-2"><span>${item.l}</span><span>${item.v}%</span></div>
            <div class="h-2 bg-white/5 rounded-full overflow-hidden"><div class="h-full bg-primary" style="width: ${item.v}%"></div></div>
          </div>
        `).join('')}
      </div>
      <button class="w-full py-5 rounded-xl bg-white text-black font-bold text-lg" id="btn-show-proto">VER PROTOCOLO EXATO ></button>
    </div>
  `;
  lucide.createIcons();
  document.getElementById('btn-show-proto').onclick = showProtocol;
}

function showProtocol() {
  // Simple redirect or full rendering
  window.location.href = window.apex_checkout_url;
}

nextBtn.onclick = navigateNext;
backBtn.onclick = () => {
  if (currentStep > 0) { currentStep--; renderStep(true); }
};

/* --- SOCIAL PROOF SYSTEM --- */
const socialProofData = {
  names: ["Ricardo M.", "Paulo G.", "Carlos S.", "André L.", "Marcos R.", "João P.", "Roberto F.", "Bruno D.", "Sérgio V.", "Fernando A.", "Gustavo H.", "Marcelo K.", "Denis J.", "Thiago B.", "Vanderlei O.", "Renato C.", "Hugo T.", "Eduardo N."],
  cities: ["São Paulo, SP", "Rio de Janeiro, RJ", "Curitiba, PR", "Belo Horizonte, MG", "Porto Alegre, RS", "Brasília, DF", "Fortaleza, CE", "Salvador, BA", "Manaus, AM", "Recife, PE", "Florianópolis, SC", "Goiânia, GO"],
  times: ["agora mesmo", "há 2 minutos", "há 5 minutos", "há 10 minutos", "há 15 minutos", "há 30 minutos"]
};

function showSocialNotification() {
  const toast = document.getElementById('social-proof-toast');
  if (!toast) return;
  const name = socialProofData.names[Math.floor(Math.random() * socialProofData.names.length)];
  const city = socialProofData.cities[Math.floor(Math.random() * socialProofData.cities.length)];
  const time = socialProofData.times[Math.floor(Math.random() * socialProofData.times.length)];
  toast.innerHTML = `<span class="social-name">${name}</span><span class="social-action">Adquiriu o Protocolo Dr. Apex</span><span class="social-location">${city} - ${time}</span>`;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 6000);
}

window.addEventListener('load', () => {
  function scheduleNext(isSecond = false) {
    let delay = isSecond ? 12000 : Math.floor(Math.random() * 10000) + 10000;
    setTimeout(() => { showSocialNotification(); scheduleNext(false); }, delay);
  }
  setTimeout(() => { showSocialNotification(); scheduleNext(true); }, 2000);
});
