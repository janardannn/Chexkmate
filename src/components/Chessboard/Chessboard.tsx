"use client";

import { Chessboard as ChessboardComponent } from "react-chessboard";
import React, { useState } from "react";
import { Chess } from "chess.js";

interface ChessboardProps {
    id: string;
    size: number;
}

const Chessboard: React.FC<ChessboardProps> = ({ id, size }) => {
    const [game, setGame] = useState(new Chess());

    const onDrop = (src: string, tgt: string) => {
        const newGame = new Chess(game.fen());
        // console.log(newGame.fen())

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
        </div>
    );
};

export default Chessboard;
