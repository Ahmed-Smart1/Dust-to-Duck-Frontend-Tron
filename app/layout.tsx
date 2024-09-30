import type { Metadata } from 'next';
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
  title: 'Tbull Converter',
  description: 'Convert unwanted assets into $Tbull'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Macondo&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Margarine&display=swap"
          rel="stylesheet"
        ></link>
        <title>Tbull Converter</title>
        <link rel="shortcut icon" href="icon.png" type="image/x-icon" />
      </head>
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
