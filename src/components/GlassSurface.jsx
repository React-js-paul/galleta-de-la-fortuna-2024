import React from 'react';

const GlassSurface = ({ children, className = '' }) => {
	return (
		<div
			className={`relative rounded-2xl ${className}`}
			style={{
				/* El cristal en sí: muy poco fondo + blur fuerte */
				background: 'rgba(255, 255, 255, 0.04)',
				backdropFilter: 'blur(12px)',
				WebkitBackdropFilter: 'blur(12px)',
				/* Borde fino: arista superior brillante, base más oscura */
				border: '1px solid rgba(255, 255, 255, 0.1)',
				borderTop:    '1px solid rgba(251, 191, 36, 0.4)',
				borderLeft:   '1px solid rgba(251, 191, 36, 0.2)',
				borderBottom: '1px solid rgba(0, 0, 0, 0.4)',
				borderRight:  '1px solid rgba(0, 0, 0, 0.2)',
				/* Sombra para darle flotación */
				boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
				/* Forzar GPU para que el blur no colapse */
				transform: 'translate3d(0, 0, 0)',
				isolation: 'isolate',
			}}
		>
			{children}
		</div>
	);
};

export default GlassSurface;
