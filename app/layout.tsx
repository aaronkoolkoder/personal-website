import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aaron Merchant",
  description: "Aaron Merchant builds software that feels good to use.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-dvh overflow-hidden overscroll-none antialiased`}>
      <body className="flex h-dvh flex-col overflow-hidden overscroll-none">{children}</body>
    </html>
  );
}
