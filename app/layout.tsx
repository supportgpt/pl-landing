import type { Metadata } from "next";
import { Lexend_Deca } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const lexendDeca = Lexend_Deca({ 
  subsets: ['latin'],
  variable: '--font-lexend-deca',
});

export const metadata: Metadata = {
  title: 'Expert Shopify Development Agency',
  description: 'Transform your e-commerce vision into reality with our expert Shopify development services. We build high-performing, custom Shopify stores that drive sales.',
  keywords: 'Shopify development, Shopify Plus, e-commerce, custom Shopify themes, Shopify apps, Shopify store development',
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
