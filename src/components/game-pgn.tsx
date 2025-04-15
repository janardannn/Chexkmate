"use client";
import { useEffect, useState } from "react";

export default function GamePGN({ boardSize }: { boardSize: number }) {

    const height = boardSize * 0.1;
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth <= 900);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);


    return (
        <textarea
            className={`border-2 border-black not-mobile:w-full p-2 rounded-sm font-outfit`}
            style={{
                height,
                width: isMobile ? `${boardSize}px` : "100%",
            }}
            placeholder="Enter Game PGN here"
        />
    );
}