import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Montserrat, Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: {
    default: "Official PERSIB website",
    template: "%s | Persib ",
  },
  description: "Unofficial PERSIB Bandung concept website.",
  other: { google: "notranslate" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0d1448",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="id"
      translate="no"
      className={`${poppins.variable} ${montserrat.variable} ${bebas.variable}`}
    >
      <body>
        <div className="app-bg" aria-hidden="true" />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
