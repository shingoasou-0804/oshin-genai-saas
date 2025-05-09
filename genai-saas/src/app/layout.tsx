import type { Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs'
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  preload: true,
})

export const metadata: Metadata = {
  title: "Oshin GenAI SaaS",
  description: "AI機能サービスのWebサービスです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="ja">
        <body
          className={`${notoSansJP.className}  antialiased`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
