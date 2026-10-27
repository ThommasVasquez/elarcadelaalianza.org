import './globals.css';

export const metadata = {
  title: 'Fundación Arca de la Alianza · Colombia & Estados Unidos — Dos Países, Una Misma Misión',
  description:
    'Fundación Arca de la Alianza (Colombia NIT 901.689.340-5) y Arca de la Alianza Inc. (Florida EIN 82-5293343). Iniciativa binacional sin ánimo de lucro inspirada en la fe y la solidaridad para transformar vidas y generar capacidad instalada.',
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
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Montserrat:ital,wght@0,300..900;1,300..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/assets/logo_arca.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
