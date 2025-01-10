import dotenv from "dotenv";
const env = process.env.NODE_ENV || "development";
dotenv.config({ path: `.env.${env}` });

import "@/app/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Servo",
  description: "An interview project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" translate="no">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
