// let stockfish: Worker | null = null;

// export function initStockfish(): Worker {
//     if (!stockfish) {
//         stockfish = new Worker("/stockfish/stockfish-nnue-16.js", { type: "module" });
//     }
//     return stockfish;
// }

// export function sendCommand(command: string, callback?: (output: string) => void) {
//     if (!stockfish) return;

//     stockfish.onmessage = (event) => {
//         if (callback) callback(event.data);
//     };

//     stockfish.postMessage(command);
// }


let stockfish: Worker | null = null;

export function initStockfish(): Worker {
    if (!stockfish) {
        stockfish = new Worker("/stockfish/stockfish-nnue-16.js");
    }
    return stockfish;
}

export function sendCommand(command: string, callback?: (output: string) => void) {
    if (!stockfish) return;

    // let stockfishAnalysis: string[] = [];
    stockfish.onmessage = (event) => {
        // console.log("[Stockfish]", event.data); // log everything for now
        // stockfishAnalysis.push(event.data);
        if (callback) callback(event.data);
    };

    stockfish.postMessage(command);
}
