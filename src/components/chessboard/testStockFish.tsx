"use client";

import { useEffect } from "react";
import { initStockfish, sendCommand } from "@/utils/stockfish";

export default function StockfishDebug() {
    useEffect(() => {
        const worker = initStockfish();

        sendCommand("uci");
        sendCommand("isready");

        return () => {
            worker.terminate();
        };
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold">Stockfish Debug</h1>
            <p>Open the console to see Stockfish output.</p>
        </div>
    );
}
