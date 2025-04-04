"use client";

import { Chessboard as ChessboardComponent } from "react-chessboard";
import React, { useState } from "react";
import { Chess } from "chess.js";


import StockfishDebug from "./testStockFish";
// // test stockfish hook
// import { useStockFish } from "@/hooks/useStockFish";

interface ChessboardProps {
    id: string;
    size: number;

    // temp
    bestMove: string;
    analyzePosition: (fen: string, markBestMove?: (move: string) => void) => void;

    setDescriptiveMove: (move: string) => void;
}

const Chessboard: React.FC<ChessboardProps> = ({ id, size, bestMove, analyzePosition, setDescriptiveMove }) => {
    const [game, setGame] = useState(new Chess());

    //stockfish hook
    // const { bestMove, analyzePosition } = useStockFish();

    const [highlightMove, setHighlightMove] = useState<{ from: string; to: string }>();

    const onDrop = (src: string, tgt: string): boolean => {
        const newGame = new Chess(game.fen());

        let move;
        try {
            move = newGame.move({
                from: src,
                to: tgt,
                promotion: "q",
            });
        } catch (e) {
            console.error("Illegal move:", { from: src, to: tgt });
            return false;
        }

        if (!move) {
            console.error("Illegal move:", { from: src, to: tgt });
            return false;
        }

        setGame((prev) => {
            if (!move) return prev;

            console.log(newGame.fen())

            // Analyze the position with Stockfish
            analyzePosition(newGame.fen(), (move) => {
                const parsedMove = parseBestMove(move);
                if (parsedMove) {
                    setHighlightMove(parsedMove);
                    const desc = getDescriptiveMove(newGame.fen(), move);
                    if (desc) {
                        setDescriptiveMove(desc);
                    }
                }
            });

            return newGame;
        });

        return true;

    };

    return (
        <div className="w-[720px] h-[720px]">
            <ChessboardComponent
                id={id}
                boardWidth={size}
                position={game.fen()}
                onPieceDrop={onDrop}
                customSquareStyles={{
                    ...(highlightMove && {
                        [highlightMove.from]: {
                            backgroundColor: "rgba(90, 60, 180, 0.4)", // Blue with a hint of purple
                        },
                        [highlightMove.to]: {
                            backgroundColor: "rgba(120, 70, 200, 0.5)", // More vibrant bluish-purple
                        },
                    }),
                }}
            />
            {/* <StockfishDebug /> */}
        </div>
    );
};

export default Chessboard;


function parseBestMove(move: string): { from: string; to: string } | null {
    const cleaned = move.replace(/^[NBRQK]/, ""); // remove leading piece letter
    if (cleaned.length < 4) return null;

    const from = cleaned.slice(0, 2);
    const to = cleaned.slice(2, 4);
    return { from, to };
}

function getDescriptiveMove(fen: string, uciMove: string): string | null {
    const chess = new Chess(fen);
    const move = chess.move(uciMove, { sloppy: true, verbose: true } as any);

    if (!move) return null;

    // const color = move.color === "w" ? "White" : "Black";
    // return `${color} - ${move.san}`;
    return `${move.san}`;
}
