# 🥠 Galleta de la Fortuna (Fortune Cookie) — Premium Edition

Una experiencia web interactiva, inmersiva y de calidad *premium* para revelar frases inspiradoras o proverbios, diseñada con micro-interacciones, efectos 3D, animaciones complejas y diseño Glassmorphism.

![Captura de la Galleta](public/fcookie.png)

## ✨ Características y Diseño (UX/UI)
- **Glassmorphism Avanzado**: Uso de `backdrop-filter` optimizado por GPU en la tarjeta de la frase para lograr un cristal de bordes asimétricos traslúcido elegante. 
- **Entorno 3D Interactivo**: Fondo inmersivo con partículas doradas que flotan dinámicamente usando **WebGL/Three.js** simulando "polvo estelar" en tiempo real.
- **Micro-interacciones Fluidas**: 
  - Clic dinámico que genera chispas (`ClickSpark`).
  - Animación cíclica de levitación y efecto *shake* físico en la galleta al romperla.
- **Animaciones Cinematográficas (GSAP)**: Secuencias orquestadas para la aparición condicional de componentes (el texto emerge recién al primer clic).
- **Decrypted Text Effect**: Efecto visual de *Scramble* personalizado cada vez que se desencripta el conocimiento de la fortuna.
- **Música Ambiental Zen**: Reproductor de código manual manejando políticas restrictivas de *autoplay* en navegadores modernos.

## 🚀 Tecnologías y Frameworks Utilizados

Este proyecto sirve de demostración del dominio de herramientas modernas de front-end enfocadas a interfaces inmersivas (creativas) y rendimientos exigentes:

* **React 18** + **Vite**: El núcleo reactivo y el compilador ultrarrápido HMR.
* **Three.js** y **@react-three/fiber**: Componente `<Antigravity />` creando un *canvas* 3D de alta performance renderizando cientos de luces e instancias sin bloquear el *Data Object Model* (DOM).
* **GSAP (GreenSock)** + `@gsap/react`: Motor de animaciones industrial de vanguardia manejando *Timelines* nativos de React.
* **Tailwind CSS 3**: Sistema CSS utility-first responsable del paletaje *Mystic Dark*, diseño de botones en gradiente y *responsive design*.
* **React Bits (UI Components)**: Adaptaciones avanzadas inspiradas en bibliotecas UI para destellos, descifrado tipográfico y *glass-surfaces*.

## 📂 Arquitectura de Componentes
* `App.jsx`: Orquestador global. Contiene el estado de la aplicación, el Canvas de fondo webGL y las políticas condicionales del DOM.
* `/components/Antigravity.jsx`: Matemática de seno/coseno aplicada a mallas Dodecaédricas (`instancedMesh`) en 3D bajo luces ambientales y direccionales naranjas.
* `/components/GlassSurface.jsx`: Patrón de diseño UI implementando un súper hack de aceleración hardware (`transform: translate3d`, `isolation: isolate`) para el correcto funcionamiento de los desenfoques sobre Canvas.
* `/components/CookieBreaker.jsx`: Separación de lógica de disparo (Triggers) garantizando esperas controladas de UX (delays de 300ms, limpiezas de estado).
* `/components/Phrase.jsx`: Animación tipográfica y lógica del Scramble effect (React Bits implementado manual).

## 🛠️ Instalación Local

1. Clona el repositorio localmente.
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

> **💡 Nota Técnica de Diseño:** La interacción entre Canvas y HTML puro (z-indexes, opacidades del 4% hasta el 40%, bordes de sub-píxeles, texturas con gradientes cruzados) ha sido escrita a mano para garantizar compatibilidad multi-navegador sin colapsos de GPU.
