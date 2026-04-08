import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { ApexShield } from '../assets/ApexShield';
import { FadeSlide } from '../components/motion/FadeSlide';
import { SpringScale } from '../components/motion/SpringScale';
import { Typography } from '../components/shared/Typography';
import { COLORS } from '../constants/colors';

export const CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Pulso do botão CTA
  const ctaPulse = interpolate(
    Math.sin((frame / 20) * Math.PI),
    [-1, 1],
    [1, 1.04]
  );

  const ctaGlowOpacity = interpolate(
    Math.sin((frame / 20) * Math.PI),
    [-1, 1],
    [0.3, 0.8]
  );

  const shieldScale = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 60 },
  });

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>

      {/* Glow de Fundo */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(circle at center, ${COLORS.cyan}15 0%, transparent 60%)`,
        filter: 'blur(80px)',
      }} />

      {/* Logo / Escudo */}
      <div style={{ position: 'absolute', top: 200, display: 'flex', justifyContent: 'center', width: '100%' }}>
        <SpringScale delay={5} stiffness={100} mass={0.6}>
          <ApexShield progress={shieldScale} color={COLORS.cyan} />
        </SpringScale>
      </div>

      {/* Branding */}
      <div style={{ position: 'absolute', top: 570, textAlign: 'center', left: 0, right: 0 }}>
        <FadeSlide delay={20} distance={20}>
          <Typography variant="label" color={COLORS.cyan}>DR. APEX — APEXCORE</Typography>
        </FadeSlide>
      </div>

      {/* CTA Principal */}
      <div style={{ position: 'absolute', bottom: 280, left: 60, right: 60 }}>
        <FadeSlide delay={25} distance={40}>
          <Typography variant="headline" style={{ textAlign: 'center', fontSize: 78 }}>
            DESCUBRA<br />
            <span style={{ color: COLORS.cyan }}>SEU PLANO.</span>
          </Typography>
        </FadeSlide>

        <FadeSlide delay={40} distance={30}>
          <Typography variant="sub" style={{ textAlign: 'center', marginTop: 16, fontSize: 28 }}>
            Responda 15 perguntas e receba seu protocolo personalizado.
          </Typography>
        </FadeSlide>
      </div>

      {/* Botão Pulsante */}
      <div style={{
        position: 'absolute',
        bottom: 100,
        left: 60,
        right: 60,
        transform: `scale(${ctaPulse})`,
      }}>
        <FadeSlide delay={50} distance={20}>
          <div style={{
            background: COLORS.cyan,
            color: '#07070a',
            padding: '36px 60px',
            borderRadius: 100,
            textAlign: 'center',
            fontSize: 42,
            fontWeight: 900,
            letterSpacing: -1,
            fontFamily: 'Inter, sans-serif',
            boxShadow: `0 0 60px ${COLORS.cyan}${Math.round(ctaGlowOpacity * 255).toString(16).padStart(2, '0')}`,
          }}>
            QUERO MEU PROTOCOLO →
          </div>
        </FadeSlide>
      </div>
    </AbsoluteFill>
  );
};
