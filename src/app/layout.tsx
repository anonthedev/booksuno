import "./globals.css";
import { Gloock, Golos_Text, Raleway } from "next/font/google";
import Player from "@/Components/Player";
import MobileSidebar from "@/Components/Sidebar/MobileSidebar";
import GoogleAnalytics from "@/Components/GoogleAnalytics";
import { Metadata } from "next/types";

const APP_NAME = "librarify";
const APP_DEFAULT_TITLE = "librarify";
const APP_TITLE_TEMPLATE = "%s - librarify";
const APP_DESCRIPTION = "Discover a world of literary delights with Librarify! Dive into an extensive collection of free audiobooks, offering limitless listening pleasure. Immerse yourself in captivating stories, anytime, anywhere";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
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
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
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
