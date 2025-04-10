import { useChessStore } from "@/store/useChessStore";

export default function EvalBar({ boardOrientation }: { boardOrientation: "white" | "black" }) {
    const engineEval = useChessStore((state) => state.engineEval);
    const { type, value } = engineEval;

    const isMate = type === "mate";

    const evalValue = isMate ? (value > 0 ? 10 : -10) : value;
    const clampEval = Math.max(Math.min(evalValue, 10), -10);
    const whiteHeight = ((clampEval + 10) / 20) * 100;
    const blackHeight = 100 - whiteHeight;

    const displayEval =
        isMate
            ? `#${Math.abs(value)}`
            : value > 9.5
                ? "> 10+"
                : value < -9.5
                    ? "> -10"
                    : value.toFixed(1);

    const sections = boardOrientation === "white"
        ? [
            { height: blackHeight, bg: "bg-black", textColor: "text-white", isActive: evalValue < 0, align: "items-start", textAlign: "mt-1" },
            { height: whiteHeight, bg: "bg-white", textColor: "text-black", isActive: evalValue >= 0, align: "items-end", textAlign: "mb-1" },
        ]
        : [
            { height: whiteHeight, bg: "bg-white", textColor: "text-black", isActive: evalValue >= 0, align: "items-start", textAlign: "mt-1" },
            { height: blackHeight, bg: "bg-black", textColor: "text-white", isActive: evalValue < 0, align: "items-end", textAlign: "mb-1" },
        ];

    return (
        <div className="relative h-[670px] w-[55px] border-2 border-black rounded-sm overflow-hidden flex flex-col">
            {sections.map(({ height, bg, textColor, isActive, align, textAlign }, idx) => (
                <div
                    key={idx}
                    style={{ height: `${height}%` }}
                    className={`${bg} flex ${align} justify-center transition-all duration-300`}
                >
                    {isActive && height > 15 && (
                        <span className={`${textColor} text-sm ${textAlign} font-semibold select-none`}>
                            {displayEval}
                        </span>
                    )}
                </div>
            ))}
        </div>
    );
}
