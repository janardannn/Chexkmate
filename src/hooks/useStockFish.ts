import { useEffect, useState } from "react";
import { Chess } from "chess.js";
import { initStockfish, sendCommand } from "@/utils/stockfish";

export function useStockFish() {
    // const [game, setGame] = useState(new Chess());
    // const [evaluation, setEvaluation] = useState<string>("");
    const [bestMove, setBestMove] = useState<string>("");

    useEffect(() => {
        const worker = initStockfish();
        sendCommand("uci", (response: string) => (console.log(response)));
        sendCommand("isready", (response: string) => (console.log(response)));

        return () => {
            if (worker) {
                worker.terminate();
            }
        }
    }, []);

    const analyzePosition = (fen: string, markBestMove?: (move: string) => void) => {
        sendCommand(`position fen ${fen}`);
        sendCommand("go depth 20", (response: string) => {
            const lines = response.split("\n");
            const bestMoveLine = lines.find(line => line.startsWith("bestmove"));
            if (bestMoveLine) {
                const move = bestMoveLine.split(" ")[1];
                console.log("Best move: ", move);
                setBestMove(move);
                if (markBestMove) {
                    markBestMove(move);
                }
            }
        });
    }

    return { bestMove, analyzePosition };
}

