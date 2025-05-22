import { FileConverter } from "./FileConverter";

export default function Home() {
    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
                <div className="container mx-auto px-4 py-12 max-w-5xl">
                    <header className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-3">
                            <span className="text-yellow-500">Maybank</span>{" "}
                            Statement Converter
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Convert your Maybank statements to CSV format for
                            easy import into your financial tools
                        </p>
                    </header>

                    <main className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
                        <FileConverter />
                    </main>

                    <footer className="mt-8 text-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            This tool does not store your files.
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                            Not affiliated with Maybank. For personal use only.
                        </p>
                    </footer>
                </div>
            </div>
        </>
    );
}

// Extend the Window interface to include adsbygoogle
declare global {
    interface Window {
        adsbygoogle: any;
    }
}
