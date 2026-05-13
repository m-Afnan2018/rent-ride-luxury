import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import localFont from "next/font/local";
import Navbar from "@/components/comman/nav/navbar";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const panixome = localFont({
  src: [
    {
      path: "../../public/fonts/Panixome.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Panixome-bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-pani",
});

export const metadata: Metadata = {
  title: "Rent Ride Luxury | Premium Car Rentals",
  description: "Experience the ultimate in luxury car rentals. Handpicked premium vehicles for those who appreciate performance and style.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${montserrat.variable} ${panixome.variable}`} suppressHydrationWarning={true}>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
