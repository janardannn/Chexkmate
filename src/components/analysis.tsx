"use client";

import { AnalysisProps } from "@/types/analysis.type";
import { useEffect, useState } from "react";

export default function Analysis({ bestMove, boardSize }: AnalysisProps) {
    const height = boardSize * 0.878;

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth <= 900);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);


    return (
        <div
            className={`border-2 border-black not-mobile:w-full p-2 rounded-sm`}
            style={{
                height,
                width: isMobile ? `${boardSize}px` : "100%",
            }}
        >
            <p className="text-3xl font-paytone">Game Analysis</p>
            <div className="mt-6 text-xl font-outfit flex">
                Best Move: <div className="ml-2 font-bold">{bestMove}</div>
            </div>
        </div>
    );
}