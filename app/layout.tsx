import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { THEME_STORAGE_KEY } from "@/lib/theme";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rogelio Villarreal — Portfolio",
  description: "Computer Science student and software engineer — full-stack, AI integrations, and product delivery.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`} suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen`}>
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){try{var t=localStorage.getItem(${JSON.stringify(
            THEME_STORAGE_KEY,
          )});document.documentElement.dataset.theme=t==="forest"?"forest":"teal";}catch(e){document.documentElement.dataset.theme="teal";}})();`}
        </Script>
        {children}
      </body>
    </html>
  );
}
