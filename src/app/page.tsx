"use client";

// logger
import "@/utils/console-logger.util"


import { useEffect, useState } from "react";

import Analysis from "@/components/analysis";
import Chessboard from "@/components/chessboard/chessboard";
import GamePGN from "@/components/game-pgn";
import Header from "@/components/header";

import { useStockFish } from "@/hooks/use-stockfish";
import { useChessStore } from "@/store/chess-store";
import { getBoardSize } from "@/utils/get-board-size";

export default function Home() {
  let style = "BasicBoard";
  // let size = 720;

  const [boardSize, setBoardSize] = useState(getBoardSize(720)); // default fallback val to remove window not defined error

  useEffect(() => {
    const handleResize = () => {
      setBoardSize(getBoardSize(window.innerWidth));
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const { analyzePosition } = useStockFish({ depth: 18 });

  const [descriptiveMove, setDescriptiveMove] = useState<string>("");

  const engineEval = useChessStore((state) => state.engineEval);
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="max-w-[1260px] w-full h-full p-8">
        <Header />
        <div className="flex flex-col not-mobile:flex-row not-mobile:space-x-8">
          <div className="flex justify-center">
            <Chessboard
              id={style}
              size={boardSize}
              analyzePosition={analyzePosition}
              setDescriptiveMove={setDescriptiveMove}
            />
          </div>
          <div className="flex flex-col justify-center items-center space-y-4 mt-8 not-mobile:mt-0 w-full">
            <GamePGN boardSize={boardSize} />
            <Analysis boardSize={boardSize} bestMove={descriptiveMove || engineEval.bestMove} />
          </div>
        </div>
      </div>
    </div>
  );

}
