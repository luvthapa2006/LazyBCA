import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header"; // Import the Header

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "LazyBCA - Lecture Recordings and Notes",
  description: "Daily lecture recordings and notes for BCA students.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-800 text-gray-100`}>
        <Header /> {/* Add the Header here */}
        <main className="container mx-auto px-6 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}