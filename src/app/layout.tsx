import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NoteBook",
  description: "Simple Note Taking Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${geistSans.variable} ${geistMono.variable}`} lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-800">
        <div className="">
          <Nav />
          <main className="mt-6">
            {children}
            <Toaster 
              position="bottom-right" 
              richColors 
              toastOptions={{ duration: 3000 }} 
            />
          </main>
        </div>
      </body>
    </html>
  );
}
