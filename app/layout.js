import './globals.css';

export const metadata = {
  title: 'IT Support Adventure',
  description: 'Learn IT Support through a cozy, addictive 2D educational adventure game.',
  keywords: 'IT support, learning, game, networking, hardware, troubleshooting',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased scanlines">
        {children}
      </body>
    </html>
  );
}
