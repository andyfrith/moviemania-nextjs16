import type { Metadata } from "next";
import { nunito_sans } from "@/app/lib/fonts";
import "./globals.css";
import { Providers } from "./components/Providers";

export const metadata: Metadata = {
  title: "Let's go to the movies!",
  description: "A Next.js application utilizing the OMDb API interface.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito_sans.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
