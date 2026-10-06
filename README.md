# MAVKA EVENT — Studio Portfolio (Next.js + GSAP + Cloudflare Pages)

Recreación ultra-precisa y pixel-perfect de la agencia de eventos **MAVKA EVENT**, con tipografía cinética dividida (*sliced typography*), animaciones fluidas con **GSAP ScrollTrigger**, cursor magnético interactivo y soporte nativo para **Cloudflare Pages**.

---

## ⚡ Tecnologías

- **Framework**: [Next.js](https://nextjs.org/) (App Router, React 19)
- **Animaciones en Scroll**: [GSAP](https://gsap.com/) + [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- **Smooth Scroll**: [Lenis](https://lenis.darkroom.engineering/) para inercia de scroll sedosa
- **Estilos**: Vanilla CSS con tokens de diseño exactos del video de Dribbble
- **Despliegue**: **Cloudflare Pages** mediante Static HTML Export (`output: 'export'`)

---

## 🚀 Desarrollo Local

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm run dev

# Abrir en el navegador:
http://localhost:3000
```

Para generar la compilación estática que se subirá a Cloudflare Pages:

```bash
npm run build
# Generará la carpeta ./out lista para CDN
```

---

## ☁️ Despliegue en Cloudflare Pages a través de GitHub

Este proyecto ya está configurado con `output: 'export'` en `next.config.mjs` y `.nvmrc` para Node 20.

### Paso 1: Subir tu repositorio a GitHub

```bash
# Si aún no has vinculado tu repositorio remoto en GitHub:
git remote add origin https://github.com/TU-USUARIO/TU-REPOSITORIO.git
git branch -M main
git push -u origin main
```

### Paso 2: Conectar con Cloudflare Pages

1. Inicia sesión en tu panel de **[Cloudflare](https://dash.cloudflare.com/)**.
2. Ve a **Workers & Pages** > **Create application** > pestaña **Pages** > **Connect to Git**.
3. Selecciona tu repositorio de GitHub (`TU-REPOSITORIO`).
4. Configura los parámetros de compilación (*Build settings*):
   - **Framework preset**: `None` o `Next.js (Static HTML Export)`
   - **Build command**: `npm run build`
   - **Build output directory**: `out`
   - **Root directory**: `/` (o dejar en blanco)
5. En **Environment variables** (opcional, ya cubierto por `.nvmrc`):
   - Variable name: `NODE_VERSION`
   - Value: `20`
6. Haz clic en **Save and Deploy**.

¡Listo! Cada vez que hagas `git push` a `main`, Cloudflare Pages compilará automáticamente el proyecto y lo desplegará globalmente en milisegundos con 0 cold starts.

---

## ✨ Características y Secciones

1. **Hero**:
   - Tipografía cinética `MAVKA EVENT` dividida en 3 capas (*slices*) horizontales que se desfasan con el scroll del usuario.
   - Ilustración central de banquete festivo y canvas interactivo de destellos de celebración.
2. **Statement & Featured Work**:
   - Efecto *card stack* donde la sección blanca con esquinas redondeadas desliza sobre el hero.
   - Textos cinéticos "ORGANIZERS OF EMOTIONAL SUPER EVENTS".
   - 4 casos de estudio con parallax en sus imágenes y modal interactivo de detalles.
3. **Services**:
   - Lista interactiva con imágenes flotantes (`01/ MANAGEMENT`, `02/ CORPORATE`, `03/ CONFERENCE`, `04/ MARKETING`).
   - Resaltado sincronizado con GSAP ScrollTrigger al centro de la pantalla.
4. **Our Timeline**:
   - Track horizontal fijado (*pinned*) que avanza con el scroll vertical mostrando los hitos 2021-2024.
5. **People & Stats**:
   - Contadores numéricos dinámicos en scroll (`0 → 304` proyectos cerrados, `0.0 → 4.9★` en reseñas).
   - "CREATING MOMENTS THAT LEAVE A MARK IN MEMORY" con los retratos de las directoras incrustados en las letras.
6. **Footer**:
   - Letras gigantes de `MAVKA` reveladas con perspectiva 3D en scroll.
   - Marquee continuo que acelera con la velocidad del scroll.
   - Modal de reserva y contacto directo.
