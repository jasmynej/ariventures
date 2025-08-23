'use client'
import "./globals.css";
import React from "react";
import AvNavbar from "@/components/AvNavbar";
import AvFooter from "@/components/AvFooter";
import layoutStyles from "@/styles/layout.module.css"
import { useSelectedLayoutSegment } from 'next/navigation';

const notMainAV = ['admin', 'ariventures-abroad', 'apps'];
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const segment = useSelectedLayoutSegment();
  const shouldSkipGlobalLayout = notMainAV.includes(segment ?? '');

  if (shouldSkipGlobalLayout) {
    return <>{children}</>;
  }

  return (
    <html lang="en">
      <body className={layoutStyles.wrapper}>
        <AvNavbar/>
        <main className={layoutStyles.main}>
          {children}
        </main>
        <AvFooter/>
      </body>
    </html>
  );
}
