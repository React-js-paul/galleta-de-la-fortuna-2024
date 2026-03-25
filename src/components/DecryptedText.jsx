import { useEffect, useRef, useState } from 'react';

/**
 * DecryptedText — react-bits inspired
 * Scrambles characters and reveals them one by one over `duration` ms.
 *
 * Props:
 *  text        — the final string to reveal
 *  speed       — ms between each "tick" of scramble (default 40)
 *  maxIterations — how many scramble cycles before a char locks in (default 8)
 *  characters  — pool of scramble characters (default alphanumeric + symbols)
 *  className   — wrapper class
 *  encryptedClassName — class for the scrambled (not yet revealed) chars
 *  revealDirection — 'start' | 'end' | 'center' | 'random' (default 'start')
 *  animateOn   — 'hover' | 'view' | 'trigger' (default 'trigger')
 *  trigger     — boolean; when it flips to true the animation plays (used for 'trigger' mode)
 */
const DecryptedText = ({
	text = '',
	speed = 40,
	maxIterations = 10,
	characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*!?',
	className = '',
	encryptedClassName = '',
	revealDirection = 'start',
	animateOn = 'trigger',
	trigger = false,
	onAnimationComplete,
}) => {
	const [displayText, setDisplayText] = useState(text);
	const [isAnimating, setIsAnimating] = useState(false);
	const [isRevealed, setIsRevealed] = useState(false);
	const intervalRef = useRef(null);
	const iterationsRef = useRef(0);

	const getRevealIndex = (length, progress) => {
		if (revealDirection === 'start') return Math.floor(progress * length);
		if (revealDirection === 'end') return length - Math.floor(progress * length);
		if (revealDirection === 'center') {
			const mid = Math.floor(length / 2);
			const offset = Math.floor(progress * mid);
			return offset; // simplified
		}
		return Math.floor(progress * length); // random fallback
	};

	const startAnimation = () => {
		if (isAnimating) return;
		clearInterval(intervalRef.current);
		iterationsRef.current = 0;
		setIsAnimating(true);
		setIsRevealed(false);

		const totalSteps = text.length * maxIterations;

		intervalRef.current = setInterval(() => {
			iterationsRef.current += 1;
			const progress = iterationsRef.current / totalSteps;
			const revealedCount = Math.floor(progress * text.length);

			setDisplayText(
				text
					.split('')
					.map((char, i) => {
						if (char === ' ') return ' ';
						// Determine if this char index is already locked
						let locked = false;
						if (revealDirection === 'start') locked = i < revealedCount;
						else if (revealDirection === 'end') locked = i >= text.length - revealedCount;
						else locked = i < revealedCount;

						if (locked) return char;
						return characters[Math.floor(Math.random() * characters.length)];
					})
					.join('')
			);

			if (iterationsRef.current >= totalSteps) {
				clearInterval(intervalRef.current);
				setDisplayText(text);
				setIsAnimating(false);
				setIsRevealed(true);
				onAnimationComplete?.();
			}
		}, speed);
	};

	// React to `trigger` changes (animateOn === 'trigger')
	useEffect(() => {
		if (animateOn !== 'trigger') return;
		if (trigger) {
			startAnimation();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [trigger, text]);

	// When text changes externally, reset display immediately then re-animate
	useEffect(() => {
		setDisplayText(text);
		setIsRevealed(false);
	}, [text]);

	// Hover mode
	const handleMouseEnter = () => {
		if (animateOn === 'hover') startAnimation();
	};

	// Cleanup on unmount
	useEffect(() => {
		return () => clearInterval(intervalRef.current);
	}, []);

	return (
		<span
			className={className}
			onMouseEnter={handleMouseEnter}
			aria-label={text}
		>
			{displayText.split('').map((char, i) => {
				const isLocked = char === text[i] || char === ' ';
				return (
					<span
						key={i}
						className={isLocked || isRevealed ? className : encryptedClassName}
					>
						{char}
					</span>
				);
			})}
		</span>
	);
};

export default DecryptedText;
