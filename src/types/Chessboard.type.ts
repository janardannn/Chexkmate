export interface ChessboardProps {
    id: string;
    size: number;

    // temp
    bestMove: string;
    analyzePosition: (fen: string, markBestMove?: (move: string) => void) => void;

    setDescriptiveMove: (move: string) => void;
}