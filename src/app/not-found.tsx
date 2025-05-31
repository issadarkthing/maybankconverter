import Link from "next/link";
import MaybankStatementConverterIcon from "./Icon";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Page Not Found | Maybank Statement Converter",
    description: "The page you are looking for does not exist.",
};

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
            <div className="container mx-auto px-4 py-12 max-w-5xl">
                <header className="text-center mb-12">
                    <h1 className="flex items-center justify-center text-4xl font-bold text-gray-900 dark:text-white mb-3">
                        <span className="mr-3">
                            <MaybankStatementConverterIcon className="w-10 h-10 inline-block" />
                        </span>
                        <span>
                            <span className="text-yellow-500">404</span> Page
                            Not Found
                        </span>
                    </h1>
                    <p className="text-gray-800 dark:text-gray-300 max-w-2xl mx-auto">
                        Oops! The page you&apos;re looking for doesn&apos;t
                        exist.
                    </p>
                </header>

                <main className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-300 dark:border-gray-700 p-8 text-center">
                    <div className="py-12">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            Looks like you&apos;ve taken a wrong turn
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-8">
                            The page you requested could not be found. You might
                            have clicked an expired link or mistyped the
                            address.
                        </p>
                        <Link
                            href="/"
                            className="inline-block px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-medium rounded-lg transition-colors"
                        >
                            Back to Home
                        </Link>
                    </div>
                </main>

                <footer className="mt-8 text-center border-t border-gray-300 dark:border-gray-700 pt-8">
                    <div className="max-w-3xl mx-auto">
                        <p className="text-sm text-gray-700 dark:text-gray-400 mb-4">
                            This free online Maybank statement to CSV/Excel
                            converter processes all files locally in your
                            browser. No data is uploaded to any server or stored
                            anywhere.
                        </p>

                        <p className="text-xs text-gray-600 dark:text-gray-500 mb-4">
                            Not affiliated with Maybank. For personal use only.
                        </p>

                        <div className="flex justify-center space-x-4 text-xs mb-4">
                            <a
                                href="/disclaimer"
                                className="text-yellow-600 hover:text-yellow-500 dark:text-yellow-500 dark:hover:text-yellow-400 underline transition-colors"
                            >
                                Legal Disclaimer
                            </a>
                        </div>

                        <p className="text-xs text-gray-600 dark:text-gray-500">
                            © {new Date().getFullYear()} Raziman. All rights
                            reserved.
                        </p>
                    </div>
                </footer>
            </div>
        </div>
    );
}
