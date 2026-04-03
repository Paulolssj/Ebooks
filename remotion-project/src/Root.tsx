import React from 'react';
import { Composition } from 'remotion';
import { PromoComposition } from './PromoComposition';

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Composition
				id="PromoVideo"
				component={PromoComposition}
				durationInFrames={30 * 30}
				fps={30}
				width={1080}
				height={1920}
			/>
		</>
	);
};
