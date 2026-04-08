import { Composition } from 'remotion';
import { Main } from './Main';
import { TIMING, TOTAL_DURATION } from './constants/timing';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ApexCore_Promo"
        component={Main}
        durationInFrames={TOTAL_DURATION}
        fps={TIMING.FPS}
        width={1080}
        height={1920}
        defaultProps={{}}
      />
    </>
  );
};
