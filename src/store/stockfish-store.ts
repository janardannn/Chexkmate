import { create } from "zustand";

import { StockfishStore } from "@/types/stockfish-store.type";

export const useStockfishStore = create<StockfishStore>((set) => ({
    isReady: false,
    setIsReady: (isReady) => set({ isReady }),
}));