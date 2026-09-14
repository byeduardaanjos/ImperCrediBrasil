import type { Metadata } from "next";
import "./globals.css";
import "./mobile-fixes.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://imper-credi-brasil.vercel.app"),
  title: "Imper Credi Brasil | Crédito com atendimento de verdade",
  description: "Faça sua simulação de crédito e receba atendimento personalizado da equipe Imper Credi Brasil.",
  icons: {
    icon: "/imper-logo-transparent.png",
    shortcut: "/imper-logo-transparent.png",
    apple: "/imper-logo-transparent.png",
  },
  openGraph: {
    title: "Imper Credi Brasil | Crédito com atendimento de verdade",
    description: "Faça sua simulação de crédito e receba atendimento personalizado da equipe Imper Credi Brasil.",
    url: "https://imper-credi-brasil.vercel.app",
    siteName: "Imper Credi Brasil",
    images: [
      {
        url: "/imper-logo.png",
        alt: "Imper Credi Brasil",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Imper Credi Brasil | Crédito com atendimento de verdade",
    description: "Faça sua simulação de crédito e receba atendimento personalizado da equipe Imper Credi Brasil.",
    images: ["/imper-logo.png"],
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
