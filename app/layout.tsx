import { Inter } from "next/font/google";

import "./globals.css";

const font = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`overflow-hidden flex flex-col h-screen ${font.className}`}>{children}</body>
    </html>
  );
}
