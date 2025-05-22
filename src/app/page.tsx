"use client";

import { parseStatement } from "@/actions/parseStatement";
import { useState } from "react";
import {
    FiUploadCloud,
    FiDownload,
    FiFile,
    FiAlertCircle,
    FiCheckCircle,
} from "react-icons/fi";

export default function Home() {
    const [file, setFile] = useState<File | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [csvData, setCsvData] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null;
        setFile(selectedFile);
        setError(null);
        setCsvData(null);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            setFile(e.dataTransfer.files[0]);
            setError(null);
            setCsvData(null);
        }
    };

    const convertToCsv = async () => {
        if (!file) {
            setError("Please select a file first");
            return;
        }

        setIsProcessing(true);
        setError(null);

        try {
            const statement = await parseStatement(await file.arrayBuffer());
            const transactions = statement.transactions
                .map((transaction) => {
                    const row = {
                        date: transaction.date,
                        details: `${transaction.details} ${transaction.descriptions.join(" ")}`,
                        amount: `${transaction.sign}${transaction.amount}`,
                        balance: transaction.balance,
                    };

                    // remove extra spaces in details
                    row.details = row.details.trim().replace(/\s+/g, " ");

                    return Object.values(row)
                        .map((value) => `"${value}"`)
                        .join(",");
                })
                .join("\n");
            const header = `"Date","Details","Amount","Balance"`;

            setCsvData(`${header}\n${transactions}`);
        } catch (err) {
            setError(
                "Failed to process the file. Please make sure it's a valid Maybank statement."
            );
            console.error(err);
        } finally {
            setIsProcessing(false);
        }
    };

    const downloadCsv = () => {
        if (!csvData) return;

        const blob = new Blob([csvData], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "maybank_transactions.csv";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <div className="container mx-auto px-4 py-12 max-w-5xl">
                <header className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-3">
                        <span className="text-yellow-500">Maybank</span>{" "}
                        Statement Converter
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Convert your Maybank statements to CSV format for easy
                        import into your financial tools
                    </p>
                </header>

                <main className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
                    <div className="p-8">
                        <div
                            className={`mb-8 border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                                isDragging
                                    ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20"
                                    : "border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/30"
                            }`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            <div className="flex flex-col items-center justify-center">
                                <FiUploadCloud className="w-12 h-12 text-yellow-500 mb-4" />

                                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-2">
                                    {file
                                        ? "File selected"
                                        : "Drag and drop your statement file"}
                                </h3>

                                {file && (
                                    <div className="flex items-center mt-2 mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg w-full max-w-md">
                                        <FiFile className="text-gray-500 mr-3 flex-shrink-0" />
                                        <span className="text-sm text-gray-600 dark:text-gray-300 truncate">
                                            {file.name}
                                        </span>
                                        <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                                            ({(file.size / 1024).toFixed(1)} KB)
                                        </span>
                                    </div>
                                )}

                                {!file && (
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                                        or
                                    </p>
                                )}

                                <div className="mt-2">
                                    <label
                                        className={`relative inline-flex items-center px-6 py-3 ${
                                            file
                                                ? "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                                                : "bg-yellow-500 hover:bg-yellow-600 text-white"
                                        } rounded-lg transition-colors cursor-pointer font-medium text-sm`}
                                    >
                                        <span className="z-10 relative">
                                            {file
                                                ? "Change file"
                                                : "Select statement file"}
                                        </span>
                                        <input
                                            type="file"
                                            accept=".pdf"
                                            onChange={handleFileChange}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        />
                                    </label>
                                </div>

                                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                                    PDF only
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                            <button
                                onClick={convertToCsv}
                                disabled={!file || isProcessing}
                                className={`w-full sm:w-auto px-6 py-3 rounded-lg font-medium transition-all ${
                                    !file || isProcessing
                                        ? "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                                        : "bg-yellow-500 hover:bg-yellow-600 text-white shadow-md hover:shadow-lg"
                                }`}
                            >
                                {isProcessing ? (
                                    <span className="flex items-center justify-center">
                                        <svg
                                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                        Processing...
                                    </span>
                                ) : (
                                    "Convert to CSV"
                                )}
                            </button>

                            {csvData && (
                                <button
                                    onClick={downloadCsv}
                                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
                                >
                                    <FiDownload />
                                    Download CSV
                                </button>
                            )}
                        </div>

                        {error && (
                            <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start">
                                <FiAlertCircle className="text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                                <p className="text-red-700 dark:text-red-300 text-sm">
                                    {error}
                                </p>
                            </div>
                        )}

                        {csvData && !error && (
                            <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-start">
                                <FiCheckCircle className="text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                                <div>
                                    <p className="text-green-700 dark:text-green-300 text-sm font-medium">
                                        Conversion successful!
                                    </p>
                                    <p className="text-green-600 dark:text-green-400 text-xs mt-1">
                                        Your statement has been converted and is
                                        ready to download.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {csvData && (
                        <div className="px-8 pb-8">
                            <div className="mt-4 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                                <div className="bg-gray-100 dark:bg-gray-900 px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                                    <h3 className="font-medium text-gray-700 dark:text-gray-300">
                                        Preview
                                    </h3>
                                </div>
                                <div className="p-4 max-h-48 overflow-auto bg-gray-50 dark:bg-gray-800/50">
                                    <pre className="text-xs text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
                                        {csvData
                                            .split("\n")
                                            .slice(0, 10)
                                            .join("\n")}
                                        {csvData.split("\n").length > 10
                                            ? "\n..."
                                            : ""}
                                    </pre>
                                </div>
                            </div>
                        </div>
                    )}
                </main>

                <footer className="mt-12 text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        This tool does not store your files.
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                        Not affiliated with Maybank. For personal use only.
                    </p>
                </footer>
            </div>
        </div>
    );
}
