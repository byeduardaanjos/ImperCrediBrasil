import type { Metadata } from "next";
import "./globals.css";
import "./mobile-fixes.css";

export const metadata: Metadata = {
  title: "Imper Credi Brasil | Crédito com atendimento de verdade",
  description: "Faça sua simulação de crédito e receba atendimento personalizado da equipe Imper Credi Brasil.",
  icons: {
    icon: "/imper-logo-transparent.png",
    shortcut: "/imper-logo-transparent.png",
    apple: "/imper-logo-transparent.png",
  },
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
