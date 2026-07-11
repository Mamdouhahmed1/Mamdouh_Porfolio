import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter, Space_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Cursor } from "@/components/Cursor";
import { Grain } from "@/components/Grain";
import { ScrollProgress } from "@/components/ScrollProgress";
import { site } from "@/lib/content";

const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const mono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mamdouh-studio.vercel.app"),
  title: {
    default: `${site.name} — Visual Storyteller & Concept Artist`,
    template: `%s · ${site.name}`,
  },
  description:
    "Portfolio of Mamdouh Ahmed — Background Artist, Concept Artist, Character Designer and Storyboard Artist crafting immersive worlds through visual storytelling.",
  keywords: [
    "Mamdouh Ahmed",
    "concept artist",
    "background artist",
    "character designer",
    "storyboard artist",
    "visual development",
    "animation portfolio",
    "dieselpunk",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  openGraph: {
    type: "website",
    title: `${site.name} — Visual Storyteller & Concept Artist`,
    description:
      "Background, concept, character and storyboard art for animation and film.",
    images: ["/artwork/hero/cover.PNG"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Visual Storyteller`,
    description:
      "Background, concept, character and storyboard art for animation and film.",
    images: ["/artwork/hero/cover.PNG"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#08080a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body className="bg-bg text-fg antialiased">
        <SmoothScroll>
          <ScrollProgress />
          <Cursor />
          <Grain />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
