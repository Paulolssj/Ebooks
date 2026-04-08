import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS } from '../../constants/colors';

export const ApexShield: React.FC<{ progress?: number; color?: string }> = ({
  progress = 1,
  color = COLORS.cyan,
}) => {
  const frame = useCurrentFrame();
  const segments = 6;
  const r = 160;
  const cx = 180;
  const cy = 180;

  // Ângulos do hexágono
  const hexPoints = Array.from({ length: segments }, (_, i) => {
    const angle = (Math.PI / 180) * (60 * i - 30);
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
    };
  });

  const totalLength = 1200;
  const drawn = interpolate(progress, [0, 1], [totalLength, 0]);

  // Pulso leve da borda
  const borderGlow = interpolate(Math.sin(frame / 20), [-1, 1], [0.6, 1]);

  return (
    <div style={{ width: 360, height: 360, position: 'relative' }}>
      <svg width="360" height="360" viewBox="0 0 360 360" fill="none">
        {/* Borda Hexagonal animada por desenho */}
        <polygon
          points={hexPoints.map(p => `${p.x},${p.y}`).join(' ')}
          stroke={color}
          strokeWidth="2.5"
          fill={`${color}08`}
          strokeDasharray={totalLength}
          strokeDashoffset={drawn}
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 8px ${color})`, opacity: borderGlow }}
        />

        {/* Segmentos internos */}
        {hexPoints.map((p, i) => (
          <line
            key={i}
            x1={cx} y1={cy}
            x2={p.x} y2={p.y}
            stroke={`${color}33`}
            strokeWidth="1"
            strokeDasharray="4 8"
            opacity={progress}
          />
        ))}

        {/* Círculo interno */}
        <circle
          cx={cx} cy={cy} r={r * 0.4}
          stroke={`${color}66`}
          strokeWidth="1.5"
          strokeDasharray="6 4"
          fill="none"
          opacity={progress}
        />

        {/* Núcleo central */}
        <circle
          cx={cx} cy={cy} r={12}
          fill={color}
          opacity={0.9 * progress}
          style={{ filter: `drop-shadow(0 0 12px ${color})` }}
        />
      </svg>

      {/* Glow externo */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(circle, ${color}18 0%, transparent 70%)`,
        filter: 'blur(40px)',
        zIndex: -1,
      }} />
    </div>
  );
};
