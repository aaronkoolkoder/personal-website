import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Runs before first paint so a pinned theme never flashes the system one.
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

export const metadata: Metadata = {
  title: "Aaron Merchant",
  description: "Aaron Merchant builds software that feels good to use.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-dvh overflow-hidden overscroll-none antialiased`}
      suppressHydrationWarning
    >
      <body className="flex h-dvh flex-col overflow-hidden overscroll-none">
        <Script id="theme" strategy="beforeInteractive">
          {themeScript}
        </Script>
        <noscript>
          <style>{"[data-fit] { opacity: 1 !important; }"}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
