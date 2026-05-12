import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Saiba mais sobre o GovData-BR: metodologia, fontes de dados e a stack utilizada no projeto.",
  openGraph: {
    title: "Sobre | GovData-BR",
    description:
      "Saiba mais sobre o GovData-BR: metodologia, fontes de dados e a stack utilizada no projeto.",
    url: "https://govdata-br.vercel.app/sobre",
  },
};

export default function SobreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
