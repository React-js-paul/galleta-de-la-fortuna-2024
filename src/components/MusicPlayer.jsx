import { useState, useEffect, useRef } from 'react';

const MusicPlayer = () => {
	const audioRef = useRef(null);
	const [isPlaying, setIsPlaying] = useState(false);

	useEffect(() => {
		// Los navegadores bloquean el autoplay inmediato por defecto.
		// Este listener intenta iniciar la música en cuanto el usuario hace su primer clic en cualquier parte de la página.
		const handleFirstInteraction = () => {
			if (audioRef.current && !isPlaying) {
				audioRef.current.volume = 0.35; // Volumen suave, de ambiente
				audioRef.current.play()
					.then(() => {
						setIsPlaying(true);
						// Si tuvo éxito, quitamos el listener general
						window.removeEventListener('click', handleFirstInteraction);
					})
					.catch((err) => {
						console.log('Autoplay bloqueado o archivo no encontrado:', err);
					});
			}
		};

		window.addEventListener('click', handleFirstInteraction);
		return () => window.removeEventListener('click', handleFirstInteraction);
	}, [isPlaying]);

	const togglePlay = (e) => {
		e.stopPropagation(); // Evitar que el clic interfiera con otras cosas
		if (audioRef.current) {
			if (audioRef.current.paused) {
				audioRef.current.play();
				setIsPlaying(true);
			} else {
				audioRef.current.pause();
				setIsPlaying(false);
			}
		}
	};

	return (
		<div className="fixed top-6 right-6 z-50">
			{/* Etiqueta de audio oculta buscando el track en la carpeta public/music/ */}
			<audio ref={audioRef} src="/music/pista1.mp3" loop autoPlay />
			
			<button
				onClick={togglePlay}
				aria-label={isPlaying ? 'Pausar música zen' : 'Reproducir música zen'}
				className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
				style={{
					background: 'rgba(13, 31, 23, 0.4)',
					backdropFilter: 'blur(8px)',
					border: '1px solid rgba(251,191,36,0.2)',
					boxShadow: isPlaying ? '0 0 15px rgba(251,191,36,0.2)' : 'none'
				}}
			>
				{isPlaying ? (
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
						<rect x="6" y="4" width="4" height="16"></rect>
						<rect x="14" y="4" width="4" height="16"></rect>
					</svg>
				) : (
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform translate-x-[2px]">
						<polygon points="5 3 19 12 5 21 5 3"></polygon>
					</svg>
				)}
			</button>
		</div>
	);
};

export default MusicPlayer;
