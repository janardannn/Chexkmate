"use client";

import { useState } from "react";

import Analysis from "@/components/Analysis";
import Chessboard from "@/components/Chessboard/Chessboard";
import GamePGN from "@/components/GamePGN";
import Header from "@/components/Header";

import { useStockFish } from "@/hooks/useStockFish";


export default function Home() {
  let style = "BasicBoard";
  let size = 720;

  const { bestMove, analyzePosition } = useStockFish();
  const [descriptiveMove, setDescriptiveMove] = useState<string>("");

  return (

    <div className="w-screen h-screen flex justify-center items-center" >
      {/*parent div to center everything*/}

      <div className="w-[1260px] h-[910px] shadow-lg">
        <div className="m-8">
          <div >
            <Header />
          </div>

          <div className="flex space-x-8">
            <div className="p-[1px]">
              <Chessboard id={style} size={size} bestMove={bestMove} analyzePosition={analyzePosition} setDescriptiveMove={setDescriptiveMove} />
            </div>

            <div className="space-y-4">
              <GamePGN />
              <Analysis bestMove={descriptiveMove} />
            </div>

          </div>
        </div>
      </div>

    </div >
  );
}
