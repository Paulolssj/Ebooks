import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS } from '../constants/colors';

export const ApexCoreUnit: React.FC<{ 
  color?: string,
  isWarning?: boolean,
  progress?: number 
}> = ({ 
  color = COLORS.cyan, 
  isWarning = false,
  progress = 1 
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  // Respiração contínua
  const pulse = interpolate(
    Math.sin(frame / 20), 
    [-1, 1], 
    [1, 1.05]
  );

  // Tremor se estiver em Warning
  const jump = isWarning ? (Math.random() - 0.5) * 4 : 0;

  return (
    <div style={{ 
      width: 400, 
      height: 400, 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      transform: `scale(${pulse}) translate(${jump}px, ${jump}px)`,
      position: 'relative'
    }}>
      <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
        {/* Hexágono Principal */}
        <path
          d="M50 5 L89 27.5 L89 72.5 L50 95 L11 72.5 L11 27.5 Z"
          fill={COLORS.surface}
          stroke={isWarning ? COLORS.crimson : color}
          strokeWidth="2"
          style={{ 
            opacity: progress,
            filter: `drop-shadow(0 0 10px ${isWarning ? COLORS.crimson : color}44)` 
          }}
        />
        
        {/* Núcleo de Energia Interno */}
        <circle 
          cx="50" cy="50" r="15" 
          fill={isWarning ? COLORS.crimson : color} 
          style={{ opacity: 0.8 * progress }}
        />

        {/* Anéis de Pulso */}
        <circle 
          cx="50" cy="50" r={20 + (frame % 60) * 0.5} 
          stroke={isWarning ? COLORS.crimson : color} 
          strokeWidth="1" 
          strokeDasharray="4 4"
          style={{ 
            opacity: interpolate(frame % 60, [0, 60], [0.5, 0]),
          }}
        />
      </svg>
      
      {/* Glow Residual */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        background: `radial-gradient(circle, ${isWarning ? COLORS.crimson : color}22 0%, transparent 70%)`,
        filter: 'blur(30px)',
        zIndex: -1
      }} />
    </div>
  );
};
