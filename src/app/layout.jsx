import './globals.css';

export const metadata = {
  title: 'Fundación Arca de la Alianza — Capacidad Instalada & Transformación Social',
  description: 'Fundación Arca de la Alianza (NIT 901.689.340-5). Entidad sin ánimo de lucro (ESAL) orientada a mejorar la calidad de vida de mujeres, niños y poblaciones indígenas, generando capacidad instalada y proyectos de vida sostenibles en Colombia.',
  icons: {
    icon: '/assets/logo_arca.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&family=Syne:wght@700;800&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/assets/logo_arca.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
