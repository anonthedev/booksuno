import "./globals.css";
import { Gloock, Golos_Text, Raleway } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Player from "@/Components/Dashboard/Player";
import MobileSidebar from "@/Components/Sidebar/MobileSidebar";

export const metadata = {
  title: "bookify",
  description: "Seamlessly convert YouTube videos to audio, craft personalized playlists all without requiring to download anything, the ultimate platform for audio enthusiasts.",
  // openGraph: {
  //   images: 'https://photos.sphereshowcase.com/tBJczsgyzUAP3woETDr31.jpg',
  // },
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
        {children}
        <section className="fixed bottom-0 order-2">
          <Player />
          <MobileSidebar />
        </section>
        <Analytics />
      </body>
    </html>
  );
}
