import { FlipBoardProps } from "@/types/flip-board.type";
import { BoardOrientation } from "react-chessboard/dist/chessboard/types";

const flipIcon = (size: number) => {
    return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg>;
}
export default function FlipBoard({ boardOrientation, setBoardOrientation, boardSize }: FlipBoardProps) {
    const size = boardSize * 0.045;
    return (
        <div className={`flex items-center gap-2`}>
            <button
                className={`border-2 border-black rounded-sm p-1 hover:bg-gray-200`}
                onClick={() => {
                    if (boardOrientation === "white") {
                        setBoardOrientation("black");
                    }
                    else {
                        setBoardOrientation("white");
                    }
                }}
            >
                {flipIcon(size)}
            </button>
            {/* <span className={`font-outfit font-[400]`}>Flip Board</span> */}
        </div>
    );
}