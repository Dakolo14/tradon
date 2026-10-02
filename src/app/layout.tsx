import type { Metadata } from "next";
import { Poppins, Inter, Plus_Jakarta_Sans, Outfit } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-jakarta",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Tradon | Distribution Management Operating System",
  description: "One platform where FMCG brands, distributors, and retailers manage every order together.",
  icons: {
    icon: "/favicon.ico",
  },
};

import { AuthProvider } from "@/context/AuthContext";
import { AppearanceProvider } from "@/context/AppearanceContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable} ${jakarta.variable} ${outfit.variable}`}>
      <body className="antialiased min-h-screen flex flex-col font-sans bg-white selection:bg-[#A3FF00]/40 selection:text-[#0E3E2B]">
        <AuthProvider>
          <AppearanceProvider>
            {children}
          </AppearanceProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
