import type React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { UsersProvider } from "@/context/usersContext";
import { IdProvider } from "@/context/captureIDContext";

import "./globals.css";

export const metadata = {
  title: "Before you gogo",
  description: "A beautiful, accessible UI for your Next.js applications",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <IdProvider>
          <UsersProvider>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </UsersProvider>
        </IdProvider>
      </body>
    </html>
  );
}