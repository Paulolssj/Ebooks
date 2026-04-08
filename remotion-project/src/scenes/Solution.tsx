import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { ApexShield } from '../assets/ApexShield';
import { SpringScale } from '../components/motion/SpringScale';
import { FadeSlide } from '../components/motion/FadeSlide';
import { Typography } from '../components/shared/Typography';
import { StatCounter } from '../components/shared/StatCounter';
import { COLORS } from '../constants/colors';

const features = [
  { icon: '⚡', label: 'Protocolo de Força Pélvica' },
  { icon: '🎯', label: 'Controle Ejaculatório' },
  { icon: '🔬', label: 'Guia Nutricional Hormonal' },
  { icon: '📊', label: 'Painel de Progresso' },
];

export const Solution: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const shieldProgress = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 50 },
  });

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>

      {/* Label Topo */}
      <div style={{ position: 'absolute', top: 120, left: 60, right: 60 }}>
        <FadeSlide delay={5}>
          <Typography variant="label" color={COLORS.emerald}>
            PROTOCOLO_APEX_ATIVO
          </Typography>
        </FadeSlide>
      </div>

      {/* Stats Laterais */}
      <div style={{ position: 'absolute', top: 220, left: 60 }}>
        <FadeSlide delay={8}>
          <StatCounter from={0} to={87} suffix="%" delay={8} duration={90} color={COLORS.cyan} />
          <Typography variant="sub" style={{ fontSize: 24, marginTop: -10 }}>
            taxa de resposta
          </Typography>
        </FadeSlide>
      </div>

      <div style={{ position: 'absolute', top: 220, right: 60, textAlign: 'right' }}>
        <FadeSlide delay={15}>
          <StatCounter from={0} to={30} suffix="d" delay={15} duration={70} color={COLORS.emerald} />
          <Typography variant="sub" style={{ fontSize: 24, marginTop: -10, textAlign: 'right' }}>
            para resultados
          </Typography>
        </FadeSlide>
      </div>

      {/* Escudo Central */}
      <SpringScale delay={10} stiffness={80} mass={1.2}>
        <ApexShield progress={shieldProgress} color={COLORS.cyan} />
      </SpringScale>

      {/* Features List */}
      <div style={{ position: 'absolute', bottom: 220, left: 60, right: 60 }}>
        {features.map((f, i) => (
          <FadeSlide key={i} delay={20 + i * 12} distance={30}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 20,
              marginBottom: 18,
              padding: '12px 20px',
              background: 'rgba(0, 224, 255, 0.05)',
              borderLeft: `3px solid ${COLORS.cyan}`,
              borderRadius: '0 8px 8px 0',
            }}>
              <span style={{ fontSize: 30 }}>{f.icon}</span>
              <Typography variant="sub" style={{ fontSize: 26, color: '#fff' }}>
                {f.label}
              </Typography>
            </div>
          </FadeSlide>
        ))}
      </div>
    </AbsoluteFill>
  );
};
