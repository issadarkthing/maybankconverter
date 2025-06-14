"use client";
import {
    FiUploadCloud,
    FiDownload,
    FiFile,
    FiAlertCircle,
    FiCheckCircle,
    FiGrid,
} from "react-icons/fi";
import { parseStatement } from "@/utils/parseStatement";
import { useState, useEffect, useRef } from "react";
import * as XLSX from "xlsx";
import { sendGTMEvent } from "@next/third-parties/google";

export function FileConverter() {
    const [file, setFile] = useState<File | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [csvData, setCsvData] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [transactions, setTransactions] = useState<any[]>([]);

    // Use ref to track if ads have been initialized
    const adsInitialized = useRef(false);

    // Initialize Google AdSense when component mounts - only once
    useEffect(() => {
        // Only run this once and only in the browser
        if (typeof window !== "undefined" && !adsInitialized.current) {
            try {
                // Only push if window.adsbygoogle exists and there are actual adsbygoogle ins elements
                if (
                    window.adsbygoogle &&
                    document.querySelectorAll(".adsbygoogle").length > 0
                ) {
                    // Check if any ins elements don't have data-ad-status
                    const uninitializedAds = document.querySelectorAll(
                        ".adsbygoogle:not([data-ad-status])"
                    );

                    if (uninitializedAds.length > 0) {
                        (window.adsbygoogle = window.adsbygoogle || []).push(
                            {}
                        );
                    }
                }

                adsInitialized.current = true;
            } catch (error) {
                console.error("AdSense error:", error);
            }
        }
    }, []);

    // Rest of the component remains unchanged
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        sendGTMEvent({ event: "file_selected" });
        const selectedFile = e.target.files?.[0] || null;
        setFile(selectedFile);
        setError(null);
        setCsvData(null);
        setTransactions([]);
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
            setTransactions([]);
        }
    };

    const convertToCsv = async () => {
        sendGTMEvent({ event: "convert_statement" });

        if (!file) {
            setError("Please select a file first");
            return;
        }

        setIsProcessing(true);
        setError(null);

        try {
            const statement = await parseStatement(await file.arrayBuffer());
            const parsedTransactions = statement.transactions.map(
                (transaction) => {
                    const row = {
                        date: transaction.date,
                        details:
                            `${transaction.details} ${transaction.descriptions.join(" ")}`
                                .trim()
                                .replace(/\s+/g, " "),
                        amount: `${transaction.sign}${transaction.amount}`,
                        balance: transaction.balance,
                    };
                    return row;
                }
            );

            setTransactions(parsedTransactions);

            const csvRows = parsedTransactions
                .map((row) =>
                    Object.values(row)
                        .map((value) => `"${value}"`)
                        .join(",")
                )
                .join("\n");

            const header = `"Date","Details","Amount","Balance"`;
            setCsvData(`${header}\n${csvRows}`);
            sendGTMEvent({ event: "conversion_success" });
        } catch (err) {
            setError(
                "Failed to process the file. Please make sure it's a valid Maybank statement."
            );
            console.error(err);
            sendGTMEvent({ event: "conversion_error", error: err });
        } finally {
            setIsProcessing(false);
        }
    };

    const downloadCsv = () => {
        sendGTMEvent({ event: "download_csv" });

        if (!csvData || !file) return;

        // Extract filename without extension
        const fileNameWithoutExtension = file.name
            .split(".")
            .slice(0, -1)
            .join(".");

        const blob = new Blob([csvData], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `maybankconverter_${fileNameWithoutExtension}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const downloadExcel = () => {
        sendGTMEvent({ event: "download_excel" });

        if (transactions.length === 0 || !file) return;

        // Extract filename without extension
        const fileNameWithoutExtension = file.name
            .split(".")
            .slice(0, -1)
            .join(".");

        // Create worksheet
        const ws = XLSX.utils.json_to_sheet(transactions);

        // Create workbook
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Transactions");

        // Generate Excel file
        XLSX.writeFile(wb, `maybankconverter_${fileNameWithoutExtension}.xlsx`);
    };

    return (
        <>
            {/* You can add an AdSense ins element here if needed */}
            <div className="p-8">
                <div
                    className={`mb-8 border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                        isDragging
                            ? "border-yellow-600 bg-yellow-50 dark:bg-yellow-900/30"
                            : "border-gray-400 dark:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700/40"
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <div className="flex flex-col items-center justify-center">
                        <FiUploadCloud className="w-12 h-12 text-yellow-500 mb-4" />

                        <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-2">
                            {file
                                ? "File selected"
                                : "Drag and drop your statement file"}
                        </h3>

                        {file && (
                            <div className="flex items-center mt-2 mb-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg w-full max-w-md">
                                <FiFile className="text-gray-600 mr-3 flex-shrink-0" />
                                <span className="text-sm text-gray-700 dark:text-gray-200 truncate">
                                    {file.name}
                                </span>
                                <span className="text-xs text-gray-600 ml-2 flex-shrink-0">
                                    ({(file.size / 1024).toFixed(1)} KB)
                                </span>
                            </div>
                        )}

                        {!file && (
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                                or
                            </p>
                        )}

                        <div className="mt-2">
                            <label
                                className={`relative inline-flex items-center px-6 py-3 ${
                                    file
                                        ? "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                                        : "bg-yellow-500 hover:bg-yellow-700 text-black"
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

                        <p className="mt-2 text-xs text-gray-600 dark:text-gray-300">
                            PDF only
                        </p>
                    </div>
                </div>

                {/* Rest of your component remains unchanged */}
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <button
                        onClick={convertToCsv}
                        disabled={!file || isProcessing}
                        className={`w-full sm:w-auto px-6 py-3 rounded-lg font-medium transition-all ${
                            !file || isProcessing
                                ? "bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-300 cursor-not-allowed"
                                : "bg-yellow-400 hover:bg-yellow-700 text-black shadow-md hover:shadow-lg"
                        }`}
                    >
                        {isProcessing ? (
                            <span className="flex items-center justify-center">
                                {/* Spinner unchanged */}
                                Processing...
                            </span>
                        ) : (
                            "Convert Statement"
                        )}
                    </button>

                    {csvData && (
                        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                            <button
                                onClick={downloadCsv}
                                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-green-700 hover:bg-green-800 text-white rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
                            >
                                <FiDownload />
                                Download CSV
                            </button>

                            <button
                                onClick={downloadExcel}
                                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
                            >
                                <FiGrid />
                                Download Excel
                            </button>
                        </div>
                    )}
                </div>

                {error && (
                    <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg flex items-start">
                        <FiAlertCircle className="text-red-600 mt-0.5 mr-3 flex-shrink-0" />
                        <p className="text-red-800 dark:text-red-200 text-sm">
                            {error}
                        </p>
                    </div>
                )}

                {csvData && !error && (
                    <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-lg flex items-start">
                        <FiCheckCircle className="text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                        <div>
                            <p className="text-green-800 dark:text-green-200 text-sm font-medium">
                                Conversion successful!
                            </p>
                            <p className="text-green-700 dark:text-green-300 text-xs mt-1">
                                Your statement has been converted and is ready
                                to download as CSV or Excel.
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {csvData && (
                <div className="px-8 pb-8">
                    <div className="mt-4 border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                        <div className="bg-gray-100 dark:bg-gray-900 px-4 py-2 border-b border-gray-300 dark:border-gray-600">
                            <h3 className="font-medium text-gray-800 dark:text-gray-200">
                                Preview
                            </h3>
                        </div>
                        <div className="p-4 max-h-48 overflow-auto bg-gray-50 dark:bg-gray-800/50">
                            <pre className="text-xs text-gray-700 dark:text-gray-200 whitespace-pre-wrap">
                                {csvData.split("\n").slice(0, 10).join("\n")}
                                {csvData.split("\n").length > 10 ? "\n..." : ""}
                            </pre>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

declare global {
    interface Window {
        adsbygoogle: any;
    }
}
