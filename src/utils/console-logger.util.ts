(function patchConsoleLog() {
    const originalLog = console.log;

    console.log = (...args: any[]) => {
        originalLog("[dev testing] ", ...args);
    };
})();