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

// 12 Core Questions with new Image-based types
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
    image: "pelvic_blood_flow_diagram_1775301438774.webp",
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
    image: "vitality.webp", 
    text: "Não importa seu nível atual. Nosso algoritmo já identificou padrões nas suas respostas. Homens com sintomas semelhantes dão um basta na frustração e recuperam o vigor em semanas."
  },
  {
    step: 10, 
    title: "A Ciência da Alta Performance",
    image: "couple.webp", 
    text: "O segredo dos homens de alta performance não são pílulas perigosas. Com bio-otimização natural, você restaura sua confiança e desperta a admiração da parceira. A sua cura definitiva está quase pronta."
  },
  {
    step: 15, 
    title: "Diagnóstico Finalizado.",
    image: "badge.webp", 
    text: "Analisamos cada um dos seus inputs. Existe um caminho rigoroso e validado para você reativar sua performance máxima. Pare de perder oportunidades e veja sua solução exata agora."
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

// --- GEMINI Best Practices: GSAP Entrance ---
window.addEventListener('DOMContentLoaded', () => {
  // Hero Entrance
  const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });
  
  tl.from("#social-proof-section", { y: 15, opacity: 0, duration: 0.4 }, 0.1)
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
    y: -50,
    duration: 0.8,
    ease: "power3.inOut",
    onComplete: () => {
      heroSection.style.display = 'none';
      quizRoot.style.display = 'block';
      gsap.from(quizRoot, { opacity: 0, y: 30, duration: 0.6 });
      renderStep();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
}

function renderStep(shouldScroll = true) {
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
          renderStep(false); // Refresh for selection state without scrolling
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

      padContainer.style.touchAction = 'none';
      padContainer.onmousedown = (e) => {
        handleMove(e);
        window.onmousemove = handleMove;
        window.onmouseup = () => window.onmousemove = null;
      };
      padContainer.ontouchstart = (e) => {
        handleMove(e);
        window.ontouchmove = (ev) => { ev.preventDefault(); handleMove(ev); };
        window.ontouchend = () => window.ontouchmove = null;
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
  renderStep(false);
  
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
      <div class="inspiration-container flex flex-col items-center text-center mt-2 px-2">
        <img src="${data.image}" class="inspiration-img step-${data.step}-img w-full h-auto max-h-[42vh] object-cover rounded-3xl mb-12 shadow-xl" alt="Inspiration">
        <h2 class="text-[28px] font-extrabold leading-tight mb-6 tracking-tighter">${data.title || "Progresso!"}</h2>
        <p class="inspiration-text text-[17px] leading-relaxed text-white/90 mb-4">${data.text}</p>
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
    progress += 1;
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

    if (progress === 15) if (statusEl) statusEl.innerText = "Mapeando Densidade Pélvica...";
    if (progress === 35) if (statusEl) statusEl.innerText = "Avaliando Carga Neural...";
    if (progress === 55) if (statusEl) statusEl.innerText = "Calculando Risco de Falha...";
    if (progress === 75) if (statusEl) statusEl.innerText = "Gerando Protocolo Nível 3 Híbrido...";
    if (progress === 95) if (statusEl) statusEl.innerText = "Alinhando Variáveis Individuais...";

    if (progress >= 100) {
      clearInterval(window.analysisInterval);
      window.analysisActive = false; // Allow future re-runs if needed (though usually we won't)
      if (statusEl) statusEl.innerText = "FINALIZADO";
      const modulesEl = document.getElementById('load-modules');
      if (modulesEl) modulesEl.innerHTML = '<div class="dot-indicator"></div> Concluído';
      setTimeout(showPlan, 800);
    }
  }, 50); // 5 Sec Analysis for Better Balance
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
    <div class="flex flex-col items-center">
      <div class="text-center mb-10 w-full">
        <h2 class="text-2xl font-display font-bold tracking-tight text-white mb-2">Análise de Bio-Performance</h2>
        <div class="h-1 w-12 bg-primary mx-auto rounded-full"></div>
      </div>

      <div class="card-stitch w-full mb-8 relative overflow-hidden group">
        <div class="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:rotate-12 transition-transform duration-700">
          <i data-lucide="activity" class="w-32 h-32"></i>
        </div>
        
        <div class="flex flex-col items-center py-4">
          <div class="relative w-48 h-48 flex items-center justify-center">
            <svg class="w-full h-full -rotate-90" viewBox="0 0 220 220">
              <circle class="text-white/5 stroke-current" stroke-width="10" fill="transparent" r="95" cx="110" cy="110" />
              <circle id="premium-circle-fill" class="text-primary stroke-current transition-all duration-1000 ease-out" stroke-width="10" stroke-linecap="round" fill="transparent" r="95" cx="110" cy="110" style="stroke-dasharray: 597; stroke-dashoffset: 597;" />
            </svg>
            <div class="absolute flex flex-col items-center text-center">
              <span class="text-5xl font-display font-black tracking-tighter text-white" id="score-counter">0.0</span>
              <span class="text-[10px] font-bold text-primary uppercase tracking-widest mt-1">Apex Score</span>
            </div>
          </div>
          
          <div class="mt-8 grid grid-cols-2 gap-8 w-full">
            <div class="text-center">
              <div class="text-2xl font-display font-bold text-white mb-1">94%</div>
              <div class="text-[9px] text-white/40 uppercase font-black tracking-wider">Precisão</div>
            </div>
            <div class="text-center border-l border-white/10">
              <div class="text-2xl font-display font-bold text-accent mb-1">A+</div>
              <div class="text-[9px] text-white/40 uppercase font-black tracking-wider">Potencial</div>
            </div>
          </div>
        </div>
      </div>

      <div class="w-full space-y-5 mb-10">
        ${[
          { label: 'Controle Neuromuscular', id: 'sym', val: symmetry, icon: 'zap' },
          { label: 'Capacidade Erétil', id: 'prop', val: proportions, icon: 'shield' },
          { label: 'Vigor e Resistência', id: 'text', val: texture, icon: 'flame' }
        ].map(s => `
          <div class="bg-white/5 border border-white/5 p-4 rounded-xl">
            <div class="flex justify-between items-center mb-3">
              <div class="flex items-center gap-2">
                <i data-lucide="${s.icon}" class="w-3 h-3 text-primary"></i>
                <span class="text-[10px] font-bold text-white/60 uppercase tracking-widest">${s.label}</span>
              </div>
              <span class="text-xs font-display font-bold text-primary" id="${s.id}-percent">0%</span>
            </div>
            <div class="chart-bar-container">
              <div id="${s.id}-fill" class="chart-bar-fill w-0 transition-all duration-1000"></div>
            </div>
          </div>
        `).join('')}
      </div>

      <button class="w-full py-5 rounded-xl bg-white text-black font-display font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-white/10 mb-6 flex items-center justify-center gap-2" id="btn-show-proto">
        <span>VER SOLUÇÃO EXATA</span>
        <i data-lucide="chevron-right" class="w-5 h-5"></i>
      </button>

      <p class="text-[9px] font-display text-white/30 uppercase tracking-[0.2em]">Diagnóstico de Performance Finalizado</p>
    </div>
  `;

  // Re-init icons for the new content
  lucide.createIcons();


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
  mainContent.innerHTML = '';

  // Generate a session-consistent "launch end" date (3 days from now)
  if (!window._launchEndDate) {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    window._launchEndDate = d;
  }

  mainContent.insertAdjacentHTML('beforeend', `
    <div class="flex flex-col items-center protocol-page">

      <!-- ═══════════════════════════════════════════════ -->
      <!-- 0. AUTHORITY SECTION — Dr. Apex -->
      <!-- ═══════════════════════════════════════════════ -->
      <div class="authority-section w-full mb-10">
        <div class="authority-card card-stitch !p-0 overflow-hidden relative">
          <div class="authority-photo-wrapper">
            <img src="dr_apex_authority.png" alt="Dr. Apex — Especialista em Performance Masculina" class="authority-photo">
            <div class="authority-photo-gradient"></div>
          </div>
          <div class="authority-info p-6">
            <div class="flex items-center gap-2 mb-3">
              <div class="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              <span class="text-[10px] font-black uppercase tracking-[0.2em] text-accent">Revisado por Especialista</span>
            </div>
            <h3 class="text-xl font-display font-bold text-white mb-1">Dr. Rafael Apex</h3>
            <p class="text-[11px] text-primary font-bold uppercase tracking-wider mb-3">Especialista em Urologia Funcional & Bio-Otimização</p>
            <p class="text-[12px] text-white/50 leading-relaxed">
              Mais de 18 anos dedicados à saúde masculina. Criador do Protocolo Apex — um sistema comprovado de reativação da performance baseado em ciência urológica, controle neuromuscular e nutrição celular estratégica.
            </p>
            <div class="authority-badges mt-4 flex flex-wrap gap-2">
              <span class="authority-badge-pill"><i data-lucide="graduation-cap" class="w-3 h-3"></i> +18 anos de prática</span>
              <span class="authority-badge-pill"><i data-lucide="users" class="w-3 h-3"></i> +10.000 homens atendidos</span>
              <span class="authority-badge-pill"><i data-lucide="award" class="w-3 h-3"></i> Protocolo Validado</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ═══════════════════════════════════════════════ -->
      <!-- 1. DIAGNÓSTICO PESSOAL — "O que encontramos" -->
      <!-- ═══════════════════════════════════════════════ -->
      <div class="card-stitch w-full mb-8 relative border-primary/20 bg-primary/5">
        <div class="flex items-center gap-2 text-primary font-display font-bold mb-4">
          <i data-lucide="scan-line" class="w-5 h-5"></i>
          <h2 class="text-[11px] uppercase tracking-wider text-primary">Seu Diagnóstico Personalizado</h2>
        </div>
        <p class="text-white/80 text-sm leading-relaxed mb-4 font-display">
          Com base nas suas 15 respostas, identificamos <span class="text-primary font-bold">Fluxo Sanguíneo Restrito</span> e <span class="text-primary font-bold">Musculatura Pélvica Enfraquecida</span> — dois fatores que impactam diretamente rigidez, controle e duração.
        </p>
        <p class="text-white/60 text-[13px] leading-relaxed">
          A boa notícia: <strong class="text-accent">essas condições são 100% reversíveis</strong> com o protocolo correto. Homens com perfil similar ao seu recuperam a performance em 14 a 21 dias.
        </p>
      </div>

      <!-- ═══════════════════════════════════════════════ -->
      <!-- 2. COMO FUNCIONA — 3 Passos -->
      <!-- ═══════════════════════════════════════════════ -->
      <div class="w-full mb-10">
        <div class="flex items-center gap-3 mb-6">
          <div class="h-px flex-1 bg-white/10"></div>
          <span class="text-[9px] font-black uppercase tracking-[3px] text-white/40">Como Funciona</span>
          <div class="h-px flex-1 bg-white/10"></div>
        </div>
        
        <div class="how-it-works-grid">
          <div class="how-step">
            <div class="how-step-number">01</div>
            <div class="how-step-icon"><i data-lucide="clipboard-check" class="w-6 h-6 text-primary"></i></div>
            <h4 class="how-step-title">Diagnóstico</h4>
            <p class="how-step-desc">Analisamos suas 15 respostas e cruzamos com +50 mil perfis para identificar seus pontos críticos.</p>
          </div>
          <div class="how-step-divider"><i data-lucide="chevron-right" class="w-5 h-5 text-white/20"></i></div>
          <div class="how-step">
            <div class="how-step-number">02</div>
            <div class="how-step-icon"><i data-lucide="dumbbell" class="w-6 h-6 text-accent"></i></div>
            <h4 class="how-step-title">Protocolo</h4>
            <p class="how-step-desc">Exercícios pélvicos + nutrição celular + técnicas de controle. 10 min/dia. Sem remédios.</p>
          </div>
          <div class="how-step-divider"><i data-lucide="chevron-right" class="w-5 h-5 text-white/20"></i></div>
          <div class="how-step">
            <div class="how-step-number">03</div>
            <div class="how-step-icon"><i data-lucide="trending-up" class="w-6 h-6 text-[#f59e0b]"></i></div>
            <h4 class="how-step-title">Resultados</h4>
            <p class="how-step-desc">Semana 1: mais controle. Semana 2: rigidez notável. Semana 3: performance de pico restaurada.</p>
          </div>
        </div>
      </div>

      <!-- ═══════════════════════════════════════════════ -->
      <!-- 3. PRODUCT MOCKUP — "O que você recebe" -->
      <!-- ═══════════════════════════════════════════════ -->
      <div class="w-full mb-10">
        <div class="flex items-center gap-3 mb-8">
          <div class="h-px flex-1 bg-white/10"></div>
          <span class="text-[9px] font-black uppercase tracking-[3px] text-white/40">O Que Você Recebe Hoje</span>
          <div class="h-px flex-1 bg-white/10"></div>
        </div>

        <!-- Product Visual -->
        <div class="product-mockup-wrapper mb-8">
          <img src="product_mockup.png" alt="Protocolo Apex — Kit Digital Completo" class="product-mockup-img">
          <div class="product-mockup-glow"></div>
        </div>

        <!-- Module Cards -->
        <div class="space-y-3">
          ${[
            { title: 'Protocolo de Força Nível 3', desc: 'Exercícios progressivos de controle neuromuscular. Técnicas de rigidez máxima com evolução semanal.', icon: 'zap', color: 'text-primary' }
          ].map(item => `
            <div class="card-stitch !py-5 !px-6 flex items-start gap-4 hover:border-primary/30 transition-all group">
              <div class="w-10 h-10 rounded-xl bg-white/5 flex-shrink-0 flex items-center justify-center ${item.color} mt-0.5 group-hover:bg-white/10 transition-colors">
                <i data-lucide="${item.icon}" class="w-5 h-5"></i>
              </div>
              <div class="flex-1">
                <span class="text-[13px] font-display font-bold text-white block mb-1">${item.title}</span>
                <span class="text-[11px] text-white/50 leading-relaxed block">${item.desc}</span>
                <span class="text-[9px] text-primary/60 font-bold uppercase tracking-wider mt-2 inline-block">Guia Digital Passo a Passo</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- ═══════════════════════════════════════════════ -->
      <!-- 4. BEFORE/AFTER — Projeção Visual -->
      <!-- ═══════════════════════════════════════════════ -->
      <div class="card-stitch w-full mb-10 !p-8">
        <h3 class="text-[12px] font-display font-bold text-white/30 uppercase tracking-[0.3em] text-center mb-10">Projeção Biológica: 30 Dias</h3>
        <div class="grid grid-cols-2 gap-6 relative">
          <div class="absolute left-1/2 top-4 bottom-4 w-px bg-white/5"></div>
          <div class="text-center">
            <div class="text-[10px] font-display font-bold text-red-500/80 uppercase tracking-widest mb-6">Sem Protocolo</div>
            <div class="relative aspect-[3/4] mb-6">
              <img src="performance_before_sad_man_1774114625856.png" class="w-full h-full object-cover rounded-2xl grayscale opacity-50 shadow-inner">
              <div class="absolute inset-0 rounded-2xl border border-white/5"></div>
            </div>
            <div class="flex justify-center gap-1.5">
              <div class="h-1 w-5 bg-red-500 rounded-full"></div>
              <div class="h-1 w-5 bg-white/5 rounded-full"></div>
              <div class="h-1 w-5 bg-white/5 rounded-full"></div>
            </div>
            <p class="text-[9px] text-white/20 italic font-medium mt-4 tracking-wide">Estagnação e frustração</p>
          </div>
          <div class="text-center">
            <div class="text-[10px] font-display font-bold text-accent uppercase tracking-widest mb-6">Com Protocolo Apex</div>
            <div class="relative aspect-[3/4] mb-6">
              <img src="performance_after_happy_couple_1774114685383.png" class="w-full h-full object-cover rounded-2xl shadow-xl border border-accent/20">
              <div class="absolute inset-0 rounded-2xl shadow-[inset_0_0_20px_rgba(0,168,132,0.1)]"></div>
            </div>
            <div class="flex justify-center gap-1.5">
              <div class="h-1 w-5 bg-accent rounded-full"></div>
              <div class="h-1 w-5 bg-accent rounded-full"></div>
              <div class="h-1 w-5 bg-accent rounded-full shadow-[0_0_8px_var(--accent)]"></div>
            </div>
            <p class="text-[9px] text-accent font-bold uppercase tracking-[0.2em] mt-4">Confiança e Performance</p>
          </div>
        </div>
      </div>

      <!-- ═══════════════════════════════════════════════ -->
      <!-- 5. SOCIAL PROOF — Depoimentos Aprofundados -->
      <!-- ═══════════════════════════════════════════════ -->
      <div class="w-full mb-12">
        <div class="flex items-center gap-3 mb-8">
          <div class="h-px flex-1 bg-white/10"></div>
          <span class="text-[9px] font-black uppercase tracking-[3px] text-white/40">Resultados Reais</span>
          <div class="h-px flex-1 bg-white/10"></div>
        </div>

        <!-- Stat Banner -->
        <div class="grid grid-cols-3 gap-3 mb-8 w-full">
          <div class="card-stitch !p-3 text-center">
            <div class="flex text-[#f59e0b] mb-1 justify-center">
              <i data-lucide="star" class="w-2.5 h-2.5 fill-current"></i>
              <i data-lucide="star" class="w-2.5 h-2.5 fill-current"></i>
              <i data-lucide="star" class="w-2.5 h-2.5 fill-current"></i>
              <i data-lucide="star" class="w-2.5 h-2.5 fill-current"></i>
              <i data-lucide="star-half" class="w-2.5 h-2.5 fill-current"></i>
            </div>
            <div class="text-lg font-display font-bold text-white">4.7</div>
            <div class="text-[8px] text-white/30 uppercase font-black tracking-widest">Avaliação</div>
          </div>
          <div class="card-stitch !p-3 text-center">
            <i data-lucide="users" class="w-4 h-4 text-primary mb-1 mx-auto"></i>
            <div class="text-lg font-display font-bold text-white">10k+</div>
            <div class="text-[8px] text-white/30 uppercase font-black tracking-widest">Homens Ativos</div>
          </div>
          <div class="card-stitch !p-3 text-center border-accent/20">
            <i data-lucide="check-circle" class="w-4 h-4 text-accent mb-1 mx-auto"></i>
            <div class="text-lg font-display font-bold text-accent">93%</div>
            <div class="text-[8px] text-white/30 uppercase font-black tracking-widest">Satisfação</div>
          </div>
        </div>
        
        <!-- Extended testimonials marquee -->
        <div class="marquee-container relative py-4 mb-8">
          <div class="marquee-track flex gap-4" id="results-marquee-track">
            ${[
              { text: "Tinha vergonha de iniciar. Em 2 semanas minha esposa notou a diferença. Hoje ela pergunta o que mudou — e eu só sorrio.", user: "Marcos R., 44, São Paulo", time: "Resultado em 14 dias" },
              { text: "Achei que era normal perder a performance com a idade. Estava errado. O protocolo me devolveu o que eu pensava ter perdido pra sempre.", user: "Carlos F., 51, Curitiba", time: "Resultado em 21 dias" },
              { text: "Já tinha tentado suplemento, vídeo no YouTube, de tudo. Nada funcionava. O Apex foi o primeiro que deu resultado concreto.", user: "Ricardo T., 37, Rio de Janeiro", time: "Resultado em 10 dias" },
              { text: "Não é mágica. É método. Seguindo o cronograma direitinho, o controle vem naturalmente. Melhor custo-benefício que já vi.", user: "Felipe A., 33, Brasília", time: "Resultado em 18 dias" },
              { text: "Minha confiança mudou completamente. Não é só na cama — é no dia a dia, na energia, na disposição. Recomendo de olhos fechados.", user: "André L., 46, Belo Horizonte", time: "Resultado em 15 dias" }
            ].map(item => `
              <div class="bg-white/5 border border-white/10 p-5 rounded-2xl min-w-[300px] backdrop-blur-sm">
                <div class="flex text-[#f59e0b] mb-3">
                  <i data-lucide="star" class="w-2.5 h-2.5 fill-current"></i><i data-lucide="star" class="w-2.5 h-2.5 fill-current"></i><i data-lucide="star" class="w-2.5 h-2.5 fill-current"></i><i data-lucide="star" class="w-2.5 h-2.5 fill-current"></i><i data-lucide="star" class="w-2.5 h-2.5 fill-current"></i>
                </div>
                <p class="text-xs text-white/80 italic mb-4 leading-relaxed">"${item.text}"</p>
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <span class="text-[10px] font-bold text-primary font-display">${item.user}</span>
                    <i data-lucide="badge-check" class="w-3 h-3 text-primary/60"></i>
                  </div>
                </div>
                <div class="text-[9px] text-accent/60 font-bold uppercase tracking-wider mt-2">${item.time}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Chat Prints Marquee -->
        <div class="marquee-container relative py-4">
          <div class="marquee-track flex gap-8" id="chat-marquee-track">
            <!-- Mario (WhatsApp) -->
            <div class="chat-print chat-wa flex-shrink-0">
                <div class="chat-status-bar !bg-[#0b141a]"><span>20:53</span><div class="status-icons"><i data-lucide="signal" class="w-3 h-3"></i><i data-lucide="wifi" class="w-3 h-3"></i><i data-lucide="battery" class="w-2.5 h-2.5"></i></div></div>
                <div class="chat-header !bg-[#202c33] !border-none !py-3">
                    <i data-lucide="arrow-left" class="w-4 h-4 mr-1"></i>
                    <img src="user_profile_1.webp" class="chat-avatar !w-9 !h-9" onerror="this.src='https://ui-avatars.com/api/?name=Mario&background=random'" loading="lazy">
                    <div class="chat-user"><span class="chat-name !text-[15px]">Mario</span><span class="chat-status !text-[10px]">online</span></div>
                    <div class="chat-icons !opacity-100 !gap-5"><i data-lucide="video" class="w-5 h-5"></i><i data-lucide="phone" class="w-4 h-4"></i><i data-lucide="more-vertical" class="w-4 h-4"></i></div>
                </div>
                <div class="chat-body !p-5 !bg-[#0b141a]">
                    <div class="text-[10px] text-white/20 text-center mb-6 uppercase tracking-widest">Hoje</div>
                    <div class="message received !text-[13px] !bg-[#202c33]">Mano, finalmente algo que funciona de verdade. Achei q meus melhores dias tinham passado, mas o Protocolo Apex me provou o contrário. 💪<div class="msg-time-wa">22:09 <i data-lucide="check-check" class="w-3 h-3 text-[#53bdeb]"></i></div></div>
                </div>
                <div class="chat-footer chat-wa-footer bg-[#0b141a] p-3 flex gap-2"><div class="wa-input bg-[#2a3942] rounded-full flex-1 px-3 py-2 text-[13px] text-white/30 flex items-center gap-3"><i data-lucide="smile" class="w-5 h-5"></i><span>Mensagem</span><div class="flex-1"></div><i data-lucide="paperclip" class="w-5 h-5 -rotate-45"></i><i data-lucide="camera" class="w-5 h-5"></i></div><div class="w-10 h-10 bg-[#00a884] rounded-full flex items-center justify-center"><i data-lucide="mic" class="w-5 h-5 text-black"></i></div></div>
            </div>
            <!-- Leonardo (Messenger) -->
            <div class="chat-print chat-fb flex-shrink-0">
                <div class="chat-status-bar !bg-black"><span>20:53</span><div class="status-icons"><i data-lucide="signal" class="w-3 h-3"></i><i data-lucide="wifi" class="w-3 h-3"></i><i data-lucide="battery" class="w-2.5 h-2.5"></i></div></div>
                <div class="chat-header !bg-black !border-none !py-4"><i data-lucide="arrow-left" class="w-5 h-5 text-[#0084ff]"></i><img src="user_profile_2.webp" class="chat-avatar !w-8 !h-8" onerror="this.src='https://ui-avatars.com/api/?name=Leonardo+Mendes&background=random'" loading="lazy"><div class="chat-user"><span class="chat-name !text-[15px]">Leonardo Mendes</span><span class="chat-status !text-[10px]">Ativo agora</span></div><div class="chat-icons !opacity-100 !gap-4 text-[#0084ff]"><i data-lucide="phone" class="w-5 h-5 fill-current"></i><i data-lucide="video" class="w-5 h-5 fill-current"></i><i data-lucide="info" class="w-5 h-5"></i></div></div>
                <div class="chat-body !p-0"><div class="chat-intro bg-black"><div class="chat-intro-avatar !w-20 !h-20" style="background: url('https://ui-avatars.com/api/?name=Leonardo+M&background=00E0FF&color=fff') center/cover;"></div><span class="chat-intro-name !text-[18px]">Leonardo Mendes</span><span class="chat-intro-handle">@leovazmendes</span><span class="chat-intro-meta">São amigos no Facebook</span><button class="chat-intro-action">Ver perfil</button></div><div class="text-[9px] text-white/20 text-center my-4 uppercase tracking-[0.2em]">20/10/2020 às 09:01</div><div class="message bubble-fb !ml-5 !mb-4 !bg-[#242526] !text-[13px]">Melhor investimento que fiz. A confiança mudou 100%. Vale cada centavo! ✅</div></div>
                <div class="chat-footer p-4 flex gap-4 text-[#0084ff] border-t border-white/5 bg-black"><i data-lucide="plus-circle" class="w-5 h-5 fill-current"></i><i data-lucide="camera" class="w-5 h-5 fill-current"></i><i data-lucide="image" class="w-5 h-5 fill-current"></i><i data-lucide="mic" class="w-5 h-5 fill-current"></i><div class="flex-1 bg-[#242526] rounded-full px-4 py-1.5 text-[12px] text-white/40">Mensagem</div><i data-lucide="thumbs-up" class="w-5 h-5 fill-current"></i></div>
            </div>
            <!-- Carlos (WhatsApp) -->
            <div class="chat-print chat-wa flex-shrink-0">
                <div class="chat-status-bar !bg-[#0b141a]"><span>20:53</span><div class="status-icons"><i data-lucide="signal" class="w-3 h-3"></i><i data-lucide="wifi" class="w-3 h-3"></i><i data-lucide="battery" class="w-2.5 h-2.5"></i></div></div>
                <div class="chat-header !bg-[#202c33] !border-none !py-3"><i data-lucide="arrow-left" class="w-4 h-4 mr-1"></i><img src="user_profile_3.webp" class="chat-avatar !w-9 !h-9" onerror="this.src='https://ui-avatars.com/api/?name=Carlos&background=random'" loading="lazy"><div class="chat-user"><span class="chat-name !text-[15px]">Carlos Silveira</span><span class="chat-status !text-[10px]">online</span></div><div class="chat-icons !opacity-100 !gap-5"><i data-lucide="video" class="w-5 h-5"></i><i data-lucide="phone" class="w-4 h-4"></i><i data-lucide="more-vertical" class="w-4 h-4"></i></div></div>
                <div class="chat-body !p-5 !bg-[#0b141a]"><div class="message received !text-[13px] !bg-[#202c33]">Até minha esposa comentou a diferença. Protocolo nota 10, mudou o jogo aqui em casa! 👊<div class="msg-time-wa">11:15 <i data-lucide="check-check" class="w-3 h-3 text-[#53bdeb]"></i></div></div></div>
                <div class="chat-footer chat-wa-footer bg-[#0b141a] p-3 flex gap-2"><div class="wa-input bg-[#2a3942] rounded-full flex-1 px-3 py-2 text-[13px] text-white/30 flex items-center gap-3"><i data-lucide="smile" class="w-5 h-5"></i><span>Mensagem</span><div class="flex-1"></div><i data-lucide="paperclip" class="w-5 h-5 -rotate-45"></i><i data-lucide="camera" class="w-5 h-5"></i></div><div class="w-10 h-10 bg-[#00a884] rounded-full flex items-center justify-center"><i data-lucide="mic" class="w-5 h-5 text-black"></i></div></div>
            </div>
          </div>
        </div>
      </div>

      <!-- ═══════════════════════════════════════════════ -->
      <!-- 6. PARA QUEM É / PARA QUEM NÃO É -->
      <!-- ═══════════════════════════════════════════════ -->
      <div class="grid grid-cols-1 gap-4 w-full mb-10">
        <div class="card-stitch !p-5 border-accent/20">
          <h4 class="text-[11px] font-display font-bold text-accent uppercase tracking-wider mb-4 flex items-center gap-2"><i data-lucide="check-circle" class="w-4 h-4"></i> Para quem é o Protocolo</h4>
          <ul class="space-y-2">
            ${['Homens que sentem que perderam a performance de antes', 'Quem quer mais controle e duração sem depender de remédios', 'Quem busca resultados naturais, com base científica', 'Homens de 25 a 65 anos em qualquer nível de condicionamento'].map(t => `
              <li class="flex items-start gap-2 text-[12px] text-white/70"><i data-lucide="check" class="w-3.5 h-3.5 text-accent shrink-0 mt-0.5"></i><span>${t}</span></li>
            `).join('')}
          </ul>
        </div>
        <div class="card-stitch !p-5 border-red-500/10">
          <h4 class="text-[11px] font-display font-bold text-red-400 uppercase tracking-wider mb-4 flex items-center gap-2"><i data-lucide="x-circle" class="w-4 h-4"></i> Para quem NÃO é</h4>
          <ul class="space-y-2">
            ${['Quem busca pílula mágica ou resultado sem nenhum esforço', 'Quem não vai dedicar 10 minutos por dia ao protocolo', 'Quem tem condições médicas graves (consulte seu médico primeiro)'].map(t => `
              <li class="flex items-start gap-2 text-[12px] text-white/40"><i data-lucide="x" class="w-3.5 h-3.5 text-red-400/60 shrink-0 mt-0.5"></i><span>${t}</span></li>
            `).join('')}
          </ul>
        </div>
      </div>

      <!-- ═══════════════════════════════════════════════ -->
      <!-- 7. GARANTIA — Antes do CTA -->
      <!-- ═══════════════════════════════════════════════ -->
      <div class="guarantee-section w-full mb-8">
        <div class="guarantee-card">
          <div class="guarantee-shield">
            <i data-lucide="shield-check" class="w-12 h-12 text-accent"></i>
          </div>
          <h4 class="text-base font-display font-black text-white mb-2">Garantia Incondicional de 7 Dias</h4>
          <p class="text-[13px] text-white/60 leading-relaxed mb-4">
            Experimente o Protocolo Apex por 7 dias completos. Se não sentir diferença na sua performance, energia ou confiança — basta enviar uma mensagem e devolvemos <strong class="text-accent">100% do valor. Sem perguntas.</strong>
          </p>
          <p class="text-[11px] text-accent/80 font-bold italic">"O risco é todo nosso. A transformação é toda sua."</p>
        </div>
      </div>

      <!-- ═══════════════════════════════════════════════ -->
      <!-- 8. PRICING — Oferta de Lançamento -->
      <!-- ═══════════════════════════════════════════════ -->
      <div class="card-stitch w-full mb-8 relative border-primary/10 bg-white/[0.02] flex flex-col items-center pt-12 pb-8 px-6">
        <div class="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-accent text-black text-[10px] font-black uppercase tracking-widest shadow-xl">⚡ Lançamento — 74% OFF</div>
        
        <!-- Value Stack Badge -->
        <div class="value-stack-badge mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          Oferta garantida por tempo limitado
        </div>

        <!-- Stacked Value -->  
        <div class="text-center mb-2 w-full">
          <div class="space-y-1 mb-4">
            <div class="flex items-center justify-between px-2 opacity-40">
              <span class="text-[11px] font-display text-white">Guia Protocolo de Força Nível 3</span>
              <span class="text-[11px] font-bold text-white line-through">R$ 97,00</span>
            </div>
          </div>
          <div class="h-px w-full bg-white/10 mb-4"></div>
          <div class="flex items-center justify-between px-2 mb-2">
            <span class="text-[11px] font-display text-white/50 uppercase tracking-wider">Valor Normal</span>
            <span class="price-anchor-old text-[14px]">R$ 97,00</span>
          </div>
        </div>

        <!-- Hero Price -->
        <div class="text-center mb-2">
          <div class="text-[10px] font-display font-bold text-white/30 mb-1 uppercase tracking-widest">Você paga apenas</div>
          <div class="price-main-value text-white">
            <span class="price-main-brl text-primary">R$</span>
            <span class="price-main-int text-white">24</span>
            <span class="price-main-dec text-white">,90</span>
          </div>
          <div class="flex items-center justify-center gap-2 mt-2">
            <span class="price-saving-pill">
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"/></svg>
              Economia de R$ 72,10
            </span>
          </div>
        </div>
        <p class="text-[10px] text-white/40 mb-8 uppercase tracking-widest">Pagamento único · Acesso Vitalício</p>

        <!-- Launch Timer — Ethical Scarcity -->
        <div class="w-full mb-8">
          <div class="launch-timer-wrapper">
            <div class="flex items-center justify-center gap-2 mb-3">
              <i data-lucide="clock" class="w-3.5 h-3.5 text-[#f59e0b]"></i>
              <span class="text-[10px] font-black uppercase tracking-wider text-[#f59e0b]">Oferta de lançamento encerra em:</span>
            </div>
            <div class="launch-countdown flex justify-center gap-3" id="launch-countdown">
              <div class="countdown-unit"><span class="countdown-number" id="cd-days">00</span><span class="countdown-label">Dias</span></div>
              <span class="countdown-sep">:</span>
              <div class="countdown-unit"><span class="countdown-number" id="cd-hours">00</span><span class="countdown-label">Horas</span></div>
              <span class="countdown-sep">:</span>
              <div class="countdown-unit"><span class="countdown-number" id="cd-mins">00</span><span class="countdown-label">Min</span></div>
              <span class="countdown-sep">:</span>
              <div class="countdown-unit"><span class="countdown-number" id="cd-secs">00</span><span class="countdown-label">Seg</span></div>
            </div>
            <p class="text-[9px] text-white/30 text-center mt-3">Após o lançamento, o valor volta para R$ 97,00</p>
          </div>
        </div>
        
        <button class="btn-apex-elite w-full py-7 rounded-2xl text-black font-display font-black text-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-4 mb-4 tracking-widest" onclick="window.location.href = window.apex_checkout_url || 'https://lastlink.com/p/CAA303628/checkout-payment/'">
          <span>GARANTIR MEU PROTOCOLO</span>
          <i data-lucide="zap" class="w-6 h-6 fill-current"></i>
        </button>

        <p class="text-[10px] text-white/30 text-center mb-6 px-4">Acesso imediato após confirmação do pagamento • Download digital</p>

        <div class="flex justify-center gap-8 opacity-40 pb-6">
            <div class="flex flex-col items-center gap-1">
                <i data-lucide="lock" class="w-4 h-4 text-white"></i>
                <span class="text-[8px] font-bold uppercase">Pagamento Seguro</span>
            </div>
            <div class="flex flex-col items-center gap-1">
                <i data-lucide="shield-check" class="w-4 h-4 text-white"></i>
                <span class="text-[8px] font-bold uppercase">Garantia 7 Dias</span>
            </div>
            <div class="flex flex-col items-center gap-1">
                <i data-lucide="credit-card" class="w-4 h-4 text-white"></i>
                <span class="text-[8px] font-bold uppercase">PIX / Cartão</span>
            </div>
        </div>
      </div>

      <!-- ═══════════════════════════════════════════════ -->
      <!-- 9. FAQ — Matando Objeções -->
      <!-- ═══════════════════════════════════════════════ -->
      <div class="w-full mb-12">
        <div class="flex items-center gap-3 mb-8">
          <div class="h-px flex-1 bg-white/10"></div>
          <span class="text-[9px] font-black uppercase tracking-[3px] text-white/40">Perguntas Frequentes</span>
          <div class="h-px flex-1 bg-white/10"></div>
        </div>

        <div class="faq-container space-y-3">
          ${[
            { q: 'Funciona para qualquer idade?', a: 'Sim. O protocolo foi desenvolvido para homens de 25 a 65+ anos. Os exercícios são adaptados ao seu nível — seja iniciante ou avançado. A fisiologia masculina responde ao treino neuromuscular em qualquer faixa etária.' },
            { q: 'É seguro? Tem contraindicação?', a: 'O protocolo é 100% natural — sem remédios, sem suplementos obrigatórios, sem efeitos colaterais. São exercícios pélvicos validados pela ciência urológica. Se você tem alguma condição médica grave, recomendamos consultar seu médico.' },
            { q: 'Quando vou ver os primeiros resultados?', a: 'A maioria dos homens reporta melhorias no controle já na primeira semana. Resultados mais significativos de rigidez e duração acontecem entre 14 e 21 dias de prática consistente.' },
            { q: 'Como funciona o acesso?', a: 'Após a confirmação do pagamento, você recebe imediatamente um link para download do kit completo (3 módulos + bônus) em formato PDF. Acesso vitalício — baixe quantas vezes quiser.' },
            { q: 'E se eu não gostar? Posso pedir reembolso?', a: 'Com certeza. Você tem 7 dias de garantia incondicional. Se por qualquer motivo não estiver satisfeito, basta enviar uma mensagem e devolvemos 100% do valor. Sem burocracia, sem perguntas.' },
            { q: 'Preciso de equipamento ou academia?', a: 'Não. Todos os exercícios são feitos em casa, sem nenhum equipamento. Levam em média 10 minutos por dia. Você pode fazer a qualquer hora, em qualquer lugar.' }
          ].map((item, idx) => `
            <div class="faq-item" onclick="this.classList.toggle('open')">
              <div class="faq-question">
                <span>${item.q}</span>
                <i data-lucide="chevron-down" class="faq-chevron w-4 h-4"></i>
              </div>
              <div class="faq-answer">
                <p>${item.a}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- ═══════════════════════════════════════════════ -->
      <!-- 10. FINAL CTA — Last push -->
      <!-- ═══════════════════════════════════════════════ -->
      <div class="w-full mb-8 text-center">
        <p class="text-white/40 text-[13px] mb-6 leading-relaxed max-w-[350px] mx-auto">Cada dia sem ação é mais um dia de frustração. Seu protocolo personalizado está pronto — e protegido por garantia total.</p>
        <button class="btn-apex-elite w-full py-6 rounded-2xl text-black font-display font-black text-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 tracking-wider" onclick="window.location.href = window.apex_checkout_url || 'https://lastlink.com/p/CAA303628/checkout-payment/'">
          <span>QUERO MEU PROTOCOLO AGORA</span>
          <i data-lucide="arrow-right" class="w-5 h-5"></i>
        </button>
      </div>

      <div class="mt-4 text-[9px] font-mono text-white/10 uppercase tracking-[0.5em] mb-12">
        APEXCORE V2.0 // ENCRYPTED SESSION
      </div>
    </div>
  `);
  
  lucide.createIcons();

  // Countdown Timer Logic
  function updateCountdown() {
    const now = new Date();
    const end = window._launchEndDate;
    const diff = Math.max(0, end - now);
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);
    
    const dEl = document.getElementById('cd-days');
    const hEl = document.getElementById('cd-hours');
    const mEl = document.getElementById('cd-mins');
    const sEl = document.getElementById('cd-secs');
    
    if (dEl) dEl.textContent = String(days).padStart(2, '0');
    if (hEl) hEl.textContent = String(hours).padStart(2, '0');
    if (mEl) mEl.textContent = String(mins).padStart(2, '0');
    if (sEl) sEl.textContent = String(secs).padStart(2, '0');
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // Marquee clone logic
  setTimeout(() => {
    ['results-marquee-track', 'chat-marquee-track'].forEach(id => {
      const track = document.getElementById(id);
      if (track) {
        Array.from(track.children).forEach(child => {
          track.appendChild(child.cloneNode(true));
        });
      }
    });
    // Reinit lucide icons inside cloned nodes
    lucide.createIcons();
  }, 100);

  // GSAP ScrollTrigger — animate protocol page sections on scroll
  setTimeout(() => {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    // Animate each card/section as it enters viewport
    const revealEls = mainContent.querySelectorAll('.card-stitch, .authority-section, .guarantee-section, .how-it-works-grid, .product-mockup-wrapper, .faq-container, .marquee-container');
    revealEls.forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          delay: 0,
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true
          }
        }
      );
    });

    // Stagger the how-it-works steps
    const howSteps = mainContent.querySelectorAll('.how-step');
    if (howSteps.length) {
      gsap.fromTo(howSteps,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: howSteps[0],
            start: 'top 90%',
            once: true
          }
        }
      );
    }

    // Stagger module cards
    const moduleCards = mainContent.querySelectorAll('.space-y-3 .card-stitch');
    if (moduleCards.length) {
      gsap.fromTo(moduleCards,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: moduleCards[0],
            start: 'top 90%',
            once: true
          }
        }
      );
    }
  }, 200);

  // Sticky CTA bar — show after 300px scroll, hide near checkout CTA
  setTimeout(() => {
    const stickyBar = document.getElementById('sticky-cta-bar');
    if (!stickyBar) return;

    let stickyVisible = false;
    const handleStickyScroll = () => {
      const scrollY = window.scrollY;
      const should = scrollY > 300;
      if (should !== stickyVisible) {
        stickyVisible = should;
        stickyBar.classList.toggle('visible', should);
      }
    };

    window.addEventListener('scroll', handleStickyScroll, { passive: true });
    handleStickyScroll(); // initial check
  }, 300);
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

window.addEventListener('load', () => {
  function scheduleNext(isSecond = false) {
    let delay;
    if (isSecond) {
      delay = 50000;
    } else {
      delay = Math.floor(Math.random() * (25000 - 15000 + 1)) + 15000;
    }

    setTimeout(() => {
      showSocialNotification();
      scheduleNext(false);
    }, delay);
  }

  setTimeout(() => {
    showSocialNotification();
    scheduleNext(true); // Schedule the 2nd one at 50s
  }, 5000);
});
