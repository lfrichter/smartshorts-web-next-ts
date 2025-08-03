import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SmartShorts Video Factory",
  description: "Painel de controle para criação de vídeos automatizados.",
};

// A tipagem da prop 'children' é adicionada aqui
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
