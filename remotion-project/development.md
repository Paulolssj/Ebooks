# ApexCore Video Development Guide (Remotion)

Este documento centraliza as definições estratégicas, artísticas e técnicas para a criação de vídeos de marketing de alta performance para o ApexCore, utilizando o Remotion.

---

## 📽️ 1. Objetivo do Vídeo
Criar um anúncio imersivo (9:16) que converta curiosidade em ação, utilizando uma estética de "Ciência de Elite" para o público masculino interessado em bio-hacking e performance.

---

## 🎨 2. Sistema Visual (Art Direction)

### Paleta de Cores
- **Fundo:** `#07070a` (Deep Space Black)
- **Ação/Ciência:** `#00E0FF` (Clinical Cyan)
- **Sucesso/Saúde:** `#00F59B` (Performance Emerald)
- **Alerta/Dor:** `#FF2E55` (Warning Crimson)

### Tipografia
- **Títulos:** Montserrat Black (All Caps, letter-spacing: -3px)
- **Labels Técnicos:** JetBrains Mono ou Inter SemiBold.

---

## 🎞️ 3. Storyboard & Timing (25 segundos / 60fps)

| Cena | Frames | Mensagem | Estética |
| :--- | :--- | :--- | :--- |
| **1. Hook** | 0-180 | "VOCÊ ESTÁ CAINDO." | Círculo carmesim pulsante em erro. |
| **2. Problem** | 180-450 | "RIGIDEZ EM DECLÍNIO." | Gráficos descendentes e distorção. |
| **3. Shift** | 450-660 | "REESCREVA SEU CÓDIGO." | Transição rápida para Ciano e geometria limpa. |
| **4. Solution** | 660-1020| "APEXCORE: ELITE." | Hexágonos, DNA e contadores de dados. |
| **5. Benefit** | 1020-1260| "DOMÍNIO ABSOLUTO." | Expansão visual e brilho esmeralda. |
| **6. CTA** | 1260-1500| "QUERO MEU PROTOCOLO" | Logo ApexCore + Botão Pulsante. |

---

## 📦 4. Arquitetura de Componentes (Assets)

### Componentes de Animação
- `KineticText.tsx`: Animação de entrada `Overshoot` por caractere.
- `DataGrid.tsx`: Malha de pontos e linhas de fundo dinâmicas.
- `BioDNA.tsx`: Hélice de DNA procedural feita com SVGs atómicos.
- `ApexShield.tsx`: O escudo hexagonal que "se desenha" na tela.

### Utilitários de Lógica
- `useSpringScale`: Gancho para escalas naturais.
- `useProgressiveScan`: Lógica para aparição sequencial de dados.

---

## 🛠️ 5. Roadmap de Implementação (Fases)

- [x] **Fase 1:** Direção Criativa & Estrutura.
- [x] **Fase 2:** Direção de Arte & Visual System.
- [x] **Fase 3:** Storyboard & Timing.
- [x] **Fase 4:** Inventário de Assets.
- [x] **Fase 5:** Setup de Fontes e Escopo Global no Remotion.
- [x] **Fase 6:** Desenvolvimento dos Componentes Base (Texto e Grids).
- [x] **Fase 7:** Montagem das Cenas (1 a 6) — COMPLETO.
- [x] **Fase 8:** Polimento de Easing, Glows e Partículas.

---

## 🚀 Como Renderizar
```bash
cd remotion-project
npx remotion render src/index.ts PromoComposition out/video.mp4
```

---
*Documento gerado como guia mestre para o desenvolvimento do projeto Remotion ApexCore.*
