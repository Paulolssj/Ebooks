import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { FadeSlide } from '../components/motion/FadeSlide';
import { Typography } from '../components/shared/Typography';
import { StatCounter } from '../components/shared/StatCounter';
import { COLORS } from '../constants/colors';

export const Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Gráfico de barras descendentes
  const bars = [100, 80, 60, 38, 22];
  const barProgress = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>

      {/* Topo: Label Técnico */}
      <div style={{ position: 'absolute', top: 120, left: 60 }}>
        <FadeSlide delay={5}>
          <Typography variant="label">DIAGNÓSTICO_BIOMÉTRICO</Typography>
        </FadeSlide>
      </div>

      {/* Gráfico de Barras Descendente */}
      <div style={{
        position: 'absolute',
        top: 220,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        alignItems: 'flex-end',
        gap: 20,
        height: 250,
      }}>
        {bars.map((h, i) => {
          const animatedH = interpolate(barProgress, [0, 1], [0, h]);
          const isLast = i === bars.length - 1;
          return (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 50,
                height: `${animatedH * 2}px`,
                background: isLast
                  ? `linear-gradient(to top, ${COLORS.crimson}, ${COLORS.crimson}44)`
                  : `linear-gradient(to top, ${COLORS.cyan}66, ${COLORS.cyan}22)`,
                borderRadius: '6px 6px 0 0',
                boxShadow: isLast ? `0 0 20px ${COLORS.crimson}66` : `0 0 10px ${COLORS.cyan}33`,
                transition: 'all 0.3s',
              }} />
              <span style={{ color: COLORS.textMuted, fontSize: 20, fontWeight: 700 }}>{h}%</span>
            </div>
          );
        })}
      </div>

      {/* Headline */}
      <div style={{ position: 'absolute', bottom: 320, left: 60, right: 60 }}>
        <FadeSlide delay={15} distance={40}>
          <Typography variant="headline" color={COLORS.text} style={{ fontSize: 80 }}>
            DECLÍNIO<br />
            <span style={{ color: COLORS.crimson }}>EM CURSO.</span>
          </Typography>
        </FadeSlide>

        <FadeSlide delay={30} distance={20}>
          <Typography variant="sub" style={{ marginTop: 20 }}>
            Performance reduzida em
          </Typography>
        </FadeSlide>

        <FadeSlide delay={40} distance={20}>
          <StatCounter from={0} to={78} suffix="%" delay={40} duration={80} color={COLORS.crimson} />
        </FadeSlide>
      </div>
    </AbsoluteFill>
  );
};
