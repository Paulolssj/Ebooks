import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const FadeSlide: React.FC<{ 
  children: React.ReactNode, 
  delay?: number,
  direction?: 'up' | 'down',
  distance?: number
}> = ({ children, delay = 0, direction = 'up', distance = 50 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: {
      damping: 12,
      stiffness: 100,
    },
  });

  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const translateY = interpolate(
    progress, 
    [0, 1], 
    [direction === 'up' ? distance : -distance, 0]
  );

  return (
    <div style={{ 
      opacity, 
      transform: `translateY(${translateY}px)`,
    }}>
      {children}
    </div>
  );
};
