import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Space_Grotesk } from "next/font/google";

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

export const metadata: Metadata = {
  title: "Abel Adane | Portfolio",
  description: "Personal portfolio of Abel Adane — Full Stack Web Developer & Junior UI/UX Designer",
  icons: {
    icon: '/Icons/favicon.ico',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${spaceGrotesk.className} ${generalSans.variable} bg-bgColor text-textColor`}>
        {children}
      </body>
    </html>
  );
}
