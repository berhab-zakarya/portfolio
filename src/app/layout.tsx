import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { SpeedInsights } from "@vercel/speed-insights/next"
const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
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
    <html lang="en">
      <body
        className={`${roboto.variable}  antialiased`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
      </body>
    </html>
  );
}
