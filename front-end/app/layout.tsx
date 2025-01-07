import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "./ui/layout/header";
import Footer from "./ui/layout/footer";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CS50 store",
  description: "Final project for CS50 X",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
      <Header />
        {children}
      <Footer />
      </body>
    </html>
  );
}
