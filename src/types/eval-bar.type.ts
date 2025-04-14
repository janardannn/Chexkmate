export interface EvalBarProps {
    type: "cp" | "mate" | "win" | "draw";
    value: number;
    boardOrient: "white" | "black";
}
