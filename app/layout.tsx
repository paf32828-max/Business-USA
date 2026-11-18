import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Manrope, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { DEFAULT_BUSINESS_CONFIG } from '@/lib/business-config';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

function getMetadataBase(): URL {
  const raw = process.env.APP_URL;
  if (raw && raw.startsWith('http')) {
    try {
      return new URL(raw);
    } catch {
      // Fallback below
    }
  }
  return new URL('https://businessusa.example.com');
}

export const metadata: Metadata = {
  title: 'Business USA | Professional Marketing Consultancy',
  description:
    'Explore Business USA for marketing consultancy and business growth strategies. Contact our team to discuss your marketing goals.',
  metadataBase: getMetadataBase(),
  openGraph: {
    title: 'Business USA | Professional Marketing Consultancy',
    description:
      'Explore Business USA for marketing consultancy and business growth strategies. Contact our team to discuss your marketing goals.',
    siteName: 'Business USA',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Business USA | Professional Marketing Consultancy',
    description:
      'Explore Business USA for marketing consultancy and business growth strategies. Contact our team to discuss your marketing goals.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: DEFAULT_BUSINESS_CONFIG.businessName,
    description:
      'Business USA is a marketing consultancy focused on helping businesses explore smarter marketing strategies and opportunities for growth.',
    telephone: DEFAULT_BUSINESS_CONFIG.phoneHref,
    areaServed: {
      '@type': 'Country',
      name: DEFAULT_BUSINESS_CONFIG.country,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '00:00',
        closes: '23:59',
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${manrope.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-[#080D16] text-white antialiased selection:bg-[#2563EB] selection:text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  );
}
