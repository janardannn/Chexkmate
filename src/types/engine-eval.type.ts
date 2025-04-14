export interface EngineEval {
    type: "cp" | "mate" | "win" | "draw";
    player?: "white" | "black";
    value: number;
    bestMove: string;
    // otherMoves: string[];
    // bestMoveScore: number;
}