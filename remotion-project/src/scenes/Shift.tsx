import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { BioDNA } from '../assets/BioDNA';
import { SpringScale } from '../components/motion/SpringScale';
import { FadeSlide } from '../components/motion/FadeSlide';
import { Typography } from '../components/shared/Typography';
import { COLORS } from '../constants/colors';

export const Shift: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Transição de Crimson para Cyan
  const transitionProgress = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 60 },
  });

  const bgGlowOpacity = interpolate(transitionProgress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>

      {/* Flash de Transição */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `radial-gradient(circle at center, ${COLORS.cyan}${Math.round(bgGlowOpacity * 25).toString(16).padStart(2, '0')} 0%, transparent 70%)`,
      }} />

      {/* Label */}
      <div style={{ position: 'absolute', top: 120, left: 60 }}>
        <FadeSlide delay={5}>
          <Typography variant="label" color={COLORS.emerald}>RECALIBRAÇÃO_INICIADA</Typography>
        </FadeSlide>
      </div>

      {/* DNA Central */}
      <SpringScale delay={10} stiffness={120} mass={0.8}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <BioDNA progress={transitionProgress} color={COLORS.cyan} />
        </div>
      </SpringScale>

      {/* Linha de Transição Horizontal */}
      <div style={{
        position: 'absolute',
        left: 0,
        right: 0,
        height: 1,
        background: `linear-gradient(90deg, transparent, ${COLORS.cyan}, transparent)`,
        opacity: transitionProgress,
        top: '50%',
        boxShadow: `0 0 20px ${COLORS.cyan}`,
      }} />

      {/* Texto */}
      <div style={{ position: 'absolute', bottom: 320, left: 60, right: 60 }}>
        <FadeSlide delay={20} distance={40}>
          <Typography variant="headline" style={{ fontSize: 90 }}>
            REESCREVA<br />
            <span style={{ color: COLORS.cyan }}>SEU CÓDIGO.</span>
          </Typography>
        </FadeSlide>

        <FadeSlide delay={40} distance={20}>
          <Typography variant="sub" style={{ marginTop: 20, color: `${COLORS.cyan}cc` }}>
            Bio-Otimização Pélvica — Dr. Apex
          </Typography>
        </FadeSlide>
      </div>
    </AbsoluteFill>
  );
};
