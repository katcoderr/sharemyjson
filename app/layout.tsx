import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import { Footer } from "@/components/ui/large-name-footer";

export const metadata: Metadata = {
  title: "sharemyjson.",
  description: "share your json data securely, anonymously & effortlessly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Navbar />
          <div className="max-w-4xl mx-auto px-4">
            {children}
            <Footer />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
