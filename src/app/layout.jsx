import './globals.css';

export const metadata = {
  metadataBase: new URL('https://elarcadelaalianza.org'),
  title: 'Fundación Arca de la Alianza · Colombia & Estados Unidos — Dos Países, Una Misma Misión',
  description:
    'Fundación Arca de la Alianza (Colombia NIT 901.689.340-5) y Arca de la Alianza Inc. (Florida EIN 82-5293343). Iniciativa binacional sin ánimo de lucro inspirada en la fe y la solidaridad para transformar vidas y generar capacidad instalada.',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400..700;1,6..72,400..700&family=Plus+Jakarta+Sans:ital,wght@0,400..800;1,400..800&family=Montserrat:ital,wght@0,400..800;1,400..800&family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
