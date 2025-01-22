
import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { CartProvider } from "@/components/CartContext";
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})
 


export const metadata: Metadata = {
  title: "Jomajo",
  description: "Jomajo is a food delivery app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} h-screen antialiased`}
        >
        
        <CartProvider>
          <Navbar/>
          {children}
          <Footer/>
        </CartProvider>
        
      </body>
    </html>
  );
}
