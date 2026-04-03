import {
	AbsoluteFill,
	Sequence,
	interpolate,
	useCurrentFrame,
	Img,
	staticFile,
} from 'remotion';

export const PromoComposition: React.FC = () => {
	const colors = {
		bg: '#07070a',
		accent: '#4ade80',  // Bio-hacking Green
		gold: '#d4a04a',   // Status Gold
		crimson: '#ff4b4b', // Alert Red
		text: '#ffffff',
	};

	return (
		<AbsoluteFill style={{ backgroundColor: colors.bg, color: colors.text, fontFamily: 'Inter, sans-serif' }}>
			{/* Segment 1: Crise (Ira/Frustração) */}
			<Sequence from={0} durationInFrames={5 * 30}>
				<PhaseSegment 
					image="v2_crise.png" 
					text="O MUNDO ESTÁ TE ENFRAQUECENDO." 
					color={colors.crimson} 
					zoom={1.2}
				/>
			</Sequence>

			{/* Segment 2: Alerta (Inveja/Realidade) */}
			<Sequence from={5 * 30} durationInFrames={5 * 30}>
				<PhaseSegment 
					image="v2_alerta.png" 
					text="VOCÊ SENTE O DECLÍNIO TODOS OS DIAS." 
					color={colors.crimson} 
					zoom={1.1}
				/>
			</Sequence>

			{/* Segment 3: Descoberta (Autoridade) */}
			<Sequence from={10 * 30} durationInFrames={5 * 30}>
				<PhaseSegment 
					image="v2_descoberta.png" 
					text="MAS O CÓDIGO PODE SER QUEBRADO." 
					color={colors.accent} 
					zoom={1.3}
				/>
			</Sequence>

			{/* Segment 4: Transformação (Ação) */}
			<Sequence from={15 * 30} durationInFrames={5 * 30}>
				<PhaseSegment 
					image="v2_transformacao.png" 
					text="CIÊNCIA DE ELITE PARA RESULTADOS BRUTAIS." 
					color={colors.accent} 
					zoom={1.15}
				/>
			</Sequence>

			{/* Segment 5: Maestria (Status/Poder) */}
			<Sequence from={20 * 30} durationInFrames={5 * 30}>
				<PhaseSegment 
					image="v2_maestria.png" 
					text="RETOME O TOPO DA CADEIA ALIMENTAR." 
					color={colors.gold} 
					zoom={1.1}
				/>
			</Sequence>

			{/* Segment 6: Recompensa + CTA (Luxúria/Vitória) */}
			<Sequence from={25 * 30} durationInFrames={5 * 30}>
				<PhaseSegment 
					image="v2_recompensa.png" 
					text="EU TENHO A SOLUÇÃO PARA VOCÊ." 
					subtext="Faça o nosso quiz e encontre seu plano personalizado."
					color={colors.accent} 
					cta="FAZER QUIZ AGORA ➔"
					zoom={1.2}
				/>
			</Sequence>
		</AbsoluteFill>
	);
};

const PhaseSegment: React.FC<{ 
	image: string, 
	text: string, 
	subtext?: string,
	color: string, 
	zoom: number,
	cta?: string
}> = ({ image, text, subtext, color, zoom, cta }) => {
	const frame = useCurrentFrame();
	const opacity = interpolate(frame, [0, 5, 145, 150], [0, 1, 1, 0]);
	const scale = interpolate(frame, [0, 150], [1, zoom]);
	
	const textOpacity = interpolate(frame, [10, 20], [0, 1]);
	const textY = interpolate(frame, [10, 20], [50, 0]);

	return (
		<AbsoluteFill style={{ opacity }}>
			<Img 
				src={staticFile(image)} 
				style={{ 
					width: '100%', 
					height: '100%', 
					objectFit: 'cover',
					transform: `scale(${scale})`,
				}} 
			/>
			<AbsoluteFill style={{ 
				background: 'linear-gradient(180deg, transparent 50%, rgba(7,7,10,0.9) 100%)',
				justifyContent: 'flex-end',
				padding: 60,
				paddingBottom: cta ? 120 : 180
			}}>
				<div style={{ 
					opacity: textOpacity, 
					transform: `translateY(${textY}px)`,
				}}>
					<h1 style={{ 
						fontSize: 85, 
						fontWeight: 900, 
						lineHeight: 1,
						color: '#fff',
						textShadow: `0 0 30px ${color}88, 0 5px 10px rgba(0,0,0,0.8)`,
						letterSpacing: -2,
						marginBottom: 20
					}}>
						{text}
					</h1>
					{subtext && (
						<p style={{ 
							fontSize: 45, 
							fontWeight: 500, 
							color: '#fff', 
							opacity: 0.9,
							lineHeight: 1.3,
							textShadow: '0 2px 10px rgba(0,0,0,0.5)',
							marginBottom: 40
						}}>
							{subtext}
						</p>
					)}
					{cta && (
						<div style={{ 
							background: color,
							color: '#07070a',
							padding: '30px 60px',
							borderRadius: 50,
							fontSize: 45,
							fontWeight: 900,
							display: 'inline-block',
							boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
							marginTop: 20,
							textAlign: 'center'
						}}>
							{cta}
						</div>
					)}
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
