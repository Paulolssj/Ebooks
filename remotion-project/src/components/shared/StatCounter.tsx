import { interpolate, useCurrentFrame } from 'remotion';
import { COLORS } from '../../constants/colors';

export const StatCounter: React.FC<{
  from?: number;
  to: number;
  suffix?: string;
  delay?: number;
  duration?: number;
  color?: string;
}> = ({ from = 0, to, suffix = '', delay = 0, duration = 60, color = COLORS.cyan }) => {
  const frame = useCurrentFrame();
  const value = Math.floor(
    interpolate(frame - delay, [0, duration], [from, to], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );

  return (
    <span style={{
      fontSize: 80,
      fontWeight: 900,
      color,
      fontVariantNumeric: 'tabular-nums',
      textShadow: `0 0 30px ${color}88`,
      letterSpacing: -3,
    }}>
      {value}{suffix}
    </span>
  );
};
