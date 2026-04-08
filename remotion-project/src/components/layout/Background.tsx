import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { COLORS } from '../../constants/colors';

export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  
  // Sutil animação de movimento na grade
  const gridY = interpolate(frame % 300, [0, 300], [0, 100]);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg, overflow: 'hidden' }}>
      {/* Hexagonal/Data Grid Texturizado */}
      <div 
        style={{
          position: 'absolute',
          width: '200%',
          height: '200%',
          top: '-50%',
          left: '-50%',
          backgroundImage: `
            linear-gradient(rgba(0, 224, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 224, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          transform: `translateY(${gridY}px) rotate(15deg)`,
          opacity: 0.5,
        }} 
      />

      {/* Vinheta de Foco */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, transparent 30%, rgba(7, 7, 10, 0.8) 100%)',
        }} 
      />

      {/* Glow Sutil de Base */}
      <div 
        style={{
          position: 'absolute',
          width: 800,
          height: 800,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${COLORS.cyan}11 0%, transparent 70%)`,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          filter: 'blur(100px)',
        }} 
      />
    </AbsoluteFill>
  );
};
