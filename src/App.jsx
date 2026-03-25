import { useState, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import './App.css';
import quotes from './data/phrases.json';
import getRandomNumber from './utils/getRandomNumber';
import Phrase from './components/Phrase';
import CookieBreaker from './components/CookieBreaker';
import ClickSpark from './components/ClickSpark';
import Antigravity from './components/Antigravity';
import MusicPlayer from './components/MusicPlayer';

gsap.registerPlugin(useGSAP);

function App() {
	const indexRandom = getRandomNumber(quotes.length);

	const [phraseSelected, setPhraseSelected] = useState(quotes[indexRandom]);
	const [decryptTrigger, setDecryptTrigger] = useState(false);
	const [cardVisible, setCardVisible]       = useState(false);

	// Refs para la galleta entera, las mitades y el glow interno
	const cookieRef     = useRef(null);
	const cookieTopRef  = useRef(null);
	const cookieBotRef  = useRef(null);
	const glowBurstRef  = useRef(null);
	const cardRef       = useRef(null);
	const btnRef        = useRef(null);
	const footerRef     = useRef(null);
	const titleRef      = useRef(null);

	// ── Animación de ENTRADA inicial ──
	useGSAP(() => {
		const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
		tl.fromTo(titleRef.current,
			{ opacity: 0, y: -30 },
			{ opacity: 1, y: 0, duration: 0.9 }
		)
		.fromTo(cookieRef.current,
			{ opacity: 0, y: -80, scale: 0.7 },
			{ opacity: 1, y: 0, scale: 1, duration: 1.1 },
			'-=0.4'
		)
		.fromTo(btnRef.current,
			{ opacity: 0, y: 30 },
			{ opacity: 1, y: 0, duration: 0.7 },
			'-=0.3'
		);
	}, []);

	// ── Función de crack: la galleta se abre y se cierra en 3s ──
	const playCrackAnimation = () => {
		const tl = gsap.timeline();

		// Detener la levitación durante la animación (pausa) usando un override rápido
		tl
			// 0s–0.5s: Las dos mitades se separan con rebote
			.to(cookieTopRef.current, {
				x: -60, rotation: -5, duration: 0.5, ease: 'power2.out'
			})
			.to(cookieBotRef.current, {
				x:  60, rotation:  5, duration: 0.5, ease: 'power2.out'
			}, '<')

			// 0.4s: Aparece el destello dorado en el centro
			.fromTo(glowBurstRef.current,
				{ opacity: 0, scaleX: 0.4, scaleY: 0.4 },
				{ opacity: 1, scaleX: 1.6, scaleY: 1, duration: 0.35, ease: 'power2.out' },
				'-=0.15'
			)

			// Hold abierto (1 segundo de pausa para dramatismo)
			.to({}, { duration: 1 })

			// 1.5s: El glow se desvanece
			.to(glowBurstRef.current, { opacity: 0, scaleX: 0.4, duration: 0.3, ease: 'power2.in' })

			// 1.8s–2.3s: Las mitades vuelven a unirse con un pequeño squish
			.to(cookieTopRef.current, {
				x: 0, rotation: 0, duration: 0.5, ease: 'back.out(1.5)'
			}, '-=0.1')
			.to(cookieBotRef.current, {
				x: 0, rotation: 0, duration: 0.5, ease: 'back.out(1.5)'
			}, '<')

			// 2.5s–3s: Pequeño rebote de asentamiento en la galleta entera
			.to(cookieRef.current, {
				scaleY: 0.88, duration: 0.12, ease: 'power2.in'
			})
			.to(cookieRef.current, {
				scaleY: 1, duration: 0.35, ease: 'elastic.out(1, 0.4)'
			});

		return tl;
	};

	// ── Revelar la tarjeta al primer clic ──
	const handleReveal = () => {
		setCardVisible(true);
		setTimeout(() => {
			if (cardRef.current) {
				gsap.fromTo(cardRef.current,
					{ opacity: 0, scale: 0.92, y: 20 },
					{ opacity: 1, scale: 1, y: 0, duration: 0.65, ease: 'power3.out' }
				);
			}
			if (footerRef.current) {
				gsap.fromTo(footerRef.current,
					{ opacity: 0, y: 10 },
					{ opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', delay: 0.3 }
				);
			}
		}, 30);
	};

	return (
		<ClickSpark sparkColor="#fbbf24" sparkSize={8} sparkRadius={22} sparkCount={12} duration={500}>
			<MusicPlayer />

			<div className="bg-mystic flex flex-col justify-center items-center px-4 py-8 gap-y-6 relative z-10 min-h-[100dvh]">

				<Antigravity count={250} />

				{/* ── Título ── */}
				<div ref={titleRef} className="relative z-10 text-center mt-4 mb-2 opacity-0">
					<h1 className="title-fortune text-3xl md:text-4xl">Conoce Tu Fortuna</h1>
					<div className="gold-divider mt-3" />
				</div>

				{/* ── Galleta con mitades animables ── */}
				<div
					ref={cookieRef}
					className="relative z-10 max-w-[340px] w-full flex justify-center items-center opacity-0 cookie__animation"
					style={{ height: '288px' }} /* w-72 = 288px */
				>
					{/* Mitad Izquierda */}
					<div
						ref={cookieTopRef}
						className="absolute inset-0 flex justify-center items-center"
						style={{
							clipPath: 'inset(0 50% 0 0)', // mitad izquierda
							transformOrigin: 'right center',
						}}
					>
						<img
							src="/fcookie.png"
							alt=""
							className="w-64 md:w-72 select-none pointer-events-none"
						/>
					</div>

					{/* Mitad Derecha */}
					<div
						ref={cookieBotRef}
						className="absolute inset-0 flex justify-center items-center"
						style={{
							clipPath: 'inset(0 0 0 50%)', // mitad derecha
							transformOrigin: 'left center',
						}}
					>
						<img
							src="/fcookie.png"
							alt=""
							className="w-64 md:w-72 select-none pointer-events-none"
						/>
					</div>

					{/* Destello dorado vertical entre las dos mitades */}
					<div
						ref={glowBurstRef}
						className="absolute pointer-events-none"
						style={{
							top: '50%',
							left: '50%',
							transform: 'translate(-50%, -50%)',
							width: '28px',
							height: '260px',
							opacity: 0,
							background: 'radial-gradient(ellipse at center, rgba(251,191,36,0.95) 0%, rgba(255,220,100,0.7) 35%, transparent 75%)',
							filter: 'blur(6px)',
							borderRadius: '50%',
						}}
					/>

					{/* Glow ring de fondo de la galleta */}
					<div
						className="absolute inset-0 rounded-full pointer-events-none"
						style={{ background: 'radial-gradient(circle, rgba(251,191,36,0.18) 0%, transparent 65%)', zIndex: -1 }}
					/>
				</div>

				{/* ── Tarjeta — solo visible tras el primer descubrir ── */}
				{cardVisible && (
					<article
						ref={cardRef}
						className="relative z-10 w-full max-w-md px-6 py-8"
						style={{
							borderRadius: '1.5rem',
							background:   'rgba(255, 255, 255, 0.05)',
							borderTop:    '1px solid rgba(251, 191, 36, 0.45)',
							borderLeft:   '1px solid rgba(251, 191, 36, 0.2)',
							borderBottom: '1px solid rgba(0, 0, 0, 0.35)',
							borderRight:  '1px solid rgba(0, 0, 0, 0.2)',
							boxShadow:    '0 16px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.07)',
							opacity: 0,
						}}
					>
						<div className="quote-mark-bg absolute top-2 left-5 pointer-events-none select-none opacity-30">❝</div>
						<div className="relative z-10 w-full flex flex-col items-center justify-center">
							<Phrase phraseSelected={phraseSelected} decryptTrigger={decryptTrigger} />
							<div className="gold-divider mt-6" />
						</div>
					</article>
				)}

				{/* ── Botón Descubrir ── */}
				<div ref={btnRef} className="relative z-10 opacity-0">
					<CookieBreaker
						setPhraseSelected={setPhraseSelected}
						setBgSelected={setBgSelected}
						setDecryptTrigger={setDecryptTrigger}
						onFirstReveal={handleReveal}
						cardVisible={cardVisible}
						onCrack={playCrackAnimation}
					/>
				</div>

				{/* ── Autor ── */}
				{cardVisible && (
					<footer ref={footerRef} className="footer-author relative z-10" style={{ opacity: 0 }}>
						✦ {phraseSelected.author} ✦
					</footer>
				)}
			</div>
		</ClickSpark>
	);
}

export default App;
