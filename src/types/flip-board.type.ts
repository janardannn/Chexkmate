import { BoardOrientation } from "react-chessboard/dist/chessboard/types"

export interface FlipBoardProps {
    boardOrientation: BoardOrientation,
    setBoardOrientation: (color: BoardOrientation) => void,
    boardSize: number
}