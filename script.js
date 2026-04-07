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
      if (official && currentHost !== official && currentHost !== 'localhost' && !currentHost.includes('vercel.app')) {
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

// 12 Core Questions with new Image-based types
const quizData = [
  {
    type: "multi-slider", 
    question: "Vamos começar com seus dados básicos",
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
  {type: "choice", question: "Qual a frequência de suas ereções matinais?", options: ["Nunca", "Raramente (1-2x por semana)", "Frequentemente (3-4x)", "Sempre (Diárias)"]},
  {type: "choice", question: "Quanto tempo dura sua relação sexual (em média)?", options: ["Menos de 2 minutos", "2 a 7 minutos", "7 a 15 minutos", "Mais de 15 minutos"]},
  {type: "rating", question: "Em uma escala de 1 a 5, quão rígida é sua ereção?", options: ["1", "2", "3", "4", "5"], label: "Ridez"},
  {type: "rating", question: "Quão satisfeito você está com sua performance atual?", options: ["1", "2", "3", "4", "5"], label: "Satisfação"},
  {type: "choice", question: "Sua confiança é afetada por esses fatores?", options: ["Sim, significativamente", "Um pouco", "Não, me sinto confiante"]},
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
    question: "Qual seu objetivo principal com o plano?", 
    options: ["Máximo Controle", "Rigidez Superior", "Aumento de Libido", "Saúde Sexual Preventiva", "Energia e Vigor"]
  }
];

const inspirations = [
  {
    step: 5, 
    title: "Excelente Início!",
    image: "vitality.png", 
    text: "87% dos homens com perfil pélvico similar ao seu alcançaram maior controle e vigor nos primeiros 30 dias de protocolo."
  },
  {
    step: 10, 
    title: "Ótimo Progresso!",
    image: "couple.png", 
    text: "A recuperação da confiança sexual é o benefício #1 relatado por nossos usuários após a 2ª semana."
  },
  {
    step: 15, 
    title: "Análise Biométrica",
    image: "badge.png", 
    text: "Diagnóstico Final: Você possui alto potencial de resposta aos exercícios de Bio-Otimização do Dr. Apex."
  }
];

let currentStep = 0;
let selections = {};
let isShowingInspiration = false;
let finalAnalysisData = null; // Store randomized results for consistency between loading and result screens

const mainContent = document.getElementById('main-content');
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const backBtn = document.getElementById('back-btn');
const progressFill = document.getElementById('progress-fill');
const socialTicker = document.getElementById('social-ticker');
const heroSection = document.getElementById('hero');
const quizRoot = document.getElementById('quiz-root');
const pillNav = document.querySelector('.pill-nav');

// --- GEMINI Best Practices: GSAP Entrance ---
window.addEventListener('DOMContentLoaded', () => {
  // Hero Entrance
  const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });
  
  tl.from(".hero-badge", { y: 20, opacity: 0, duration: 0.8 }, 0.5)
    .from(".hero-title", { y: 40, opacity: 0, stagger: 0.1 }, "-=0.4")
    .from(".hero-subtitle", { y: 20, opacity: 0 }, "-=0.6")
    .from(".hero-cta-btn", { scale: 0.9, opacity: 0 }, "-=0.8")
    .from(".hero-cta-btn", { scale: 0.9, opacity: 0 }, "-=0.8");

  // Navbar Scroll Effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      pillNav.classList.add('scrolled');
    } else {
      pillNav.classList.remove('scrolled');
    }
  });
});



