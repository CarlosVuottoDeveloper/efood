import type { Metadata } from "next";
import { urbanist } from "@/design-system/fonts";
import "@/design-system/tokens/tokens.css";
import "@/design-system/tokens/base.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "eFood",
  description: "Embalagens reutilizáveis compartilhadas pela rede de restaurantes parceiros.",
  icons: { icon: { url: "/img/logo.svg", type: "image/svg+xml" } },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={urbanist.variable}>
      <body>{children}</body>
    </html>
  );
}
