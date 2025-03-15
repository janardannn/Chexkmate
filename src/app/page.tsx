"use client";

import Analysis from "@/components/Analysis";
import Chessboard from "@/components/Chessboard/Chessboard";
import GamePGN from "@/components/GamePGN";
import Header from "@/components/Header";


export default function Home() {
  let style = "BasicBoard";
  let size = 720;

  return (

    <div className="w-screen h-screen flex justify-center items-center" >
      {/*parent div to center everything*/}

      <div className="w-[1230px] h-[910px] shadow-lg">
        <div className="m-8">
          <div >
            <Header />
          </div>

          <div className="flex space-x-8">
            <div className="border-3 border-black rounded-md p-[1px]">
              <Chessboard id={style} size={size} />
            </div>

            <div className="space-y-4">
              <GamePGN />
              <Analysis />
            </div>

          </div>
        </div>
      </div>

    </div >
  );
}
