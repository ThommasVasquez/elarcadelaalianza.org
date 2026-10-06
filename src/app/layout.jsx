import './globals.css';

export const metadata = {
  title: 'Fundación El Arca de la Alianza — Construyendo Esperanza',
  description: 'Organización dedicada a la transformación social, nutrición, desarrollo infantil y alianzas solidarias para comunidades vulnerables.',
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
