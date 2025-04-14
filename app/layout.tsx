import type { Metadata } from "next";
import { Lexend_Deca } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const lexendDeca = Lexend_Deca({ 
  subsets: ['latin'],
  variable: '--font-lexend-deca',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://protolaunch.io'),
  title: {
    default: 'Web Development Agency for Businesses of All Sizes',
    template: '%s | ProtoLaunch',
  },
  description: 'We create effective web solutions for businesses of all sizes, from local businesses seeking more customers to SaaS founders building the next big thing.',
  keywords: 'local business websites, SaaS development, Shopify apps, custom web applications, UI/UX design, web development agency',
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://protolaunch.io',
    title: 'Web Development Agency for Businesses of All Sizes',
    description: 'We create effective web solutions for businesses of all sizes, from local businesses seeking more customers to SaaS founders building the next big thing.',
    siteName: 'ProtoLaunch',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web Development Agency for Businesses of All Sizes',
    description: 'We create effective web solutions for businesses of all sizes, from local businesses seeking more customers to SaaS founders building the next big thing.',
    creator: '@protolaunch',
  },
  alternates: {
    canonical: 'https://protolaunch.io',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Force override for cached meta tags */}
        <title>Web Development Agency for Businesses of All Sizes</title>
        <meta name="description" content="We create effective web solutions for businesses of all sizes, from local businesses seeking more customers to SaaS founders building the next big thing." />
        <meta property="og:title" content="Web Development Agency for Businesses of All Sizes" />
        <meta property="og:description" content="We create effective web solutions for businesses of all sizes, from local businesses seeking more customers to SaaS founders building the next big thing." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://protolaunch.io" />
        <meta property="og:site_name" content="ProtoLaunch" />
        <meta name="twitter:title" content="Web Development Agency for Businesses of All Sizes" />
        <meta name="twitter:description" content="We create effective web solutions for businesses of all sizes, from local businesses seeking more customers to SaaS founders building the next big thing." />
        <meta name="twitter:card" content="summary_large_image" />
        <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta http-equiv="Pragma" content="no-cache" />
        <meta http-equiv="Expires" content="0" />
        {/* Add version query parameter to break cache */}
        <script dangerouslySetInnerHTML={{ __html: `
          // Add version timestamp to force fresh meta tags
          document.querySelector('meta[property="og:url"]').content += '?v=${Date.now()}';
        `}} />
      </head>
      <body className={`${lexendDeca.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
