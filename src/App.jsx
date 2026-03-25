import { useState, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import './App.css';
import quotes from './data/phrases.json';
import getRandomNumber from './utils/getRandomNumber';
import Phrase from './components/Phrase';
import CookieBreaker from './components/CookieBreaker';
import photos from './data/photos.json';
import ClickSpark from './components/ClickSpark';
import Antigravity from './components/Antigravity';
import MusicPlayer from './components/MusicPlayer';

gsap.registerPlugin(useGSAP);

function App() {
	const indexRandom = getRandomNumber(quotes.length);

	const [phraseSelected, setPhraseSelected] = useState(quotes[indexRandom]);
	const [bgSelected, setBgSelected]         = useState(photos[getRandomNumber(photos.length)]);
	const [cookieShake, setCookieShake]       = useState(false);
	const [decryptTrigger, setDecryptTrigger] = useState(false); // false = no revelar al inicio
	const [cardVisible, setCardVisible]       = useState(false); // tarjeta oculta al inicio

	// Refs
	const cookieRef = useRef(null);
	const cardRef   = useRef(null);
	const btnRef    = useRef(null);
	const footerRef = useRef(null);
	const titleRef  = useRef(null);

	// ── Animación de ENTRADA (solo galleta, título y botón) ──
	useGSAP(() => {
		const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

		// Título entra suavemente
		tl.fromTo(titleRef.current,
			{ opacity: 0, y: -30 },
			{ opacity: 1, y: 0, duration: 0.9 }
		)
		// Galleta cae desde arriba
		.fromTo(cookieRef.current,
			{ opacity: 0, y: -80, scale: 0.7 },
			{ opacity: 1, y: 0, scale: 1, duration: 1.1 },
			'-=0.4'
		)
		// Botón aparece debajo
		.fromTo(btnRef.current,
			{ opacity: 0, y: 30 },
			{ opacity: 1, y: 0, duration: 0.7 },
			'-=0.3'
		);
	}, []);

	// ── Revelar la tarjeta con animación suave al hacer clic ──
	const handleReveal = () => {
		setCardVisible(true);
		// Pequeño delay para que React renderice la tarjeta antes de animarla
		setTimeout(() => {
			if (cardRef.current) {
				gsap.fromTo(cardRef.current,
					{ opacity: 0, scale: 0.92, y: 18 },
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

				{/* ── Fondo Antigravity ── */}
				<Antigravity count={250} />

				{/* ── Título ── */}
				<div ref={titleRef} className="relative z-10 text-center mt-4 mb-2 opacity-0">
					<h1 className="title-fortune text-3xl md:text-4xl">Conoce Tu Fortuna</h1>
					<div className="gold-divider mt-3" />
				</div>

				{/* ── Galleta ── */}
				<div
					ref={cookieRef}
					className={`relative z-10 max-w-[340px] w-full flex justify-center opacity-0 ${cookieShake ? 'cookie-shake' : 'cookie__animation'}`}
				>
					<img
						src="/fcookie.png"
						alt="Galleta de la fortuna"
						className="w-64 md:w-72 select-none pointer-events-none"
					/>
					{/* Glow ring */}
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
							boxShadow: '0 16px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.07)',
							/* Comienza invisible, GSAP la anima */
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
						setCookieShake={setCookieShake}
						setDecryptTrigger={setDecryptTrigger}
						onFirstReveal={handleReveal}
						cardVisible={cardVisible}
					/>
				</div>

				{/* ── Autor — aparece junto con la tarjeta ── */}
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
