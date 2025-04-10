import { useChessStore } from "@/store/useChessStore";

export default function EvalBar() {
    const engineEval = useChessStore((state) => state.engineEval);
    const { type, value } = engineEval;

    const isMate = type === "mate";

    const evalValue = isMate
        ? value > 0
            ? 10
            : -10
        : value;

    const clampEval = Math.max(Math.min(evalValue, 10), -10);
    const whiteHeight = ((clampEval + 10) / 20) * 100;

    const displayEval =
        isMate
            ? `#${Math.abs(value)}`
            : value > 9.5
                ? "+10"
                : value < -9.5
                    ? "-10"
                    : value.toFixed(1);

    return (
        <div className="relative h-[670px] w-[55px] border-2 border-black rounded-sm overflow-hidden flex flex-col">
            {/* White section */}
            <div
                style={{ height: `${whiteHeight}%` }}
                className="bg-white flex items-end justify-center transition-all duration-300"
            >
                {whiteHeight > 15 && evalValue >= 0 && (
                    <span className="text-black text-sm mb-1 font-semibold select-none">
                        {displayEval}
                    </span>
                )}
            </div>

            {/* Black section */}
            <div
                style={{ height: `${100 - whiteHeight}%` }}
                className="bg-black flex items-start justify-center transition-all duration-300"
            >
                {whiteHeight < 85 && evalValue < 0 && (
                    <span className="text-white text-sm mt-1 font-semibold select-none">
                        {displayEval}
                    </span>
                )}
            </div>
        </div>
    );
}
