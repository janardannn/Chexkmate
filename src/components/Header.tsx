"use client";
import { Paytone_One, Outfit } from "next/font/google";

const paytone = Paytone_One({
    weight: "400",
    subsets: ["latin"],
});

const outfit = Outfit({
    weight: "400",
    subsets: ["latin"],
});

export default function Header() {
    return (
        <div className="w-[1131px] flex justify-between mb-12">
            <h1 className={`flex items-end text-[48px] ${paytone.className}`}>Chexkmate</h1>
            <p className={`flex items-end text-[18px] ${outfit.className}`}>a project by @janardannn</p>
        </div>
    );
}
