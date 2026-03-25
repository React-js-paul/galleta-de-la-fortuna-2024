import { useState } from 'react';
import getRandomNumber from '../utils/getRandomNumber';
import quotes from '../data/phrases.json';
import photos from '../data/photos.json';

const CookieBreaker = ({
	setPhraseSelected,
	setBgSelected,
	setDecryptTrigger,
	onFirstReveal,
	cardVisible,
	onCrack,
}) => {
	const [loading, setLoading] = useState(false);

	const nextPhrase = () => {
		if (loading) return;
		setLoading(true);

		// 1. Resetear decrypt ANTES de todo para que la frase vieja no muestre el efecto
		setDecryptTrigger(false);

		// 2. Disparar animación de crack de la galleta inmediatamente
		if (onCrack) onCrack();

		// 3. Esperar 1.4s (galleta totalmente abierta) para mostrar la NUEVA frase + efecto
		setTimeout(() => {
			// Cambiar la frase
			const phraseRandom = quotes[getRandomNumber(quotes.length)];
			setPhraseSelected(phraseRandom);
			setBgSelected(photos[getRandomNumber(photos.length)]);

			// Si la tarjeta no era visible aún, revelarla AHORA (sincronizado con la frase)
			if (!cardVisible && onFirstReveal) {
				onFirstReveal();
			}

			// Breve micro-delay para que React renderice la nueva frase antes de disparar el scramble
			setTimeout(() => {
				setDecryptTrigger(true);
			}, 60);

			// Desbloquear botón cuando la galleta termina su animación completa (~1.6s más)
			setTimeout(() => {
				setLoading(false);
			}, 1600);

		}, 1400);
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
