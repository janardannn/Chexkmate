import { create } from "zustand";
import { ChessStore } from "@/types/chess-store.type";

export const useChessStore = create<ChessStore>((set) => ({
    engineEval: {
        type: "cp",
        value: 0,
        bestMove: "",
    },
    descriptiveMove: "",
    fen: "",
    setEngineEval: (currEngineEval) =>
        set((state) => ({
            engineEval: {
                ...state.engineEval,
                ...currEngineEval,
            },
        })),
    setDescriptiveMove: (desc) => set({ descriptiveMove: desc }),
    setFEN: (fen) => set({ fen }),
}));
