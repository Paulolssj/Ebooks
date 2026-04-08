export const TIMING = {
  FPS: 60,
  SCENES: {
    HOOK: 180,      // 3s
    PROBLEM: 270,   // 4.5s
    SHIFT: 210,     // 3.5s
    SOLUTION: 360,  // 6s
    BENEFIT: 240,   // 4s
    CTA: 240,       // 4s
  },
};

export const TOTAL_DURATION = Object.values(TIMING.SCENES).reduce((a, b) => a + b, 0);
