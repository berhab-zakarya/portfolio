import type { Metadata } from "next";
import { Alumni_Sans, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { SpeedInsights } from "@vercel/speed-insights/next";

const alumni = Alumni_Sans({
  subsets: ["latin"],
  variable: "--font-alumni",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const PoppinsFont = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
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
    <html lang="en" className={`${alumni.variable} ${PoppinsFont.variable} antialiased`}>
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
