import { FileConverter } from "./FileConverter";
import type { Metadata } from "next";
import Script from "next/script";

// SEO metadata
export const metadata: Metadata = {
    title: "Convert Maybank Bank Statement to CSV | Free Online Tool",
    description:
        "Free online tool to convert Maybank bank statements from PDF to CSV format. Import your Maybank transactions easily into Excel, Google Sheets, or financial software.",
    keywords: [
        "Maybank statement converter",
        "Maybank to CSV",
        "convert Maybank PDF to CSV",
        "Maybank statement CSV export",
        "Maybank transaction export",
        "Maybank statement parser",
        "bank statement converter",
        "free Maybank converter",
        "online Maybank statement converter",
        "free PDF to CSV converter",
        "online CSV conversion tool",
        "free Maybank statement tool",
        "free online bank statement converter",
        "free financial data export",
        "online transaction extractor",
    ],
    openGraph: {
        title: "Maybank Statement to CSV Converter",
        description:
            "Convert your Maybank bank statements from PDF to CSV instantly. No data is stored - your files remain private.",
        type: "website",
        locale: "en_US",
        siteName: "Maybank Statement Converter",
    },
    twitter: {
        card: "summary_large_image",
        title: "Convert Maybank Bank Statements to CSV",
        description:
            "Free tool to convert Maybank PDF statements to CSV format for financial tracking",
    },
    alternates: {
        canonical: "https://maybankconverter.vercel.com",
    },
};

// JSON-LD structured data
const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Maybank Statement to CSV Converter",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
    },
    description:
        "Free online tool to convert Maybank bank statements from PDF to CSV format for easy import into financial software.",
};

export default function Home() {
    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
                <div className="container mx-auto px-4 py-12 max-w-5xl">
                    <header className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
                            <span className="text-yellow-700">Maybank</span>{" "}
                            Statement to CSV Converter
                        </h1>
                        <p className="text-gray-800 dark:text-gray-300 max-w-2xl mx-auto">
                            <span className="font-semibold">
                                Free online tool
                            </span>{" "}
                            to convert your Maybank bank statements from PDF to
                            CSV format for easy import into Excel, Google
                            Sheets, or financial software
                        </p>
                    </header>

                    <section className="mb-8 text-center">
                        <div className="bg-yellow-100 dark:bg-yellow-900/20 border-2 border-yellow-300 dark:border-yellow-800 rounded-lg p-4 max-w-3xl mx-auto">
                            <h2 className="text-xl font-semibold text-yellow-950 dark:text-yellow-200 mb-2">
                                Why Convert Maybank Statements to CSV?
                            </h2>
                            <ul className="text-left text-sm space-y-2 list-disc list-inside text-gray-900 dark:text-gray-300">
                                <li>
                                    Easy import to spreadsheet software like
                                    Excel or Google Sheets
                                </li>
                                <li>
                                    Compatible with budgeting apps and financial
                                    management tools
                                </li>
                                <li>
                                    Analyze your spending patterns and
                                    transaction history
                                </li>
                                <li>
                                    Maintain financial records in an accessible
                                    format
                                </li>
                                <li>
                                    Simplify tax preparation and financial
                                    reporting
                                </li>
                            </ul>
                        </div>
                    </section>

                    <main className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-300 dark:border-gray-700">
                        <FileConverter />
                    </main>

                    <section className="mt-12 mb-12 max-w-3xl mx-auto">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            How to Convert Your Maybank Statement to CSV - Free
                            & Online
                        </h2>
                        <ol className="text-gray-900 dark:text-gray-300 space-y-4 list-decimal list-inside">
                            <li className="mb-2">
                                <span className="font-medium">
                                    Download your statement:
                                </span>{" "}
                                Log in to Maybank2u and download your bank
                                statement as a PDF
                            </li>
                            <li className="mb-2">
                                <span className="font-medium">
                                    Upload your statement:
                                </span>{" "}
                                Use the free online file uploader above to
                                select your Maybank statement PDF
                            </li>
                            <li className="mb-2">
                                <span className="font-medium">
                                    Convert to CSV:
                                </span>{" "}
                                Click the &quot;Convert to CSV&quot; button to
                                process your statement
                            </li>
                            <li className="mb-2">
                                <span className="font-medium">
                                    Download CSV file:
                                </span>{" "}
                                Once conversion is complete, download your CSV
                                file
                            </li>
                            <li className="mb-2">
                                <span className="font-medium">
                                    Import to your tool:
                                </span>{" "}
                                Use the CSV file with Excel, Google Sheets, or
                                your financial software
                            </li>
                        </ol>
                    </section>

                    <section className="mb-12 max-w-3xl mx-auto">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            About This Free Online Maybank Converter Tool
                        </h2>
                        <div className="text-gray-900 dark:text-gray-300 space-y-3">
                            <p>
                                This <strong>100% free online tool</strong>{" "}
                                converts Maybank bank statements from PDF format
                                to CSV (Comma-Separated Values) format. The
                                conversion happens entirely in your browser -
                                your financial data never leaves your device.
                            </p>
                            <p>
                                The converter extracts transaction dates,
                                details, amounts, and balances from Maybank
                                statements and organizes them into a structured
                                CSV format that&apos;s compatible with most
                                financial software.
                            </p>
                            <p>
                                Perfect for Maybank account holders who want to
                                track their finances more effectively or need to
                                import transaction data into budgeting tools.
                            </p>
                        </div>
                    </section>

                    <footer className="mt-8 text-center border-t border-gray-300 dark:border-gray-700 pt-8">
                        <p className="text-sm text-gray-700 dark:text-gray-400">
                            This free online Maybank statement to CSV converter
                            processes all files locally in your browser. No data
                            is uploaded to any server or stored anywhere.
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-500 mt-2">
                            Not affiliated with Maybank. For personal use only.
                        </p>
                    </footer>
                </div>
            </div>

            {/* Structured data for SEO */}
            <Script id="schema-jsonld" type="application/ld+json">
                {JSON.stringify(jsonLd)}
            </Script>
        </>
    );
}
