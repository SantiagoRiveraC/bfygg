import type React from "react";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { AuthProvider } from "@/context/AuthContext";
import { UsersProvider } from "@/context/usersContext";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
      <AuthProvider>
        <UsersProvider>
          <body className={inter.className}>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </body>
        </UsersProvider>
      </AuthProvider>
    </html>
  );
}
