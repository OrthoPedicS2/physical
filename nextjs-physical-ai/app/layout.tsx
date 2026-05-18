import type { Metadata } from "next";
import { Inter, Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollToTop from "@/components/ScrollToTop";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const noto = Noto_Sans_KR({ weight: ["400", "700", "900"], subsets: ["latin"], variable: "--font-noto-sans-kr" });

export const metadata: Metadata = {
  title: "PrimeFix | Leading Robotic Solutions",
  description: "Next-generation PrimeFix and Robotics solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${inter.variable} ${noto.variable} font-sans antialiased overflow-x-hidden`}>
        <SmoothScroll />
        <Navbar />
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
