# 🥠 Galleta de la Fortuna — Premium Edition

Una experiencia web **interactiva, inmersiva y de calidad premium** para revelar frases inspiradoras con animaciones físicas, efectos 3D y diseño de interfaz de nivel profesional.

![Galleta de la Fortuna](public/fcookie.png)

---

## ✨ Experiencia de Usuario (UX)

El punto diferenciador de este proyecto es su **flujo de interacción cinematográfico**:

1. Al entrar, solo se ve la galleta flotando y el botón "Descubrir"
2. Al hacer clic, la galleta se **parte verticalmente** (izquierda y derecha) con un destello dorado
3. Mientras la galleta está abierta, la tarjeta de cristal emerge con la nueva frase y el efecto scramble
4. La galleta vuelve a unirse con un rebote elástico
5. Todo el proceso dura exactamente **3 segundos**, perfectamente coreografiado

---

## 🚀 Stack Tecnológico

| Tecnología | Versión | Uso |
|---|---|---|
| **React** | 18.3 | Framework reactivo + gestión de estado y ciclo de vida |
| **Vite** | 5.3 | Bundler ultrarrápido con HMR (Hot Module Replacement) |
| **Three.js** | 0.167 | Motor 3D WebGL para el campo de partículas de fondo |
| **@react-three/fiber** | 8.16 | Renderizador React para Three.js (Canvas 3D declarativo) |
| **GSAP** | 3.14 | Motor de animaciones de nivel industrial para las coreografías UI |
| **@gsap/react** | 2.1 | Hook `useGSAP` para integración limpia con el ciclo de vida de React |
| **Tailwind CSS** | 3.4 | Sistema de estilos utility-first para el design system completo |

---

## 🧩 Arquitectura de Componentes

```
src/
├── App.jsx                  # Orquestador: estado, animaciones GSAP, layout
├── components/
│   ├── Antigravity.jsx      # 600 partículas 3D con física de repulsión al mouse
│   ├── CookieBreaker.jsx    # Controlador de timing y eventos de interacción
│   ├── DecryptedText.jsx    # Efecto de texto scramble (inspirado en React Bits)
│   ├── Phrase.jsx           # Renderizador de la frase con DecryptedText
│   ├── ClickSpark.jsx       # Chispas doradas en cada clic
│   ├── GlassSurface.jsx     # Tarjeta de cristal con Glassmorphism
│   └── MusicPlayer.jsx      # Reproductor de música con política de autoplay
├── data/
│   └── phrases.json         # Base de datos de frases y proverbios
└── utils/
    └── getRandomNumber.js   # Utilitario para selección aleatoria
```

---

## 🎨 Decisiones Técnicas Destacadas

### 1. Partículas 3D Reactivas al Mouse (`Antigravity.jsx`)
- Usa `instancedMesh` de Three.js para renderizar **600 partículas** en un solo draw call
- Cada partícula tiene su propia función de movimiento senoidal (tiempo + factor único)
- Las partículas **huyen del cursor** usando conversión de coordenadas NDC → mundo 3D con `unproject(camera)`

### 2. Animación de "Apertura" de la Galleta
- La imagen PNG se divide en **dos mitades virtuales** con `clip-path: inset(0 50% 0 0)` y `clip-path: inset(0 0 0 50%)`
- GSAP anima cada mitad de forma independiente (traslación X + rotación)
- Un `radial-gradient` vertical simula el destello de luz interna al abrirse

### 3. Glassmorphism sobre Canvas 3D
- `backdrop-filter` no puede difuminar un Canvas WebGL (limitación de Chrome)
- Solución: usar `background: rgba(255,255,255, 0.05)` + `isolation: isolate` + bordes asimétricos biselados (dorado arriba/oscuro abajo) que simulan el efecto de cristal sin depender de blur

### 4. Timing Coreografiado del Scramble
- `setDecryptTrigger(false)` → reset inmediato
- `setTimeout(() => ..., 1400)` → justo cuando la galleta está en su máxima apertura
- `setTimeout(() => setDecryptTrigger(true), 60)` → micro-delay para que React renderice la nueva frase antes de iniciar el scramble

### 5. Música Ambiental y Política de Autoplay
- Los navegadores modernos bloquean el audio sin interacción previa del usuario
- Solución: listener en `window` que detecta el primer evento de clic y dispara `audio.play()` en ese momento

---

## 🛠️ Instalación

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo con HMR
npm run dev

# Build de producción
npm run build
```

> **Nota:** Para la música ambiental, agrega archivos `.mp3` en `public/music/` con el nombre `pista1.mp3`.
