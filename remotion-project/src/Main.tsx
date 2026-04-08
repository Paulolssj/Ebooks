import { AbsoluteFill, Series } from 'remotion';
import { TIMING } from './constants/timing';
import { Background } from './components/layout/Background';
import { Hook } from './scenes/Hook';
import { Problem } from './scenes/Problem';
import { Shift } from './scenes/Shift';
import { Solution } from './scenes/Solution';
import { Benefit } from './scenes/Benefit';
import { CTA } from './scenes/CTA';

export const Main: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#07070a', fontFamily: 'Inter, sans-serif' }}>
      {/* Background sempre visível em todas as cenas */}
      <Background />

      {/* Timeline de Cenas */}
      <Series>
        <Series.Sequence durationInFrames={TIMING.SCENES.HOOK}>
          <Hook />
        </Series.Sequence>

        <Series.Sequence durationInFrames={TIMING.SCENES.PROBLEM}>
          <Problem />
        </Series.Sequence>

        <Series.Sequence durationInFrames={TIMING.SCENES.SHIFT}>
          <Shift />
        </Series.Sequence>

        <Series.Sequence durationInFrames={TIMING.SCENES.SOLUTION}>
          <Solution />
        </Series.Sequence>

        <Series.Sequence durationInFrames={TIMING.SCENES.BENEFIT}>
          <Benefit />
        </Series.Sequence>

        <Series.Sequence durationInFrames={TIMING.SCENES.CTA}>
          <CTA />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
