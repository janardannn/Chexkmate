import { useEffect, useState } from "react";
import { Chess } from "chess.js";
import { initStockfish, sendCommand } from "@/utils/stockfish";

import { UseStockfishProps } from "../types/UseStockFish.type";

export function useStockFish({ depth }: UseStockfishProps) {
    // const [game, setGame] = useState(new Chess());
    // const [evaluation, setEvaluation] = useState<string>("");
    const [bestMove, setBestMove] = useState<string>("");
    const [otherMoves, setOtherMoves] = useState<string[]>([]);

    useEffect(() => {
        const worker = initStockfish();
        sendCommand("uci", (response: string) => (console.log("[Stockfish] " + response)));
        sendCommand("isready", (response: string) => (console.log("[Stockfish] " + response)));

        // multiple lines 
        // sendCommand("setoption name MultiPV value 3");
        // console.log("Stockfish initialized with depth: " + depth + " and MultiPV: 3");

        return () => {
            if (worker) {
                worker.terminate();
            }
        }
    }, []);

    const analyzePosition = (fen: string, markBestMove?: (move: string) => void) => {
        sendCommand(`position fen ${fen}`);
        sendCommand(`go depth ${depth}`, (response: string) => {
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


const parseMoves = (response: string) => {
    const lines = response.split("\n");
    const bestMoveLine = lines.find(line => line.startsWith("bestmove"));
    if (bestMoveLine) {
        const move = bestMoveLine.split(" ")[1];
        return move;
    }
    return "";
}