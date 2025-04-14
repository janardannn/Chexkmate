"use client";

// logger
import "@/utils/console-logger.util"


import { useState } from "react";

import Analysis from "@/components/analysis";
import Chessboard from "@/components/chessboard/chessboard";
import GamePGN from "@/components/game-pgn";
import Header from "@/components/header";

import { useStockFish } from "@/hooks/use-stockfish";
import { useChessStore } from "@/store/chess-store";

export default function Home() {
  let style = "BasicBoard";
  let size = 720;

  const { analyzePosition } = useStockFish({ depth: 18 });

  const [descriptiveMove, setDescriptiveMove] = useState<string>("");

  const engineEval = useChessStore((state) => state.engineEval);
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-[1260px] h-[910px] shadow-lg">
        <div className="m-8">
          <div>
            <Header />
          </div>

          <div className="flex space-x-8">
            <div className="p-[1px]">
              <Chessboard
                id={style}
                size={size}
                analyzePosition={analyzePosition}
                setDescriptiveMove={setDescriptiveMove}
              />
            </div>

            <div className="space-y-4">
              <GamePGN />
              <Analysis bestMove={descriptiveMove || engineEval.bestMove} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
