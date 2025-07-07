import { AppSidebar } from "@/components/app-sidebar";
import Providers from "@/components/providers/providers";
import { ServiceWorkerRegistration } from "@/components/service-worker-registration";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "LeetCode Company-wise Questions | Practice Problems by Company",
    template: "%s | LeetCode Company-wise Questions",
  },
  description:
    "Explore and filter LeetCode problems categorized by companies like Google, Microsoft, Amazon, and more. Practice coding interviews with problems sorted by difficulty, topics, and company preferences.",
  keywords: [
    "leetcode",
    "coding interview",
    "programming problems",
    "algorithms",
    "data structures",
    "google interview",
    "microsoft interview",
    "amazon interview",
    "software engineer",
    "coding practice",
    "technical interview",
    "computer science",
    "problem solving",
    "coding challenges",
    "interview preparation",
  ],
  authors: [
    {
      name: "Mohd Zaid",
      url: "https://github.com/BioHazard786",
    },
  ],
  creator: "Mohd Zaid",
  publisher: "Mohd Zaid",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/favicon-light.png",
        href: "/favicon-light.png",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/favicon-dark.png",
        href: "/favicon-dark.png",
      },
    ],
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://localhost:3000"
  ),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {process.env.NODE_ENV === "development" ||
        process.env.NEXT_PUBLIC_REACT_SCAN === "true" ? (
          <script
            src="https://unpkg.com/react-scan/dist/auto.global.js"
            async
          />
        ) : null}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <div className="flex h-screen w-full">
            <AppSidebar />
            <main className="flex-1 overflow-auto">
              <div>
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="p-4">
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                      LeetCode Problems
                    </h1>
                    <p className="text-sm md:text-base text-muted-foreground">
                      Browse and filter problems by company, difficulty, and
                      topics
                    </p>
                  </div>
                </div>
                {children}
              </div>
            </main>
          </div>
        </Providers>
        <ServiceWorkerRegistration />
      </body>
    </html>
  );
}
