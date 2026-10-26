import { Cormorant_Garamond, DM_Sans, Noto_Serif_Devanagari } from "next/font/google";
import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const devanagari = Noto_Serif_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "500"],
  variable: "--font-devanagari",
  display: "swap",
});

export const metadata = {
  title: "Anubhootee — A journal of living culture",
  description:
    "A modern journal of Indian culture, sacred art, and lived experience. Stories of belief, craft, food, place, and the knowledge people keep alive.",
  keywords: [
    "Indian culture",
    "cultural journal",
    "sacred art",
    "travel",
    "heritage",
    "Anubhootee",
  ],
  openGraph: {
    title: "Anubhootee — A journal of living culture",
    description:
      "Stories of belief, craft, food, place, and the knowledge people keep alive.",
    type: "website",
  },
};

export const viewport = {
  themeColor: "#0B351F",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${serif.variable} ${sans.variable} ${devanagari.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
