import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Imper Credi Brasil | Crédito com atendimento de verdade",
  description: "Faça sua simulação de crédito e receba atendimento personalizado da equipe Imper Credi Brasil.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">{children}</body>
    </html>
  );
}
