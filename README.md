# Fundación Arca de la Alianza — Plataforma Institucional Binacional

Sitio web oficial de la **Fundación Arca de la Alianza** (Colombia: NIT 901.689.340-5) y **Arca de la Alianza Inc.** (Florida, EE.UU.: EIN 82-5293343). Plataforma binacional sin ánimo de lucro construida en **Next.js 16 (App Router)** con animaciones fluidas mediante **GSAP + ScrollTrigger**, scroll inercial suave con **Lenis** y exportación estática optimizada para **Cloudflare Pages**.

---

## ⚡ Tecnologías

- **Framework**: [Next.js](https://nextjs.org/) 16 (App Router, React 19)
- **Animaciones en Scroll**: [GSAP](https://gsap.com/) + [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- **Smooth Scroll**: [Lenis](https://lenis.darkroom.engineering/) para inercia de navegación
- **Estilos**: CSS nativo y responsivo con tokens de identidad institucional
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

Para generar la compilación estática lista para producción:

```bash
npm run build
# Genera el directorio ./out listo para CDN / Cloudflare Pages
```

---

## ☁️ Estructura del Proyecto

```
arcadelaalianza.org/
├── public/                 # Recursos multimedia oficiales (imágenes, logos, video)
│   └── assets/
├── src/
│   └── app/
│       ├── layout.jsx      # Root Layout, tipografías y metadatos SEO
│       ├── page.jsx        # Página principal interactiva con módulos institucionales
│       ├── globals.css     # Sistema de diseño, tokens y adaptabilidad responsive
│       └── foundationData.js # Contenido institucional oficial, programas y políticas legales
├── next.config.mjs         # Configuración estática (output: 'export', trailingSlash)
└── package.json
```

---

## 🏛️ Identidad Institucional

- **Colombia**: Fundación Arca de la Alianza · NIT 901.689.340-5 · Régimen Tributario Especial (RTE - DIAN).
- **Estados Unidos**: Arca de la Alianza Inc. · Florida Document N17000109968 · EIN 82-5293343 · Cuenta Oficial en Regions Bank.
