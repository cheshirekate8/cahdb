import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Deck Builder | Create & Share Custom Decks',
    template: '%s | Deck Builder',
  },
  description:
    'Build, save, and share custom card decks with our intuitive deck builder. Create unlimited decks with drag-and-drop functionality.',
  keywords: ['deck builder', 'card game', 'custom decks', 'card collection'],
  authors: [{ name: 'Your Name' }],
  creator: 'Your Name',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://your-site.com',
    siteName: 'Deck Builder',
    title: 'Deck Builder | Create & Share Custom Decks',
    description:
      'Build, save, and share custom card decks with our intuitive deck builder.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Deck Builder',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Deck Builder | Create & Share Custom Decks',
    description:
      'Build, save, and share custom card decks with our intuitive deck builder.',
    images: ['/og-image.jpg'],
    creator: '@yourusername',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* providers here */}
        <div className="min-h-screen bg-background">{children}</div>
      </body>
    </html>
  );
}
