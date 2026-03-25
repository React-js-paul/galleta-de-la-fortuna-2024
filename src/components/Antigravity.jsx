import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Vector global del mouse en coordenadas normalizadas (-1 a 1)
const mouse = new THREE.Vector2(0, 0);

const Particles = ({ count = 600 }) => {
	const mesh      = useRef();
	const { size, camera } = useThree();

	// Posiciones base y parámetros flotantes por partícula
	const particles = useMemo(() => {
		const temp = [];
		for (let i = 0; i < count; i++) {
			temp.push({
				time:  Math.random() * 100,
				speed: 0.003 + Math.random() * 0.006,
				ox:    (Math.random() - 0.5) * 14,  // origen X
				oy:    (Math.random() - 0.5) * 9,   // origen Y
				oz:    (Math.random() - 0.5) * 6,   // origen Z
			});
		}
		return temp;
	}, [count]);

	const dummy       = useMemo(() => new THREE.Object3D(), []);
	const mouseWorld  = useMemo(() => new THREE.Vector3(), []);
	const repulsion   = useMemo(() => new THREE.Vector3(), []);

	useFrame(() => {
		// Convertir mouse NDC → coordenadas mundo en el plano Z=0
		mouseWorld.set(mouse.x, mouse.y, 0.5);
		mouseWorld.unproject(camera);
		mouseWorld.sub(camera.position).normalize();
		const dist = -camera.position.z / mouseWorld.z;
		mouseWorld.multiplyScalar(dist).add(camera.position);

		particles.forEach((p, i) => {
			p.time += p.speed;
			const t = p.time;

			// Movimiento base flotante (luciérnaga suave)
			const bx = p.ox + Math.cos(t / 10) * 0.6 + Math.sin(t)       * 0.12;
			const by = p.oy + Math.sin(t / 8)  * 0.6 + Math.cos(t / 2)   * 0.12;
			const bz = p.oz + Math.sin(t / 12) * 0.35;

			// Repulsión del mouse (radio de influencia: 2 unidades)
			repulsion.set(bx - mouseWorld.x, by - mouseWorld.y, 0);
			const d = repulsion.length();
			const RADIUS = 2.2;
			if (d < RADIUS && d > 0.001) {
				const force = ((RADIUS - d) / RADIUS) * 1.4; // intensidad
				repulsion.normalize().multiplyScalar(force);
			} else {
				repulsion.set(0, 0, 0);
			}

			dummy.position.set(bx + repulsion.x, by + repulsion.y, bz);

			// Escala pulsante muy sutil
			const s = 0.4 + Math.abs(Math.sin(t * 0.4)) * 0.35;
			dummy.scale.setScalar(s);
			dummy.updateMatrix();
			mesh.current.setMatrixAt(i, dummy.matrix);
		});

		mesh.current.instanceMatrix.needsUpdate = true;
	});

	return (
		<instancedMesh ref={mesh} args={[null, null, count]}>
			{/* Más pequeñas: radio 0.012 en vez de 0.025 */}
			<dodecahedronGeometry args={[0.012, 0]} />
			<meshStandardMaterial
				color="#fbbf24"
				emissive="#f59e0b"
				emissiveIntensity={1.6}
				roughness={0.25}
				metalness={0.5}
				transparent
				opacity={0.85}
			/>
		</instancedMesh>
	);
};

const Antigravity = ({ count = 600 }) => {
	// Capturamos el mouse en el DIV padre (que SÍ recibe eventos)
	const containerRef = useRef();

	useEffect(() => {
		const handleMouseMove = (e) => {
			const rect = containerRef.current?.getBoundingClientRect();
			if (!rect) return;
			// Normalizar a rango [-1, 1]
			mouse.x =  ((e.clientX - rect.left)  / rect.width)  * 2 - 1;
			mouse.y = -((e.clientY - rect.top)    / rect.height) * 2 + 1;
		};
		window.addEventListener('mousemove', handleMouseMove);
		return () => window.removeEventListener('mousemove', handleMouseMove);
	}, []);

	return (
		<div
			ref={containerRef}
			style={{
				position: 'fixed',
				inset: 0,
				// pointer-events activo para capturar mouse, pero SIN bloquear clics en el contenido
				pointerEvents: 'none',
				zIndex: 0,
			}}
		>
			<Canvas
				camera={{ fov: 75, position: [0, 0, 6], near: 0.1, far: 100 }}
				gl={{ alpha: true, antialias: false }}
				style={{ background: 'transparent' }}
			>
				<ambientLight intensity={0.5} />
				<pointLight position={[0,  5,  5]} intensity={2.5} color="#fbbf24" />
				<pointLight position={[0, -4, -3]} intensity={1.0} color="#f97316" />
				<Particles count={count} />
			</Canvas>
		</div>
	);
};

export default Antigravity;
