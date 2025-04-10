export interface EngineEval {
    type: "cp" | "mate";
    value: number;
    bestMove: string;
    // otherMoves: string[];
    // bestMoveScore: number;
}