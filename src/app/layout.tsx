import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/Nav";
import clsx from "clsx";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "MinMax",
  description: "MinMaxBlog.com",
  authors: [
    {
      name: "MinMax",
      url: "minmaxblog.com",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      lang="en"
      suppressHydrationWarning
    >
      <body
        className={clsx(
          "w-full bg-theme-white bg-cover bg-center bg-no-repeat bg-blend-screen dark:bg-theme-black dark:bg-blend-multiply text-theme-black dark:text-theme-white transition-colors duration-500 m-auto max-w-screen-2xl px-4 antialiased font-sans"
        )}
      >
        <ThemeProvider>
          <Nav />
          {children}
          <GoogleAnalytics
            gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID!}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
