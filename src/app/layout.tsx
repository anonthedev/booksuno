import "./globals.css";
import { Gloock, Golos_Text, Raleway } from "next/font/google";
import Player from "@/Components/Player";
import MobileSidebar from "@/Components/Sidebar/MobileSidebar";
import GoogleAnalytics from "@/Components/GoogleAnalytics";
import Head from "next/head";

export const metadata = {
  title: "librarify",
  description: "Discover a world of literary delights with Librarify! Dive into an extensive collection of free audiobooks, offering limitless listening pleasure. Immerse yourself in captivating stories, anytime, anywhere",
  keywords: [
    "free audiobooks",
    "Librarify",
    "listen to books online",
    "audiobook streaming",
    "digital library",
    "literary gems",
    "audiobook platform",
    "enjoy reading",
    "reading on the go"
  ],
  manifest: "/manifest.json",
};

const gloock = Gloock({
  variable: "--font-gloock",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

const golos = Golos_Text({
  variable: "--font-golos",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${gloock.variable} ${golos.variable} ${raleway.variable}`}>
      <body>
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
          <GoogleAnalytics ga_id=
            {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
        ) : null}
        {children}
        <section className="fixed bottom-0 order-2">
          <Player />
          <MobileSidebar />
        </section>
      </body>
    </html>
  );
}
