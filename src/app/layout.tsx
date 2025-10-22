import type { Metadata } from "next";
import { Mooli, Roboto_Flex } from "next/font/google";
import "./globals.css";

const mooli = Mooli({
  variable: "--font-mooli",
  subsets: ["latin"],
  weight: ["400"],
});

const robotoFlex = Roboto_Flex({
  variable: "--font-roboto-flex",
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
});

export const metadata: Metadata = {
  title: "Portfolio - AI/ML Engineer & Researcher",
  description:
    "Portfolio showcasing AI/ML engineering, research, and competitive programming expertise",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Force dark theme globally by adding the 'dark' class to the html element
    <html lang="en" className="scroll-smooth dark">
      <body
        className={`${mooli.variable} ${robotoFlex.variable} antialiased bg-[rgb(var(--bg))] text-[rgb(var(--fg))] transition-colors duration-300`}
      >
        {children}
      </body>
    </html>
  );
}
