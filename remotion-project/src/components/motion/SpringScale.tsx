import { spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const SpringScale: React.FC<{ 
  children: React.ReactNode, 
  delay?: number,
  mass?: number,
  stiffness?: number,
  damping?: number
}> = ({ children, delay = 0, mass = 0.5, stiffness = 100, damping = 10 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame: frame - delay,
    fps,
    config: {
      mass,
      stiffness,
      damping,
    },
  });

  return (
    <div style={{ transform: `scale(${scale})`, flex: 1, display: 'flex' }}>
      {children}
    </div>
  );
};
