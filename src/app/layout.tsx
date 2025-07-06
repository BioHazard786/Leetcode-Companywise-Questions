import { AppSidebar } from "@/components/app-sidebar";
import Providers from "@/components/providers/providers";
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
  authors: [{ name: "LeetCode Company-wise Questions" }],
  creator: "LeetCode Company-wise Questions",
  publisher: "LeetCode Company-wise Questions",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "LeetCode Company-wise Questions | Practice Problems by Company",
    description:
      "Explore and filter LeetCode problems categorized by companies like Google, Microsoft, Amazon, and more. Practice coding interviews with problems sorted by difficulty, topics, and company preferences.",
    siteName: "LeetCode Company-wise Questions",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "LeetCode Company-wise Questions - Practice coding interview problems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LeetCode Company-wise Questions | Practice Problems by Company",
    description:
      "Explore and filter LeetCode problems categorized by companies like Google, Microsoft, Amazon, and more.",
    images: ["/og-image.png"],
    creator: "@leetcode_practice",
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
  verification: {
    google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // yahoo: "your-yahoo-verification-code",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "LeetCode Company-wise Questions",
    description:
      "Explore and filter LeetCode problems categorized by companies like Google, Microsoft, Amazon, and more. Practice coding interviews with problems sorted by difficulty, topics, and company preferences.",
    url: process.env.NEXT_PUBLIC_APP_URL || "https://localhost:3000",
    applicationCategory: "EducationalApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Organization",
      name: "LeetCode Company-wise Questions",
    },
    keywords:
      "leetcode, coding interview, programming problems, algorithms, data structures, technical interview, coding practice",
    inLanguage: "en-US",
    isAccessibleForFree: true,
  };

  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <meta name="theme-color" content="#000000" />
        <meta name="color-scheme" content="dark light" />
        <link
          rel="canonical"
          href={process.env.NEXT_PUBLIC_APP_URL || "https://localhost:3000"}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
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
      </body>
    </html>
  );
}
