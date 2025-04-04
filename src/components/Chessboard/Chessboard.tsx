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
}

const Chessboard: React.FC<ChessboardProps> = ({ id, size }) => {
    const [game, setGame] = useState(new Chess());

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
            // analyzePosition(newGame.fen());
            // console.log("Best move:", bestMove);

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
            />
            <StockfishDebug />
        </div>
    );
};

export default Chessboard;
