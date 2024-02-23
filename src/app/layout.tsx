import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cookies } from "next/headers";
import { Nav } from "@/components/Nav";
import clsx from "clsx";

const inter = Inter({ subsets: ["latin"] });

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
  const theme = cookies().get("theme");
  return (
    <html lang="en" className={theme?.value}>
      <body
        className={clsx(
          inter.className,
          "w-full bg-theme-white bg-cover bg-center bg-no-repeat bg-blend-screen dark:bg-theme-black dark:bg-blend-multiply text-theme-black dark:text-theme-white transition-colors duration-500 m-auto max-w-screen-2xl px-4"
        )}
      >
        <Nav />
        {children}
      </body>
    </html>
  );
}
