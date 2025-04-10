
import { EngineEval } from "./EngineEval.type";

export type ChessStore = {
    engineEval: EngineEval;
    descriptiveMove: string;
    fen: string;
    setEngineEval: (engineEval: EngineEval) => void;
    setDescriptiveMove: (desc: string) => void;
    setFEN: (fen: string) => void;
};
