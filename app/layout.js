import {
  Baloo_2,
  Cormorant_Garamond,
  DM_Sans,
  Eczar,
  Hind,
  Kalam,
  Mukta,
  Noto_Serif_Devanagari,
  Rozha_One,
  Tillana,
  Tiro_Devanagari_Marathi,
  Yatra_One,
} from "next/font/google";
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

const marathiSerif = Tiro_Devanagari_Marathi({
  subsets: ["devanagari", "latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-marathi-serif",
  display: "swap",
});

const marathiSans = Mukta({
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-marathi-sans",
  display: "swap",
});

const marathiDisplay = Yatra_One({
  subsets: ["devanagari", "latin"],
  weight: ["400"],
  variable: "--font-marathi-display",
  display: "swap",
});

// Extra Marathi / Devanagari faces.
// `preload: false` keeps these decorative faces out of the critical path;
// they are fetched only when something on the page actually uses them.
const marathiEditorial = Eczar({
  subsets: ["devanagari", "latin"],
  variable: "--font-marathi-editorial",
  display: "swap",
  preload: false,
});

const marathiDisplaySerif = Rozha_One({
  subsets: ["devanagari", "latin"],
  weight: ["400"],
  variable: "--font-marathi-display-serif",
  display: "swap",
  preload: false,
});

const marathiRounded = Baloo_2({
  subsets: ["devanagari", "latin"],
  variable: "--font-marathi-rounded",
  display: "swap",
  preload: false,
});

const marathiCalligraphy = Tillana({
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-marathi-calligraphy",
  display: "swap",
  preload: false,
});

const marathiHand = Kalam({
  subsets: ["devanagari", "latin"],
  weight: ["300", "400", "700"],
  variable: "--font-marathi-hand",
  display: "swap",
  preload: false,
});

const marathiModern = Hind({
  subsets: ["devanagari", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-marathi-modern",
  display: "swap",
  preload: false,
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
      className={`${serif.variable} ${sans.variable} ${devanagari.variable} ${marathiSerif.variable} ${marathiSans.variable} ${marathiDisplay.variable} ${marathiEditorial.variable} ${marathiDisplaySerif.variable} ${marathiRounded.variable} ${marathiCalligraphy.variable} ${marathiHand.variable} ${marathiModern.variable}`}
    >
      <body id="top">{children}</body>
    </html>
  );
}
