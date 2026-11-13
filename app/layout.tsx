import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Space_Grotesk, Sofia_Sans_Extra_Condensed, Caveat, Courier_Prime } from "next/font/google";

const generalSans = localFont({
  src: [
    { path: './fonts/GeneralSans-Regular.woff2', weight: '400', style: 'normal' },
    { path: './fonts/GeneralSans-Bold.woff2',    weight: '700', style: 'normal' },
    { path: './fonts/GeneralSans-Medium.woff2',  weight: '800', style: 'normal' },
  ],
  variable: '--font-general-sans',
});

export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-space-grotesk",
});

// Storybook hero: tall condensed headline, handwritten notes, typewriter labels.
const display = Sofia_Sans_Extra_Condensed({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
  variable: "--font-display-src",
});
const script = Caveat({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-script-src",
});
const typewriter = Courier_Prime({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-type-src",
});

export const metadata: Metadata = {
  title: "Abel Adane | Portfolio",
  description: "Personal portfolio of Abel Adane — Full Stack Web Developer & Junior UI/UX Designer",
  // "a." favicon, matching the "abel adane." wordmark
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${spaceGrotesk.className} ${generalSans.variable} ${display.variable} ${script.variable} ${typewriter.variable} bg-page text-ink`}>
        {children}
      </body>
    </html>
  );
}
