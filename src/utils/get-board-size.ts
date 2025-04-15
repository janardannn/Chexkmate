export function getBoardSize(windowWidth: number): number {
    if (windowWidth >= 1366) return 760;    // big laptops
    if (windowWidth >= 1280) return 720;    // standard desktop
    if (windowWidth >= 1200) return 690;
    if (windowWidth >= 1120) return 660;
    if (windowWidth >= 1040) return 630;
    if (windowWidth >= 960) return 600;    // medium desktop
    if (windowWidth >= 900) return 560;
    if (windowWidth >= 840) return 520;
    if (windowWidth >= 768) return 480;    // tablets
    if (windowWidth >= 700) return 440;
    if (windowWidth >= 640) return 400;
    if (windowWidth >= 580) return 380;
    if (windowWidth >= 520) return 360;
    if (windowWidth >= 480) return 340;    // large phones
    if (windowWidth >= 440) return 320;
    if (windowWidth >= 400) return 300;
    return 280;                             // small phones
}
