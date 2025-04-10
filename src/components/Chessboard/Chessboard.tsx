"use client";

import { Chessboard as ChessboardComponent } from "react-chessboard";
import React, { useState, useRef } from "react";
import { Chess } from "chess.js";


import StockfishDebug from "./testStockFish";
import EvalBar from "./EvalBar";
import FlipBoard from "./FlipBoard";
import { BoardOrientation } from "react-chessboard/dist/chessboard/types";
import { EvalBarProps } from "@/types/EvalBar.type";
import { ChessboardProps } from "@/types/Chessboard.type";
// // test stockfish hook
// import { useStockFish } from "@/hooks/useStockFish";



const Chessboard: React.FC<ChessboardProps> = ({ id, size, bestMove, analyzePosition, setDescriptiveMove }) => {
    // const [game, setGame] = useState(new Chess());

    const gameRef = useRef(new Chess());
    const [fen, setFen] = useState(gameRef.current.fen());

    const [boardOrientation, setBoardOrientation] = useState<BoardOrientation>("white");
    const [evaluation, setEvaluation] = useState<EvalBarProps>({
        type: "cp",
        value: 0
    }
    );
    //stockfish hook
    // const { bestMove, analyzePosition } = useStockFish();

    const [highlightMove, setHighlightMove] = useState<{ from: string; to: string }>();

    const onDrop = (src: string, tgt: string): boolean => {
        const game = gameRef.current;
        const move = game.move({ from: src, to: tgt, promotion: "q" });

        if (!move) return false;

        setFen(game.fen()); // triggers board update

        analyzePosition(game.fen(), (move) => {
            const parsedMove = parseBestMove(move);
            if (parsedMove) {
                setHighlightMove(parsedMove);
                const desc = getDescriptiveMove(game.fen(), move);
                if (desc) setDescriptiveMove(desc);
            }
        });

        return true;
    };


    return (
        <div className="w-[780px] h-[720px] flex gap-x-2">

            <div className="flex flex-col space-y-2">
                <EvalBar
                    type={evaluation.type}
                    value={evaluation.value}
                />
                <FlipBoard
                    boardOrientation={boardOrientation}
                    setBoardOrientation={setBoardOrientation}
                    size={30}
                />
            </div>


            <ChessboardComponent
                boardOrientation={boardOrientation}
                id={id}
                boardWidth={size}
                position={fen}
                onPieceDrop={onDrop}

                // blue deep
                customDarkSquareStyle={{
                    backgroundColor: "#4a6699", // Muted deep blue
                }}
                customLightSquareStyle={{
                    backgroundColor: "#ecead0", // Warm ivory
                }}

                //blue light
                // customDarkSquareStyle={{
                //     backgroundColor: "#5a76a9", // Slightly lighter deep blue
                // }}
                // customLightSquareStyle={{
                //     backgroundColor: "#ecead0", // Warm ivory (unchanged)
                // }}

                // chess com like square colors
                // customDarkSquareStyle={{
                //     backgroundColor: "#4A7729", // Classic deep tournament green
                // }}
                // customLightSquareStyle={{
                //     backgroundColor: "#ECECD2", // Off-white, slightly warm
                // }}


                // yellow and orange
                // customSquareStyles={{
                //     ...(highlightMove && {
                //         [highlightMove.from]: {
                //             backgroundColor: "rgba(255, 215, 0, 0.6)", // Warm golden yellow
                //         },
                //         [highlightMove.to]: {
                //             backgroundColor: "rgba(255, 165, 0, 0.6)", // Vibrant orange
                //         },
                //     }),
                // }}
                customSquareStyles={{
                    ...(highlightMove && {
                        [highlightMove.from]: {
                            backgroundColor: "rgba(50, 205, 50, 0.35)", // Slightly muted LimeGreen
                        },
                        [highlightMove.to]: {
                            backgroundColor: "rgba(34, 139, 34, 0.45)", // Softer ForestGreen
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
