import { AbsoluteFill, useVideoConfig } from 'remotion';
import { ApexCoreUnit } from '../assets/ApexCoreUnit';
import { SpringScale } from '../components/motion/SpringScale';
import { FadeSlide } from '../components/motion/FadeSlide';
import { COLORS } from '../constants/colors';

export const Hook: React.FC = () => {
  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
      {/* Núcleo Central em Estado de Warning */}
      <SpringScale delay={10}>
        <ApexCoreUnit isWarning={true} />
      </SpringScale>

      {/* Texto de Impacto */}
      <div style={{ position: 'absolute', bottom: 300, textAlign: 'center' }}>
        <FadeSlide delay={40} distance={30}>
          <h1 style={{ 
            fontSize: 100, 
            fontWeight: 900, 
            color: '#fff', 
            margin: 0,
            textShadow: `0 0 40px ${COLORS.crimson}aa`
          }}>
            VOCÊ ESTÁ<br/>CAINDO.
          </h1>
        </FadeSlide>
        
        <FadeSlide delay={60} distance={20}>
          <p style={{ 
            fontSize: 32, 
            fontWeight: 600, 
            color: COLORS.crimson, 
            marginTop: 20,
            letterSpacing: 4,
            textTransform: 'uppercase'
          }}>
            SYSTEM_ERROR: PERFORMANCE_LOW
          </p>
        </FadeSlide>
      </div>
    </AbsoluteFill>
  );
};
