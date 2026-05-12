import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Painel de Dados",
  description:
    "Explore PIB, desemprego e população por estado e ano, cruzados com os governantes de cada período.",
  openGraph: {
    title: "Painel de Dados | GovData-BR",
    description:
      "Explore PIB, desemprego e população por estado e ano, cruzados com os governantes de cada período.",
    url: "https://govdata-br.vercel.app/painel",
  },
};

export default function PainelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
