import { useEffect } from "react";
import { useChessStore } from "@/store/useChessStore";
import { initStockfish, sendCommand } from "@/utils/stockfish";
import { UseStockfishProps } from "../types/UseStockFish.type";

export function useStockFish({ depth }: UseStockfishProps) {
    const setEngineEval = useChessStore((state) => state.setEngineEval);

    useEffect(() => {
        const worker = initStockfish();
        sendCommand("uci", (res: string) => console.log("[Stockfish] " + res));
        sendCommand("isready", (res: string) => console.log("[Stockfish] " + res));

        return () => {
            if (worker) worker.terminate();
        };
    }, []);

    const analyzePosition = (fen: string, highlightMove?: (move: string) => void) => {
        sendCommand(`position fen ${fen}`);
        sendCommand(`go depth ${depth}`, (response: string) => {

            // log stockfish output
            // console.log(new Date().toLocaleString() + " [Stockfish] " + response);


            const evalResult = parseEvalAndBestMove(response);
            if (!evalResult) return;

            const { type, value, bestMove } = evalResult;

            setEngineEval({
                type,
                value: type === "cp" ? value / 100 : value,
                bestMove,
            });

            if (highlightMove) highlightMove(bestMove);
        });
    };

    return { analyzePosition };
}

const parseEvalAndBestMove = (
    response: string
): { type: "cp" | "mate"; value: number; bestMove: string } | null => {
    const lines = response.split("\n").reverse();
    const infoLine = lines.find(line =>
        line.includes("score cp") || line.includes("score mate")
    );

    if (!infoLine) return null;

    const parts = infoLine.trim().split(/\s+/);
    const scoreIndex = parts.indexOf("score");
    const pvIndex = parts.indexOf("pv");

    if (scoreIndex === -1 || pvIndex === -1 || !parts[pvIndex + 1]) return null;

    const type = parts[scoreIndex + 1] as "cp" | "mate";
    const value = parseInt(parts[scoreIndex + 2], 10);
    const bestMove = parts[pvIndex + 1];

    return { type, value, bestMove };
};



// import { useEffect } from "react";
// import { useChessStore } from "@/store/useChessStore";
// import { initStockfish, sendCommand } from "@/utils/stockfish";
// import { UseStockfishProps } from "../types/UseStockFish.type";
// import { time } from "console";

// export function useStockFish({ depth }: UseStockfishProps) {
//     const engineEval = useChessStore((state) => state.engineEval);
//     const setEngineEval = useChessStore((state) => state.setEngineEval);

//     // to avoid some stale state issue
//     const partialUpdate: Partial<typeof engineEval> = {};



//     useEffect(() => {
//         const worker = initStockfish();
//         sendCommand("uci", (res: string) => console.log("[Stockfish] " + res));
//         sendCommand("isready", (res: string) => console.log("[Stockfish] " + res));

//         return () => {
//             if (worker) worker.terminate();
//         };
//     }, []);

//     const analyzePosition = (fen: string, highlightMove?: (move: string) => void) => {
//         sendCommand(position fen ${fen});
//         sendCommand(go depth ${depth}, (response: string) => {
//             const bestMove = parseBestMove(response);
//             const evalInfo = parseEval(response);


//             // console.log(new Date().toLocaleString() + " [Stockfish] " + response);


//             if (evalInfo) {
//                 partialUpdate.type = evalInfo.type;
//                 if (partialUpdate.type != "mate") partialUpdate.value = evalInfo.value / 100;

//                 // console.log(engineEval);
//             }

//             if (bestMove) {
//                 partialUpdate.bestMove = bestMove;
//                 setEngineEval(partialUpdate as typeof engineEval);

//                 if (highlightMove) highlightMove(bestMove);

//                 // console.log(engineEval);
//             }

//             // if (bestMove && evalInfo) {
//             //     console.log("type: " + evalInfo.type);
//             //     console.log("value: " + evalInfo.value);
//             //     console.log("bestMove: " + bestMove);

//             //     setEngineEval({
//             //         type: evalInfo.type,
//             //         value: evalInfo.value,
//             //         bestMove: bestMove,
//             //     });
//             // }
//             // if (highlightMove) {
//             //     highlightMove(bestMove);
//             // }
//         });
//     };

//     return { analyzePosition };
// }


// const parseBestMove = (response: string) => {
//     const bestMoveLine = response.split("\n").find((line) => line.startsWith("bestmove"));
//     if (!bestMoveLine) return "";
//     console.log("[Stockfish] " + bestMoveLine);
//     return bestMoveLine.split(" ")[1]; // e.g. e2e4
// };

// const parseEval = (response: string): { type: "cp" | "mate"; value: number } => {
//     const lines = response.split("\n");
//     const infoLine = lines
//         .reverse()
//         .find((line) => line.includes("score cp") || line.includes("score mate"));

//     if (!infoLine) return null;

//     const parts = infoLine.split(" ");
//     const scoreIndex = parts.indexOf("score");


//     if (scoreIndex !== -1 && parts[scoreIndex + 1] === "mate") {
//         // console.log("mate" + parts[scoreIndex + 2]);
//         return { type: "mate", value: parseInt(parts[scoreIndex + 2], 10) };
//     }

//     // console.log("cp" + parts[scoreIndex + 2]);
//     return { type: "cp", value: parseInt(parts[scoreIndex + 2], 10) };

// };