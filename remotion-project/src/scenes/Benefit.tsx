import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { FadeSlide } from '../components/motion/FadeSlide';
import { Typography } from '../components/shared/Typography';
import { COLORS } from '../constants/colors';

export const Benefit: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const expansion = spring({
    frame,
    fps,
    config: { damping: 25, stiffness: 40, mass: 1.5 },
  });

  // Escala de expansão global — o "universo" se expande
  const globalScale = interpolate(expansion, [0, 1], [0.85, 1]);
  const emeraldOpacity = interpolate(expansion, [0, 1], [0, 0.5]);

  const testimonials = [
    { name: 'Carlos F., 41 — SP', text: '"Recuperei minha rigidez de verdade."' },
    { name: 'Ricardo T., 35 — RJ', text: '"Acabou a ansiedade de acabar rápido."' },
  ];

  return (
    <AbsoluteFill style={{ transform: `scale(${globalScale})` }}>

      {/* Glow Esmeralda de Expansão */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(circle at center, ${COLORS.emerald}${Math.round(emeraldOpacity * 80).toString(16).padStart(2, '0')} 0%, transparent 70%)`,
        filter: 'blur(120px)',
      }} />

      {/* Label Topo */}
      <div style={{ position: 'absolute', top: 120, left: 60 }}>
        <FadeSlide delay={5}>
          <Typography variant="label" color={COLORS.emerald}>RESULTADO_CONFIRMADO</Typography>
        </FadeSlide>
      </div>

      {/* Headline de Impacto */}
      <div style={{ position: 'absolute', top: 200, left: 60, right: 60 }}>
        <FadeSlide delay={10} distance={60}>
          <Typography variant="headline" style={{ fontSize: 105, lineHeight: 0.9 }}>
            DOMÍNIO<br />
            <span style={{ color: COLORS.emerald }}>ABSOLUTO.</span>
          </Typography>
        </FadeSlide>

        <FadeSlide delay={30} distance={20}>
          <Typography variant="sub" style={{ marginTop: 25, fontSize: 34 }}>
            Em 30 dias. Com ciência e método.
          </Typography>
        </FadeSlide>
      </div>

      {/* Depoimentos */}
      <div style={{ position: 'absolute', bottom: 180, left: 60, right: 60 }}>
        {testimonials.map((t, i) => (
          <FadeSlide key={i} delay={40 + i * 20} distance={25}>
            <div style={{
              background: 'rgba(0, 245, 155, 0.06)',
              border: `1px solid ${COLORS.emerald}44`,
              borderRadius: 16,
              padding: '20px 26px',
              marginBottom: 18,
            }}>
              <p style={{ color: '#fff', fontSize: 28, fontWeight: 600, margin: 0, lineHeight: 1.4 }}>
                {t.text}
              </p>
              <p style={{ color: COLORS.emerald, fontSize: 22, marginTop: 10, fontWeight: 700 }}>
                — {t.name}
              </p>
            </div>
          </FadeSlide>
        ))}
      </div>
    </AbsoluteFill>
  );
};
