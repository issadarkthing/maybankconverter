import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Disclaimer | Maybank Statement Converter",
    description:
        "Legal disclaimer and terms of use for the Maybank Statement to CSV/Excel Converter tool.",
};

export default function DisclaimerPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
            <div className="container mx-auto px-4 py-12 max-w-3xl">
                <header className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                        Legal Disclaimer
                    </h1>
                    <p className="text-gray-700 dark:text-gray-300">
                        Terms of use for Maybank Statement Converter
                    </p>
                </header>

                <main className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-300 dark:border-gray-700 p-6 mb-8">
                    <div className="space-y-6 text-gray-800 dark:text-gray-300">
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                General Disclaimer
                            </h2>
                            <p>
                                The Maybank Statement to CSV/Excel Converter is
                                an independent tool provided for convenience and
                                is not affiliated with, endorsed by, or
                                sponsored by Malayan Banking Berhad (Maybank).
                                This service is provided &quot;as is&quot;
                                without any warranties, expressed or implied.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                Data Privacy & Security
                            </h2>
                            <p className="mb-2">
                                All file processing occurs entirely within your
                                browser. Your financial data:
                            </p>
                            <ul className="list-disc pl-6 space-y-1">
                                <li>Never leaves your device</li>
                                <li>Is not transmitted over the internet</li>
                                <li>Is not stored or logged in any way</li>
                                <li>
                                    Is not accessible to the creators of this
                                    tool
                                </li>
                            </ul>
                            <p className="mt-2">
                                We employ client-side processing technologies to
                                ensure your sensitive financial information
                                remains private and secure. The website uses
                                basic analytics to count visitors but does not
                                track individual users.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                Accuracy Disclaimer
                            </h2>
                            <p>
                                While we strive for accuracy, this tool may not
                                extract all data perfectly from every statement
                                format. The converter is designed for standard
                                Maybank statement layouts but may not handle
                                variations, custom formats, or corrupted PDFs
                                accurately. Always verify the converted data
                                against your original statement before using it
                                for financial purposes, record-keeping, or
                                decision making.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                Usage Terms
                            </h2>
                            <p className="mb-2">
                                By using this service, you agree to:
                            </p>
                            <ul className="list-disc pl-6 space-y-1">
                                <li>
                                    Use the tool for personal, non-commercial
                                    purposes
                                </li>
                                <li>
                                    Verify the accuracy of all converted data
                                </li>
                                <li>
                                    Comply with Maybank&apos;s terms of service
                                    regarding your statement data
                                </li>
                                <li>
                                    Accept all risks associated with using this
                                    tool
                                </li>
                            </ul>
                            <p className="mt-2">
                                We reserve the right to modify or discontinue
                                this service at any time without notice.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                Limitation of Liability
                            </h2>
                            <p>
                                The creators, developers, and maintainers of
                                this tool shall not be liable for any direct,
                                indirect, incidental, special, consequential, or
                                exemplary damages resulting from your use of or
                                inability to use this service. This includes,
                                but is not limited to, damages for loss of
                                profits, goodwill, data, or other intangible
                                losses.
                            </p>
                            <p className="mt-2">
                                Users assume all responsibility for how they use
                                the output of this converter, including any
                                financial decisions made based on the converted
                                data.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                Intellectual Property Notice
                            </h2>
                            <p>
                                &quot;Maybank&quot; is a registered trademark of
                                Malayan Banking Berhad. All references to
                                Maybank are for descriptive purposes only to
                                indicate compatibility with Maybank statement
                                formats. This tool is not claiming any rights to
                                the Maybank name, logo, or other intellectual
                                property.
                            </p>
                        </section>
                    </div>
                </main>

                <div className="text-center">
                    <Link
                        href="/"
                        className="inline-block px-4 py-2 text-sm font-medium text-black bg-yellow-500 hover:bg-yellow-600 rounded-md transition-colors"
                    >
                        Return to Converter
                    </Link>
                </div>

                <footer className="mt-8 text-center text-xs text-gray-600 dark:text-gray-500">
                    <p>
                        Last updated:{" "}
                        {new Date().toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </p>
                </footer>
            </div>
        </div>
    );
}
