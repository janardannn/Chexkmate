"use client";

import Analysis from "@/components/Analysis";
import Chessboard from "@/components/Chessboard/Chessboard";
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

          <div className="flex">
            <Chessboard id={style} size={size} />
            <div className="m-4" />
            <Analysis />
          </div>
        </div>
      </div>

    </div >
  );
}
