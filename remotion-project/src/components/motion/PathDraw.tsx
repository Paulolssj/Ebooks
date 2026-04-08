import { interpolate, useCurrentFrame } from 'remotion';

export const PathDraw: React.FC<{ 
  progress: number,
  children: (pathProps: { strokeDasharray: string, strokeDashoffset: number }) => React.ReactNode
}> = ({ progress, children }) => {
  // Simples utilitário para converter progresso 0-1 em dashoffset
  // A assumir que o comprimento do path original é 1000 por convenção
  const length = 1000;
  const strokeDashoffset = interpolate(progress, [0, 1], [length, 0]);

  return (
    <>
      {children({ 
        strokeDasharray: `${length}`, 
        strokeDashoffset 
      })}
    </>
  );
};
