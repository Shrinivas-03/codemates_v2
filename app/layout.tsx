import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GlobalSubconsciousSynth from "@/components/GlobalSubconsciousSynth";

import SchemaMarkup from "@/components/SchemaMarkup";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://codemates.in"),
  title: {
    default: "Codemates India | Premium Software & Web Development Company",
    template: "%s | Codemates",
  },
  description:
    "Top-tier software development company and AI automation agency based in India. We specialize in custom software, CRM development, web design, and digital transformation.",
  openGraph: {
    title: "Codemates India | Premium Software & Web Development Company",
    description: "Top-tier software development company and AI automation agency based in India.",
    url: "https://codemates.in",
    siteName: "Codemates",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Codemates India | Premium Software & Web Development Company",
    description: "Top-tier software development company and AI automation agency based in India.",
  },
  alternates: {
    canonical: "https://codemates.in",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Codemates",
    "url": "https://codemates.in",
    "logo": "https://codemates.in/logo.png",
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+91-7348975886",
        "contactType": "customer service",
        "email": "support@codemates.in",
      },
      {
        "@type": "ContactPoint",
        "telephone": "+91-7483673004",
        "contactType": "customer service",
        "email": "support@codemates.in",
      },
    ],
    "sameAs": ["https://linkedin.com", "https://instagram.com"],
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Codemates",
    "image": "https://codemates.in/logo.png",
    "url": "https://codemates.in",
    "telephone": "+91-7348975886",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN",
    },
  };
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <SchemaMarkup schema={orgSchema} />
        <SchemaMarkup schema={localBusinessSchema} />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <GlobalSubconsciousSynth />
      </body>
    </html>
  );
}
