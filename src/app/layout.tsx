
import type { Metadata } from "next";
import "./globals.css";
import { Roboto } from 'next/font/google'
import { CartProvider } from "@/components/CartContext";

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
          
          <CartProvider>{children}</CartProvider>
        
      </body>
    </html>
  );
}