function startQuiz() {
  gsap.to(heroSection, {
    opacity: 0,
    y: -50,
    duration: 0.8,
    ease: "power3.inOut",
    onComplete: () => {
      heroSection.style.display = 'none';
      const navEl = document.querySelector('.pill-nav');
      if (navEl) navEl.classList.add('nav-hidden');
      quizRoot.style.display = 'block';
      gsap.from(quizRoot, { opacity: 0, y: 30, duration: 0.6 });
      renderStep();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
}

function renderStep() {
  const step = quizData[currentStep];
  
  // Transition using GSAP
  const mainContent = document.getElementById('main-content');
  gsap.to(mainContent, { 
    opacity: 0, 
    y: 10, 
    duration: 0.2, 
    onComplete: () => {
    // Update Social Proof Urgency (static per session)
    if (!window.globalProofVal) {
      window.globalProofVal = Math.floor(Math.random() * (142 - 110 + 1)) + 110;
    }
    const proofEl = document.getElementById('social-proof-indicator');
    if (proofEl) proofEl.innerText = `${window.globalProofVal} homens iniciaram seu plano nas últimas 24h`;
    
    window.scrollTo({ top: 0, behavior: 'instant' });
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
      const container = document.createElement('div');
      container.className = 'dual-slider-container';
      
      const currentVals = selections[currentStep] || {};
      step.sliders.forEach(s => {
        if (currentVals[s.id] === undefined) currentVals[s.id] = s.initial;
        
        const group = document.createElement('div');
        group.className = 'slider-group';
        
        const getStatus = (val) => {
          let label = "";
          Object.keys(s.statusLabels).forEach(k => {
            if (val >= parseFloat(k)) label = s.statusLabels[k];
          });
          return label;
        };

        group.innerHTML = `
          <div class="slider-header">
            <span class="slider-label">${s.label}</span>
            <span class="slider-status-tag" id="status-${s.id}">${getStatus(currentVals[s.id])}</span>
          </div>
          <div class="slider-large-value"><span id="val-${s.id}">${currentVals[s.id]}</span>${s.unit}</div>
          <input type="range" class="custom-slider" min="${s.min}" max="${s.max}" step="${s.id === 'height' ? '0.01' : '1'}" value="${currentVals[s.id]}">
          <div class="slider-limits">
            <span>${s.min}${s.unit}</span>
            <span>${s.max}${s.unit}</span>
          </div>
        `;
        
        const input = group.querySelector('input');
        input.oninput = (e) => {
          const val = e.target.value;
          currentVals[s.id] = val;
          group.querySelector(`#val-${s.id}`).innerText = val;
          group.querySelector(`#status-${s.id}`).innerText = getStatus(val);
          selections[currentStep] = { ...currentVals };
          updateSummary();
        };
        container.appendChild(group);
      });

      const summary = document.createElement('div');
      summary.className = 'summary-box';
      const updateSummary = () => {
        const age = currentVals.age || 32;
        const weightValue = currentVals.weight || 80;
        summary.innerHTML = `
          <span class="summary-label">Resumo</span>
          <span class="summary-content">${age} anos • ${weightValue}kg</span>
        `;
      };
      updateSummary();
      container.appendChild(summary);
      optionsEl.appendChild(container);
      if (selections[currentStep] === undefined) selections[currentStep] = { ...currentVals };
      updateNextButton();

    } else if (step.type === 'gradient-slider') {
      if (selections[currentStep] === undefined) selections[currentStep] = step.initial;
      const val = selections[currentStep];
      const getStatus = (v) => {
        let label = "";
        Object.keys(step.statusLabels).forEach(k => {
          if (v >= parseFloat(k)) label = step.statusLabels[k];
        });
        return label;
      };

      const container = document.createElement('div');
      container.innerHTML = `
        <div class="slider-large-value" style="margin-top: 40px;"><span id="grad-val">${val}</span>${step.unit}</div>
        <div style="text-align: center; color: rgba(255,255,255,0.5); margin-bottom: 40px; font-weight: 600;" id="grad-status">${getStatus(val)}</div>
        <div class="gradient-slider-track relative">
           <input type="range" class="custom-slider" min="${step.min}" max="${step.max}" value="${val}" style="position: absolute; top: -12px; left: 0; width: 100%; height: 30px; opacity: 1; z-index: 10; cursor: pointer;">
        </div>
        <div class="slider-limits" style="margin-top: 20px;">
          <span>${step.min}${step.unit}</span>
          <span>${step.max}${step.unit}+</span>
        </div>
      `;
      
      const input = container.querySelector('input');
      input.oninput = (e) => {
        const v = e.target.value;
        selections[currentStep] = v;
        container.querySelector('#grad-val').innerText = v;
        container.querySelector('#grad-status').innerText = getStatus(v);
        nextBtn.innerText = `Confirmar ${v}${step.unit} >`;
      };
      nextBtn.innerText = `Confirmar ${val}${step.unit} >`;
      optionsEl.appendChild(container);
      updateNextButton();

    } else if (step.type === 'multi-choice') {
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
        card.innerHTML = `
          <span class="option-text">${opt}</span>
          <div class="check-circle" style="${selected.includes(idx) ? 'background:#000;border-color:#000;' : ''}">
             <svg viewBox="0 0 24 24" style="${selected.includes(idx) ? 'display:block;fill:#fff' : ''}"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
          </div>
        `;
        card.onclick = () => {
          if (selected.includes(idx)) {
            selected.splice(selected.indexOf(idx), 1);
          } else {
            selected.push(idx);
          }
          selections[currentStep] = selected;
          renderStep(); // Refresh for selection state
        };
        grid.appendChild(card);
      });
      optionsEl.appendChild(grid);
      
      const counter = document.createElement('div');
      counter.className = 'selection-counter';
      counter.innerText = `${selected.length} selecionados`;
      optionsEl.appendChild(counter);
      updateNextButton();

    } else if (step.type === 'xy-pad') {
      const headerInfo = document.createElement('div');
      headerInfo.style.textAlign = 'center';
      headerInfo.style.marginBottom = '20px';
      headerInfo.innerHTML = `
        <h3 id="xy-sub" style="font-size: 24px; color: #fff; margin-bottom: 5px;">...</h3>
        <p id="xy-desc" style="color: rgba(255,255,255,0.4); font-size: 14px;">...</p>
      `;
      optionsEl.appendChild(headerInfo);

      const padContainer = document.createElement('div');
      padContainer.className = 'xy-pad-modern';
      padContainer.innerHTML = `
        <div class="xy-axis-modern xy-axis-v"></div>
        <div class="xy-axis-modern xy-axis-h"></div>
        <div class="xy-axis-label label-top">${step.labels.top}</div>
        <div class="xy-axis-label label-bottom">${step.labels.bottom}</div>
        <div class="xy-axis-label label-left">${step.labels.left}</div>
        <div class="xy-axis-label label-right">${step.labels.right}</div>
        <div id="xy-handle" class="xy-handle-target" style="left: 50%; top: 50%;">
          <div class="target-outer"></div>
          <div class="target-inner"></div>
          <div class="target-dot"></div>
        </div>
      `;
      
      const handleMove = (e) => {
        const rect = padContainer.getBoundingClientRect();
        const x = Math.max(0, Math.min(100, ((e.clientX || e.touches[0].clientX) - rect.left) / rect.width * 100));
        const y = Math.max(0, Math.min(100, ((e.clientY || e.touches[0].clientY) - rect.top) / rect.height * 100));
        const handle = padContainer.querySelector('#xy-handle');
        handle.style.left = `${x}%`;
        handle.style.top = `${y}%`;
        selections[currentStep] = { x, y };
        updateDynamicLabels(x, y);
        
        // Dynamic Backdrop Glow
        padContainer.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(0, 224, 255, 0.15) 0%, transparent 70%)`;
        
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

      padContainer.onmousedown = (e) => {
        handleMove(e);
        window.onmousemove = handleMove;
        window.onmouseup = () => window.onmousemove = null;
      };
      
      if (selections[currentStep]) {
        const {x, y} = selections[currentStep];
        setTimeout(() => {
          const handle = padContainer.querySelector('#xy-handle');
          handle.style.left = `${x}%`;
          handle.style.top = `${y}%`;
          updateDynamicLabels(x, y);
        }, 0);
      } else {
        selections[currentStep] = { x: 50, y: 50 };
        updateDynamicLabels(50, 50);
      }

      optionsEl.appendChild(padContainer);
      nextBtn.innerText = "CONFIRMAR ESTILO >";

    } else if (step.type === 'choice') {
      step.options.forEach((option, index) => {
        const card = document.createElement('div');
        card.className = `option-card ${selections[currentStep] === index ? 'selected' : ''}`;
        card.innerHTML = `
          <span class="option-text">${option}</span>
          <div class="check-circle">
            <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
          </div>
        `;
        card.onclick = () => selectOption(index);
        optionsEl.appendChild(card);
      });
    } else if (step.type === 'rating') {
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
    } else if (step.type === 'visual-choice') {
      const container = document.createElement('div');
      container.className = 'visual-choice-container';
      
      container.innerHTML = `
        <div class="visual-choice-img-wrapper">
          <img src="${step.image}" class="visual-choice-img" alt="Scan Pélvico">
          <div class="visual-glow-overlay"></div>
        </div>
        <div class="visual-choice-options">
          ${step.options.map((option, index) => `
            <div class="option-card ${selections[currentStep] === index ? 'selected' : ''}" onclick="selectOption(${index})">
              <span class="option-text">${option}</span>
              <div class="check-circle">
                <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
              </div>
            </div>
          `).join('')}
        </div>
      `;
      optionsEl.appendChild(container);
    }

    backBtn.style.display = currentStep > 0 ? 'block' : 'none';
    updateNextButton();
    
    gsap.to(mainContent, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" });
  } // End onComplete
  }); // End gsap.to
}

function selectOption(index) {
  const card = optionsEl.children[index];
  if (card) {
    gsap.to(card, { scale: 0.98, duration: 0.1, yoyo: true, repeat: 1 });
  }
  
  selections[currentStep] = index;
  renderStep();
  
  // Subtle auto-advance removed to allow explicit 'Continue' click
}

function updateNextButton() {
  const step = quizData[currentStep];
  let isEnabled = false;

  if (isShowingInspiration) {
    isEnabled = true;
  } else if (step.type === 'multi-choice') {
    isEnabled = selections[currentStep] && selections[currentStep].length > 0;
  } else if (step.type === 'multi-slider') {
    isEnabled = true; // Always has initial values
  } else if (selections[currentStep] !== undefined) {
    isEnabled = true;
  }

  if (isEnabled) {
    nextBtn.classList.remove('opacity-50', 'bg-white/10', 'text-white');
    nextBtn.classList.add('bg-white', 'text-black', 'hover:scale-[1.03]', 'active:scale-[0.98]');
    nextBtn.disabled = false;
  } else {
    nextBtn.classList.add('opacity-50', 'bg-white/10', 'text-white');
    nextBtn.classList.remove('bg-white', 'text-black', 'hover:scale-[1.03]', 'active:scale-[0.98]');
    nextBtn.disabled = true;
  }
}

function navigateNext() {
  // If we just clicked "Continue" on an inspiration screen
  if (isShowingInspiration) {
    if (currentStep < quizData.length - 1) {
      currentStep++;
      renderStep();
    } else {
      showAnalyzing();
    }
    return;
  }

  // Check if we should show an inspiration for the COMPLETED step
  const inspiration = inspirations.find(i => i.step === currentStep + 1);
  if (inspiration && selections[currentStep] !== undefined) {
    showInspiration(inspiration);
    return;
  }

  // Otherwise, just move to next question if selected
  if (selections[currentStep] !== undefined) {
    if (currentStep < quizData.length - 1) {
      currentStep++;
      renderStep();
    } else {
      showAnalyzing();
    }
  }
}

function showInspiration(data) {
  isShowingInspiration = true;
  mainContent.style.opacity = '0';
  
  setTimeout(() => {
    questionEl.style.display = 'none';
    optionsEl.innerHTML = `
      <div class="inspiration-container flex flex-col items-center text-center mt-2">
        <img src="${data.image}" class="inspiration-img step-${data.step}-img w-full h-auto max-h-[40vh] object-cover rounded-3xl mb-6 shadow-xl" alt="Inspiration">
        <h2 class="text-[28px] font-extrabold leading-tight mb-2 tracking-tighter">${data.title || "Progresso!"}</h2>
        <p class="inspiration-text text-base text-white/90 mb-0">${data.text}</p>
      </div>
    `;
    nextBtn.classList.remove('disabled');
    nextBtn.disabled = false;
    nextBtn.innerText = "Continuar →";
    mainContent.style.opacity = '1';
  }, 200);
}

function updateStatusItem(id, value) {
  const item = document.getElementById(`status-${id}`);
  if (item) {
    item.querySelector('.status-value').innerText = value;
    if (value === "CONCLUÍDO") {
      item.classList.add('done');
    }
  }
}

function showAnalyzing() {
  if (window.analysisActive) return;
  window.analysisActive = true;
  
  // Clear any existing intervals
  if (window.analysisInterval) clearInterval(window.analysisInterval);

  // Hide UI elements
  document.getElementById('footer-controls').style.display = 'none';
  if (window.socialTicker) socialTicker.style.display = 'none';
  document.getElementById('step-counter').style.display = 'none';

  mainContent.innerHTML = `
    <div class="flex flex-col items-center">
      <div class="w-24 h-24 mb-8 relative flex items-center justify-center">
        <div class="absolute inset-0 border border-primary/20 rounded-full animate-[ping_2s_infinite]"></div>
        <div class="absolute inset-0 border border-primary/40 rounded-full scale-75 animate-[pulse_2s_infinite]"></div>
        <i data-lucide="shield" class="w-8 h-8 text-primary drop-shadow-[0_0_10px_rgba(0,224,255,0.8)]"></i>
      </div>

      <div class="text-center mb-10">
        <h2 class="text-2xl font-black text-accent flex items-center justify-center gap-2 mb-2">
          <i data-lucide="check-circle" class="w-6 h-6 stroke-[3]"></i>
          Análise Completa
        </h2>
        <p class="text-white">Preparando seu diagnóstico...</p>
      </div>

      <div class="grid grid-cols-2 gap-4 mb-10 w-full">
        <div class="bg-white/5 border border-white/10 rounded-2xl p-4">
          <span class="text-[10px] text-white uppercase tracking-widest block mb-2">Variáveis</span>
          <div class="flex items-center gap-2 text-sm font-bold">
            <div class="w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_8px_#38BDF8]"></div> 
            15 inputs
          </div>
        </div>
        <div class="bg-white/5 border border-white/10 rounded-2xl p-4">
          <span class="text-[10px] text-white uppercase tracking-widest block mb-2">Base</span>
          <div class="flex items-center gap-2 text-sm font-bold">
            <div class="w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_8px_#38BDF8]"></div> 
            +50k perfis
          </div>
        </div>
        <div class="bg-white/5 border border-white/10 rounded-2xl p-4">
          <span class="text-[10px] text-white uppercase tracking-widest block mb-2">Precisão</span>
          <div class="flex items-center gap-2 text-sm font-bold">
            <div class="w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_8px_#38BDF8]"></div> 
            94.7%
          </div>
        </div>
        <div class="bg-white/5 border border-white/10 rounded-2xl p-4">
          <span class="text-[10px] text-white uppercase tracking-widest block mb-2">Módulos</span>
          <div class="flex items-center gap-2 text-sm font-bold" id="load-modules">
            <div class="w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_8px_#38BDF8]"></div> 
            Calculando...
          </div>
        </div>
      </div>

      <div class="bg-white/5 border border-white/10 rounded-3xl p-8 w-full">
        <div class="flex justify-between mb-6 relative">
          ${[1, 2, 3, 4, 5].map(i => `
            <div class="flex flex-col items-center gap-2 z-10" id="step-node-${i}">
              <div class="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center bg-black transition-all duration-300 node-circle">
                <i data-lucide="check" class="w-3 h-3 text-white hidden"></i>
              </div>
              <span class="text-[9px] text-white font-bold">${i}/5</span>
            </div>
          `).join('')}
        </div>

        <div class="h-2.5 bg-white/5 rounded-full overflow-hidden mb-3">
          <div id="load-bar-fill" class="h-full w-0 bg-accent shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all duration-300"></div>
        </div>

        <div class="flex justify-between text-[10px] font-bold text-white uppercase tracking-widest">
          <span id="load-status-text">Processando</span>
          <span class="text-accent" id="load-pct-text">0%</span>
        </div>
      </div>

      <div class="mt-10 text-white text-[10px] tracking-widest uppercase text-center font-mono">
        Powered by ApexCore Neural Engine
      </div>
    </div>
  `;
  lucide.createIcons();

  let progress = 0;
  const fill = document.getElementById('load-bar-fill');
  const pctText = document.getElementById('load-pct-text');
  const statusEl = document.getElementById('load-status-text');
  
  if (!finalAnalysisData) {
    const getRandom = () => 75 + Math.floor(Math.random() * 21);
    finalAnalysisData = {
      ejac: getRandom(),
      erect: getRandom(),
      vigor: getRandom()
    };
    finalAnalysisData.score = parseFloat(((finalAnalysisData.ejac + finalAnalysisData.erect + finalAnalysisData.vigor) / 3 / 10).toFixed(1));
  }

  window.analysisInterval = setInterval(() => {
    progress += 2;
    if (progress > 100) progress = 100;
    
    if (fill) fill.style.width = `${progress}%`;
    if (pctText) pctText.innerText = `${progress}%`;
    
    const step = Math.floor(progress / 20) + 1;
    for (let i = 1; i <= 5; i++) {
      const nodeEl = document.getElementById(`step-node-${i}`);
      if (!nodeEl) continue;
      const nodeCircle = nodeEl.querySelector('.node-circle');
      if (i < step) {
        nodeCircle.className = 'node-circle done';
      } else if (i === step) {
        nodeCircle.className = 'node-circle active';
      }
    }

    if (progress === 30) if (statusEl) statusEl.innerText = "Cruzando Dados Corporais...";
    if (progress === 60) if (statusEl) statusEl.innerText = "Processando Algoritmos...";
    if (progress === 90) if (statusEl) statusEl.innerText = "Finalizando Diagnóstico...";

    if (progress >= 100) {
      clearInterval(window.analysisInterval);
      window.analysisActive = false; // Allow future re-runs if needed (though usually we won't)
      if (statusEl) statusEl.innerText = "FINALIZADO";
      const modulesEl = document.getElementById('load-modules');
      if (modulesEl) modulesEl.innerHTML = '<div class="dot-indicator"></div> Concluído';
      setTimeout(showPlan, 600);
    }
  }, 40); // Faster loading for verification
}

function drawRadarChart() {
  const mount = document.getElementById('chart-mount');
  const size = 240;
  const center = size / 2;
  const radius = 90;
  const levels = 4;
  const labels = ["Estamina", "Controle", "Rigidez", "Saúde", "Confiança"];
  
  // Calculate dynamic values based on answers (mock logic for demo)
  const values = [
    selections[4] !== undefined ? (selections[4].x / 100) * 100 : 60, // Stamina (from XY Pad)
    selections[5] !== undefined ? (selections[5] + 1) * 20 : 50, // Control
    selections[6] !== undefined ? (selections[6] + 1) * 20 : 70, // Rigidez
    selections[12] !== undefined ? (selections[12] + 1) * 25 : 80, // Health (Alimentação/Lifestlye)
    selections[14] !== undefined ? (selections[14] + 1) * 20 : 40  // Confidence
  ];

  let svgHtml = `<svg class="radar-chart" viewBox="0 0 ${size} ${size}">`;
  
  // Circles for levels
  for (let l = 1; l <= levels; l++) {
    const r = (radius / levels) * l;
    svgHtml += `<circle cx="${center}" cy="${center}" r="${r}" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1" />`;
  }

  // Axes and Labels
  labels.forEach((label, i) => {
    const angle = (Math.PI * 2 * i) / labels.length - Math.PI / 2;
    const x = center + Math.cos(angle) * radius;
    const y = center + Math.sin(angle) * radius;
    svgHtml += `<line x1="${center}" y1="${center}" x2="${x}" y2="${y}" stroke="rgba(255,255,255,0.1)" stroke-width="1" />`;
    
    // Label positioning
    const lx = center + Math.cos(angle) * (radius + 25);
    const ly = center + Math.sin(angle) * (radius + 25);
    const labelEl = document.createElement('div');
    labelEl.className = 'radar-label';
    labelEl.innerText = label;
    labelEl.style.left = `${(lx / size) * 100}%`;
    labelEl.style.top = `${(ly / size) * 100}%`;
    labelEl.style.transform = 'translate(-50%, -50%)';
    labelEl.style.color = 'var(--text-muted)';
    labelEl.style.fontSize = '9px';
    mount.appendChild(labelEl);
  });

  // Data Shape
  let points = "";
  values.forEach((v, i) => {
    const angle = (Math.PI * 2 * i) / labels.length - Math.PI / 2;
    const x = center + Math.cos(angle) * (radius * (v / 100));
    const y = center + Math.sin(angle) * (radius * (v / 100));
    points += `${x},${y} `;
  });

  svgHtml += `<polygon points="${points}" fill="rgba(74, 222, 128, 0.15)" stroke="var(--primary)" stroke-width="2" style="filter: drop-shadow(0 0 5px var(--primary-glow));" />`;
  svgHtml += `</svg>`;
  
  mount.innerHTML += svgHtml;
}

function showPlan() {
  const finalScore = finalAnalysisData ? finalAnalysisData.score : 8.5;
  const symmetry = finalAnalysisData ? finalAnalysisData.ejac : 92;
  const proportions = finalAnalysisData ? finalAnalysisData.erect : 88;
  const texture = finalAnalysisData ? finalAnalysisData.vigor : 95;

  mainContent.innerHTML = `
    <div class="flex flex-col items-center text-center">
      <div class="mb-10">
        <h2 class="text-3xl font-black tracking-tight">Resultados da Análise</h2>
      </div>

      <div class="relative w-56 h-56 mb-12 flex items-center justify-center">
        <svg class="w-full h-full -rotate-90" viewBox="0 0 220 220">
          <circle class="text-white/5 stroke-current" stroke-width="12" fill="transparent" r="100" cx="110" cy="110" />
          <circle id="premium-circle-fill" class="text-primary stroke-current transition-all duration-1000 ease-out" stroke-width="12" stroke-linecap="round" fill="transparent" r="100" cx="110" cy="110" style="stroke-dasharray: 628; stroke-dashoffset: 628;" />
        </svg>
        <div class="absolute flex flex-col items-center">
          <div class="text-6xl font-black tracking-tighter"><span id="score-counter">0.0</span><span class="text-2xl text-white">/10</span></div>
          <p class="text-[10px] uppercase font-bold tracking-widest text-white mt-1">Score de Performance</p>
        </div>
      </div>

      <div class="w-full space-y-6 mb-12">
        ${[
          { label: 'Potencial de Controle', id: 'sym', val: symmetry },
          { label: 'Potencial de Ereção', id: 'prop', val: proportions },
          { label: 'Potencial de Vigor', id: 'text', val: texture }
        ].map(s => `
          <div class="text-left">
            <div class="flex justify-between items-end mb-2">
              <span class="text-xs font-bold text-white uppercase tracking-widest">${s.label}</span>
              <span class="text-sm font-black text-primary" id="${s.id}-percent">0%</span>
            </div>
            <div class="h-2 bg-white/5 rounded-full overflow-hidden">
              <div id="${s.id}-fill" class="h-full w-0 bg-primary shadow-[0_0_15px_rgba(0,224,255,0.4)] transition-all duration-1000"></div>
            </div>
          </div>
        `).join('')}
      </div>

      <button class="w-full py-5 rounded-pill bg-white text-black font-black text-lg hover:scale-[1.03] active:scale-[0.98] transition-all shadow-[0_20px_40px_rgba(255,255,255,0.1)] mb-6" id="btn-show-proto">
        Ver Protocolo >
      </button>

      <div class="text-[10px] font-mono text-white uppercase tracking-widest">
        APEX PROTOCOL V1.1 // DIAGNÓSTICO CONCLUÍDO
      </div>
    </div>
  `;

  // Use event listener instead of onclick to avoid scope issues
  document.getElementById('btn-show-proto').addEventListener('click', showProtocol);

  // Faster Animations (1 second duration)
  const scoreElem = document.getElementById('score-counter');
  let currentScore = 0;
  const duration = 1000;
  const interval = 20;
  const steps = duration / interval;
  const increment = finalScore / steps;

  const timer = setInterval(() => {
    currentScore += increment;
    if (currentScore >= finalScore) {
      currentScore = finalScore;
      clearInterval(timer);
    }
    if (scoreElem) scoreElem.innerText = currentScore.toFixed(1);
    
    // Smooth Circle Fill
    const dashArray = 628;
    const offset = dashArray * (1 - currentScore / 10);
    const circle = document.getElementById('premium-circle-fill');
    if (circle) circle.style.strokeDashoffset = offset;
  }, interval);

  // Bars Animation
  setTimeout(() => {
    const sFill = document.getElementById('sym-fill');
    const sPct = document.getElementById('sym-percent');
    if (sFill) sFill.style.width = symmetry + '%';
    if (sPct) sPct.innerText = symmetry + '%';
  }, 300);

  setTimeout(() => {
    const pFill = document.getElementById('prop-fill');
    const pPct = document.getElementById('prop-percent');
    if (pFill) pFill.style.width = proportions + '%';
    if (pPct) pPct.innerText = proportions + '%';
  }, 600);

  setTimeout(() => {
    const tFill = document.getElementById('text-fill');
    const tPct = document.getElementById('text-percent');
    if (tFill) tFill.style.width = texture + '%';
    if (tPct) tPct.innerText = texture + '%';
  }, 900);
}


function showProtocol() {
  mainContent.innerHTML = `
    <div class="flex flex-col items-center">
      <div class="text-center mb-6">
        <h2 class="text-3xl font-black tracking-tight leading-tight">Seu Protocolo<br>Personalizado</h2>
      </div>

      <!-- Before/After Component UI -->
      <div class="bg-white rounded-3xl overflow-hidden mb-8 w-full text-black shadow-2xl relative">
        <div class="flex">
          <!-- Before -->
          <div class="w-1/2 border-r border-gray-100 flex flex-col">
            <div class="aspect-[4/5] w-full relative">
              <img src="performance_before_sad_man_1774114625856.png" class="absolute inset-0 w-full h-full object-cover grayscale opacity-90" alt="Antes">
            </div>
            <div class="p-4 text-center flex-1 flex flex-col justify-end">
              <div class="text-[13px]">Performance</div>
              <div class="text-[14px] leading-tight"><span class="font-black">antes</span> do Plano</div>
              <div class="flex justify-center gap-1.5 mt-3">
                <div class="h-1.5 w-6 bg-red-500 rounded-full"></div>
                <div class="h-1.5 w-6 bg-red-500/20 rounded-full"></div>
                <div class="h-1.5 w-6 bg-red-500/20 rounded-full"></div>
                <div class="h-1.5 w-6 bg-red-500/20 rounded-full"></div>
              </div>
            </div>
          </div>
          <!-- After -->
          <div class="w-1/2 flex flex-col">
            <div class="aspect-[4/5] w-full relative">
              <img src="performance_after_happy_couple_1774114685383.png" class="absolute inset-0 w-full h-full object-cover" alt="Depois">
            </div>
            <div class="p-4 text-center flex-1 flex flex-col justify-end">
              <div class="text-[13px]">Performance</div>
              <div class="text-[14px] leading-tight"><span class="font-black">depois</span> do Plano</div>
              <div class="flex justify-center gap-1.5 mt-3">
                <div class="h-1.5 w-6 bg-green-500 rounded-full"></div>
                <div class="h-1.5 w-6 bg-green-500 rounded-full"></div>
                <div class="h-1.5 w-6 bg-green-500 rounded-full"></div>
                <div class="h-1.5 w-6 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 w-full shadow-2xl relative overflow-hidden">
        <div class="absolute top-0 right-0 p-6">
          <i data-lucide="award" class="w-12 h-12 text-primary/20"></i>
        </div>

        <h3 class="text-xl font-black leading-tight mb-8 pr-12">Plano de 30 Dias para Performance Máxima</h3>
        
        <div class="space-y-4 mb-10">
          ${[
            'Protocolo de Assoalho Pélvico',
            'Técnicas de Controle Ejaculatório',
            'Guia de Nutrição e Vigor Sexual',
            'Acesso ao Painel de Progresso'
          ].map(item => `
            <div class="flex items-center gap-4 text-sm font-bold text-white">
              <div class="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-accent">✓</div>
              <span>${item}</span>
            </div>
          `).join('')}
        </div>



        <div class="mt-8 mb-10 bg-black/40 rounded-3xl p-6 border border-white/5">
          <h4 class="font-bold text-sm mb-4 text-center text-primary uppercase tracking-widest">O Método</h4>
          <div class="space-y-4">
              <div class="flex items-start gap-4">
                  <div class="w-10 h-10 bg-primary/20 rounded-xl flex-shrink-0 flex items-center justify-center">
                      <i data-lucide="shield" class="text-primary w-5 h-5"></i>
                  </div>
                  <div>
                      <h5 class="text-sm font-bold mb-1">Base Científica</h5>
                      <p class="text-white text-[11px] leading-relaxed">Protocolos baseados em estudos urológicos recentes para resultados reais e duradouros.</p>
                  </div>
              </div>
              <div class="flex items-start gap-4">
                  <div class="w-10 h-10 bg-accent/20 rounded-xl flex-shrink-0 flex items-center justify-center">
                      <i data-lucide="activity" class="text-accent w-5 h-5"></i>
                  </div>
                  <div>
                      <h5 class="text-sm font-bold mb-1">Personalização IA</h5>
                      <p class="text-white text-[11px] leading-relaxed">Tecnologia que analisa seu perfil biológico para criar um plano 100% sob medida.</p>
                  </div>
              </div>
              <div class="flex items-start gap-4">
                  <div class="w-10 h-10 bg-white/10 rounded-xl flex-shrink-0 flex items-center justify-center">
                      <i data-lucide="lock" class="text-white w-5 h-5"></i>
                  </div>
                  <div>
                      <h5 class="text-sm font-bold mb-1">Privacidade Total</h5>
                      <p class="text-white text-[11px] leading-relaxed">Seus dados protegidos com criptografia de ponta e anonimato garantido.</p>
                  </div>
              </div>
          </div>
        </div>

        <div class="mt-8 mb-10">
          <div class="flex justify-around items-center border-y border-white/10 py-6 mb-8">
            <div class="text-center">
              <div class="flex items-center justify-center gap-1 text-[#f59e0b] mb-1">
                <i data-lucide="star" class="w-4 h-4 fill-current"></i>
                <i data-lucide="star" class="w-4 h-4 fill-current"></i>
                <i data-lucide="star" class="w-4 h-4 fill-current"></i>
                <i data-lucide="star" class="w-4 h-4 fill-current"></i>
                <i data-lucide="star-half" class="w-4 h-4 fill-current"></i>
              </div>
              <div class="text-2xl font-black">4.7</div>
              <div class="text-[10px] text-white uppercase tracking-widest font-bold">Avaliação Média</div>
            </div>
            <div class="w-px h-12 bg-white/10"></div>
            <div class="text-center">
              <div class="flex items-center justify-center gap-1 text-primary mb-1">
                <i data-lucide="users" class="w-4 h-4"></i>
              </div>
              <div class="text-2xl font-black">10k+</div>
              <div class="text-[10px] text-white uppercase tracking-widest font-bold">Homens Ativos</div>
            </div>
          </div>
          
          <h3 class="text-lg font-black text-center mb-6">Histórias de Sucesso</h3>
          
          <div class="space-y-4">
            <div class="bg-white/5 border border-white/10 p-5 rounded-2xl relative">
              <div class="flex justify-between items-start mb-2">
                <div class="flex text-[#f59e0b]">
                  <i data-lucide="star" class="w-3 h-3 fill-current"></i><i data-lucide="star" class="w-3 h-3 fill-current"></i><i data-lucide="star" class="w-3 h-3 fill-current"></i><i data-lucide="star" class="w-3 h-3 fill-current"></i><i data-lucide="star" class="w-3 h-3 fill-current"></i>
                </div>
                <span class="text-[10px] font-bold text-white truncate max-w-[100px]">Carlos F.</span>
              </div>
              <h4 class="font-bold text-sm mb-2">Mudou minha realidade</h4>
              <p class="text-white text-xs leading-relaxed">Eu estava cético. Tentei suplementos e nunca funcionou. Com esse protocolo, em 3 semanas já notei a diferença. Acordo revigorado, com energia e uma rigidez que não via há anos.</p>
            </div>
            
            <div class="bg-white/5 border border-white/10 p-5 rounded-2xl relative">
              <div class="flex justify-between items-start mb-2">
                <div class="flex text-[#f59e0b]">
                  <i data-lucide="star" class="w-3 h-3 fill-current"></i><i data-lucide="star" class="w-3 h-3 fill-current"></i><i data-lucide="star" class="w-3 h-3 fill-current"></i><i data-lucide="star" class="w-3 h-3 fill-current"></i><i data-lucide="star" class="w-3 h-3 fill-current"></i>
                </div>
                <span class="text-[10px] font-bold text-white truncate max-w-[100px]">Ricardo T.</span>
              </div>
              <h4 class="font-bold text-sm mb-2">Excelente controle</h4>
              <p class="text-white text-xs leading-relaxed">Prático e direto ao ponto. Estava perdendo a confiança no relacionamento, mas o método me deu o controle de volta.</p>
            </div>
          </div>
        </div>

        <div class="bg-black/40 rounded-3xl pt-9 pb-6 px-6 mb-10 border border-white/5 relative text-center">
          <div class="text-xs font-bold text-white line-through mb-1 uppercase tracking-widest">De R$ 49,90 por apenas</div>
          <div class="text-5xl font-black tracking-tighter">R$ <span class="text-primary">21,90</span></div>
          <p class="text-[10px] text-white uppercase font-black tracking-widest mt-3">À vista ou via Pix</p>
          <div class="absolute -top-3 left-1/2 -translate-x-1/2">
            <span class="bg-accent text-black px-4 py-1.5 rounded-pill text-[11px] font-black uppercase tracking-widest whitespace-nowrap shadow-[0_0_15px_rgba(16,185,129,0.4)]">56% DE DESCONTO</span>
          </div>
        </div>

        <div class="mb-10">
          <div class="flex justify-between items-center mb-2">
            <span class="text-[11px] font-black uppercase tracking-widest text-white">Vagas remanescentes</span>
            <span class="text-white font-black text-xl tabular-nums">07</span>
          </div>
          <div class="h-2 bg-white/5 rounded-full overflow-hidden">
            <div class="h-full w-[15%] bg-accent animate-pulse"></div>
          </div>
          <p class="text-[10px] text-red-400 font-bold mt-3 uppercase tracking-tighter">
            A janela de oportunidade fecha em breve.
          </p>
        </div>

        <button class="w-full py-6 rounded-pill bg-primary text-black font-black text-xl hover:scale-[1.03] active:scale-[0.98] transition-all shadow-[0_20px_40px_rgba(0,224,255,0.3)]" onclick="window.location.href = window.apex_checkout_url || 'https://lastlink.com/p/CAA303628/checkout-payment/'">
          ADQUIRIR AGORA >
        </button>

        <div class="grid grid-cols-3 gap-4 mt-8">
          ${[
            { icon: 'shield-check', text: '7 Dias' },
            { icon: 'lock', text: 'Pagar Seguro' },
            { icon: 'zap', text: 'Imediato' }
          ].map(badge => `
            <div class="flex flex-col items-center gap-2">
              <i data-lucide="${badge.icon}" class="w-5 h-5 text-white"></i>
              <span class="text-[9px] font-bold text-white uppercase tracking-widest">${badge.text}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="mt-8 text-[10px] font-mono text-white uppercase tracking-widest text-center">
        APEXCORE V1.1 // PROTOCOLO ATIVO
      </div>
    </div>
  `;
  lucide.createIcons();
}

nextBtn.onclick = navigateNext;
backBtn.onclick = () => {
  if (currentStep > 0 && !isShowingInspiration) {
    currentStep--;
    renderStep();
  } else if (isShowingInspiration) {
    isShowingInspiration = false;
    renderStep();
  }
};

// Initial state - Don't call renderStep here, startQuiz handles it
// renderStep();

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

  toast.innerHTML = `
    <span class="social-name">${name}</span>
    <span class="social-action">Adquiriu o Protocolo Dr. Apex</span>
    <span class="social-location">${city} - ${time}</span>
  `;

  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 6000);
}

// Timing Logic: 5s initial, 2nd at 50s, then random intervals between 15-25s
window.addEventListener('load', () => {
  function scheduleNext(isSecond = false) {
    let delay;
    if (isSecond) {
      delay = 50000; // 50 seconds for the 2nd one
    } else {
      delay = Math.floor(Math.random() * (25000 - 15000 + 1)) + 15000; // 15s to 25s
    }

    setTimeout(() => {
      showSocialNotification();
      scheduleNext(false); // All subsequent are random 15-25s
    }, delay);
  }

  // First notification at 5s
  setTimeout(() => {
    showSocialNotification();
    scheduleNext(true); // Schedule the 2nd one at 50s
  }, 5000);
});
