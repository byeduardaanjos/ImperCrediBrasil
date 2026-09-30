import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "CredHeinz Empréstimos | Crédito para os seus planos",
  description: "Faça sua simulação de crédito e receba atendimento personalizado da equipe CredHeinz.",
  icons: {
    icon: "/credheinz-logo.png",
    shortcut: "/credheinz-logo.png",
    apple: "/credheinz-logo.png",
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
