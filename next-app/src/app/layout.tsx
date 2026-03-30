import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const zinDisplay = localFont({
  src: '../../public/assets/CarnokyType - Zin Display Condensed Demo.otf',
  variable: '--font-zin-display',
  display: 'swap',
  fallback: ['Georgia', 'serif'],
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Flent Referral Program',
  description: 'Refer friends to Flent. Earn real rewards. Share your code, friend moves in, you earn — and every milestone gets better.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${zinDisplay.variable} ${plusJakarta.variable}`}>
      <body>{children}</body>
    </html>
  );
}
