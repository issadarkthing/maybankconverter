import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
        { media: "(prefers-color-scheme: dark)", color: "#111827" },
    ],
};

export const metadata: Metadata = {
    metadataBase: new URL("https://maybankconverter.vercel.app"),
    title: {
        default: "Maybank Statement to CSV Converter | Free Online Tool",
        template: "%s | Maybank Statement Converter",
    },
    description:
        "Free online tool to convert Maybank bank statements from PDF to CSV format. No data is stored - your financial information stays private.",
    generator: "Next.js",
    applicationName: "Maybank Statement Converter",
    referrer: "origin-when-cross-origin",
    keywords: [
        "Maybank",
        "bank statement",
        "PDF to CSV",
        "Free online tool",
        "Online tool",
        "converter",
        "financial tools",
        "transaction export",
        "Maybank2u",
        "statement parser",
        "financial data",
        "CSV export",
        "Malaysian bank",
    ],
    authors: [
        { name: "Your Name", url: "https://maybankconverter.vercel.com" },
    ],
    creator: "Your Name",
    publisher: "Your Name",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        type: "website",
        locale: "en_MY",
        url: "https://maybankconverter.vercel.app",
        title: "Maybank Statement to CSV Converter",
        description:
            "Convert your Maybank bank statements from PDF to CSV format for free. Process locally without uploading your data.",
        siteName: "Maybank Statement Converter",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Maybank Statement to CSV Converter",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Maybank Statement to CSV Converter",
        description:
            "Convert your Maybank bank statements from PDF to CSV format for free",
        images: ["/twitter-image.png"],
        creator: "@yourtwitter",
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
    icons: {
        icon: [
            { url: "/favicon.ico" },
            { url: "/icon.png", type: "image/png", sizes: "32x32" },
        ],
        apple: [
            { url: "/apple-icon.png", type: "image/png", sizes: "180x180" },
        ],
        other: [
            {
                rel: "mask-icon",
                url: "/safari-pinned-tab.svg",
            },
        ],
    },
    manifest: "/site.webmanifest",
    category: "finance",
    verification: {
        google: "your-google-site-verification-code",
    },
    alternates: {
        canonical: "/",
        languages: {
            "en-US": "/en-us",
            "ms-MY": "/ms-my",
        },
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <GoogleTagManager gtmId="GTM-TJQCH5KP" />
                {/* Any additional scripts needed globally */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                <meta
                    name="google-adsense-account"
                    content="ca-pub-9907224249755810"
                />
                <meta
                    name="apple-mobile-web-app-title"
                    content="Statement Converter"
                />
                <meta
                    name="google-site-verification"
                    content="zOrwNzOeSAmip7G9g47N6l05Jx7z43JD6ojpkkIA2Go"
                />
                <Script
                    async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9907224249755810"
                    crossOrigin="anonymous"
                />
                <Script src="https://cdn.jsdelivr.net/npm/pdfjs-dist@1.10.100/build/pdf.min.js" />
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                {children}
            </body>
            <GoogleAnalytics gaId="G-YMEW5BY03V" />
        </html>
    );
}
