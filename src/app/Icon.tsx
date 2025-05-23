export default function MaybankStatementConverterIcon({
    width = 64,
    height = 64,
    className = "",
}: {
    width?: number;
    height?: number;
    className?: string;
}) {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* Main document */}
            <rect
                x="12"
                y="12"
                width="28"
                height="36"
                rx="2"
                fill="#F5F5F5"
                stroke="#333333"
                strokeWidth="2"
            />

            {/* Maybank yellow accent */}
            <rect x="12" y="12" width="28" height="6" rx="2" fill="#FFC629" />

            {/* Minimal document lines */}
            <line
                x1="18"
                y1="26"
                x2="34"
                y2="26"
                stroke="#666666"
                strokeWidth="2"
            />
            <line
                x1="18"
                y1="34"
                x2="34"
                y2="34"
                stroke="#666666"
                strokeWidth="2"
            />

            {/* Simple conversion arrow */}
            <path
                d="M40 32L52 32M52 32L46 26M52 32L46 38"
                stroke="#333333"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
