import type { Metadata } from "next";
import { Lexend_Deca } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const lexendDeca = Lexend_Deca({ 
  subsets: ['latin'],
  variable: '--font-lexend-deca',
});

export const metadata: Metadata = {
  title: 'Web Development for Local Businesses & SaaS Products',
  description: 'We create effective web solutions for businesses of all sizes, from local businesses seeking more customers to SaaS founders building the next big thing.',
  keywords: 'local business websites, SaaS development, Shopify apps, custom web applications, UI/UX design, web development agency',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lexendDeca.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
