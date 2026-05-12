import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { BarraNavegacao } from "@/components/BarraNavegacao";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const URL_BASE = "https://govdata-br.vercel.app";
const DESCRICAO = "Dashboard interativo que cruza dados econômicos do IBGE com mandatos políticos brasileiros por estado e período histórico.";

export const metadata: Metadata = {
  title: {
    default: "GovData-BR",
    template: "%s | GovData-BR",
  },
  description: DESCRICAO,
  metadataBase: new URL(URL_BASE),
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "GovData-BR",
    title: "GovData-BR",
    description: DESCRICAO,
    url: URL_BASE,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "GovData-BR — dados econômicos e mandatos políticos do Brasil",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GovData-BR",
    description: DESCRICAO,
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <BarraNavegacao />
        {children}
      </body>
    </html>
  );
}
