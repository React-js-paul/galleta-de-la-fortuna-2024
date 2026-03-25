import { useState } from 'react';
import getRandomNumber from '../utils/getRandomNumber';
import quotes from '../data/phrases.json';
import photos from '../data/photos.json';

const CookieBreaker = ({
	setPhraseSelected,
	setBgSelected,
	setCookieShake,
	setDecryptTrigger,
	onFirstReveal,   // Callback para mostrar la tarjeta la primera vez
	cardVisible,     // Si ya está visible, no volvemos a llamar onFirstReveal
}) => {
	const [loading, setLoading] = useState(false);

	const nextPhrase = () => {
		if (loading) return;

		// 1. Si la tarjeta no está visible aún, la revelamos (primera vez)
		if (!cardVisible && onFirstReveal) {
			onFirstReveal();
		}

		// 2. Shake cookie
		setCookieShake(true);
		setLoading(true);
		setDecryptTrigger(false);

		setTimeout(() => {
			const indexRandom  = getRandomNumber(quotes.length);
			const phraseRandom = quotes[indexRandom];
			setPhraseSelected(phraseRandom);
			setBgSelected(photos[getRandomNumber(photos.length)]);
			setCookieShake(false);
			setLoading(false);
			// 3. Dispara el efecto de descifrado
			setDecryptTrigger(true);
		}, 300);
	};

	return (
		<button
			className="btn-discover"
			onClick={nextPhrase}
			id="btn-descubrir"
			disabled={loading}
		>
			✨ Descubrir
		</button>
	);
};

export default CookieBreaker;
