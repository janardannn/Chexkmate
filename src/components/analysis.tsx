"use client";

import React from "react";

interface AnalysisProps {
    bestMove: string;
}

export default function Analysis({ bestMove }: AnalysisProps) {
    return (
        <div className="border-2 border-black w-[380px] h-[651px] p-2 rounded-sm">
            <p className="text-3xl font-paytone">Game Analysis</p>
            <div className="mt-6 text-xl font-outfit flex ">
                Best Move: <div className="ml-2 font-bold">{bestMove}</div>
            </div>
        </div>
    );
}