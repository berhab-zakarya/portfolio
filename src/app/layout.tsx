import type { Metadata } from "next";
import { Alumni_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { SpeedInsights } from "@vercel/speed-insights/next"
const alumni = Alumni_Sans({
  subsets: ["latin"],
  variable: "--font-alumni",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});


export const metadata: Metadata = {
  title: "Zakarya Berhab – Fullstack Developer | Mobile & Web Solutions",
  description:
    "Discover Zakarya Berhab's portfolio – a skilled Fullstack Developer from Algeria, building high-performance web and mobile applications using Next.js, Django, Flutter, and Android Studio. Founder of StudX PTM, delivering smart SaaS solutions for businesses. Explore his work, vision, and development journey.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${alumni.variable}  antialiased`}>
      <body

      >
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <SpeedInsights/>
            {children}
            
          </ThemeProvider>
      </body>
    </html>
  );
}
