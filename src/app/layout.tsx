import "./globals.css";
import { Gloock, Golos_Text, Raleway } from "next/font/google";
import Player from "@/Components/Player";
import MobileSidebar from "@/Components/Sidebar/MobileSidebar";
import GoogleAnalytics from "@/Components/GoogleAnalytics";
import { Metadata } from "next/types";
import CurrentPlayingBook from "@/Components/Book/CurrentPlayingBook";

const APP_NAME = "booksuno";
const APP_DEFAULT_TITLE = "booksuno";
const APP_TITLE_TEMPLATE = "%s - booksuno";
const APP_DESCRIPTION = "Discover a world of literary delights with booksuno! Dive into an extensive collection of free audiobooks, offering limitless listening pleasure. Immerse yourself in captivating stories, anytime, anywhere";
const APP_URL = "https://booksuno.xyz"

export const metadata: Metadata = {
  manifest: "/manifest.json",
  applicationName: APP_NAME,
  authors: [{name:"Anon 2.0", url: "https://twitter.com/anonthedev"}],
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  themeColor: "#121212",
  creator: "Anon 2.0",
  robots: "index, follow",
  description: APP_DESCRIPTION,
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: APP_DEFAULT_TITLE,
    startupImage:[
      {
        url: 'https://booksuno/apple-touch-icon.png',
      },
    ]
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
    url: APP_URL,
    locale: 'en_IN',
    description: APP_DESCRIPTION,
    images:[
      {
        url: 'https://booksuno/og.png',
        width: 800,
        height: 600,
      },
      {
        url: 'https://booksuno/og-alt.png',
        width: 1800,
        height: 1600,
      },
    ]
  },
  twitter: {
    card: "summary",
    creator: "Anon 2.0",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    images:[
      {
        url: 'https://booksuno/twitter-image.png',
        width: 1920,
        height: 1080,
      },
    ],
    site: APP_URL,
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
      {/* <head>
        <link rel="manifest" href="/manifest.json" />
      </head> */}
      <body>
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
          <GoogleAnalytics ga_id=
            {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} ga_id2={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS2!} />
        ) : null}
        <section className="w-screen flex flex-row">
          <section className="w-3/4 xl:w-full">
            {children}
          </section>
          <section className="w-1/4 p-2 pb-16 h-screen xl:hidden">
            <CurrentPlayingBook />
          </section>
        </section>
        <section className="fixed bottom-0 order-2">
          <Player />
          <MobileSidebar />
        </section>
      </body>
    </html>
  );
}
