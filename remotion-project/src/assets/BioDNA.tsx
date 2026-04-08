import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { COLORS } from '../../constants/colors';

export const BioDNA: React.FC<{ progress?: number; color?: string }> = ({
  progress = 1,
  color = COLORS.cyan,
}) => {
  const frame = useCurrentFrame();
  const points = 8;
  const height = 400;
  const width = 120;

  const strands = Array.from({ length: points }, (_, i) => {
    const t = i / (points - 1);
    const phase = (frame / 30) * Math.PI * 2;
    const x1 = Math.sin(t * Math.PI * 2 + phase) * (width / 2);
    const x2 = Math.sin(t * Math.PI * 2 + phase + Math.PI) * (width / 2);
    const y = t * height;
    return { x1, x2, y };
  });

  return (
    <div style={{ width: 200, height: 450, position: 'relative', opacity: progress }}>
      <svg width="200" height="450" viewBox="-100 -25 200 450">
        {strands.map((s, i) => {
          const nextS = strands[i + 1];
          if (!nextS) return null;
          const t = i / points;
          const opacity = interpolate(progress, [0, 1], [0, 0.8]);
          return (
            <g key={i}>
              {/* Fita 1 */}
              <line
                x1={s.x1} y1={s.y}
                x2={nextS.x1} y2={nextS.y}
                stroke={color}
                strokeWidth="2"
                opacity={opacity * (0.6 + Math.sin(t * Math.PI) * 0.4)}
                strokeLinecap="round"
              />
              {/* Fita 2 */}
              <line
                x1={s.x2} y1={s.y}
                x2={nextS.x2} y2={nextS.y}
                stroke={COLORS.emerald}
                strokeWidth="2"
                opacity={opacity * (0.6 + Math.sin(t * Math.PI) * 0.4)}
                strokeLinecap="round"
              />
              {/* Ligações transversais */}
              <line
                x1={s.x1} y1={s.y}
                x2={s.x2} y2={s.y}
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="1"
                opacity={opacity}
                strokeDasharray="2 3"
              />
              {/* Nós */}
              <circle cx={s.x1} cy={s.y} r="4" fill={color} opacity={opacity} />
              <circle cx={s.x2} cy={s.y} r="4" fill={COLORS.emerald} opacity={opacity} />
            </g>
          );
        })}
      </svg>
      {/* Glow atrás */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse 60px 200px at center, ${color}22 0%, transparent 70%)`,
        filter: 'blur(20px)',
        zIndex: -1,
      }} />
    </div>
  );
};
