const debounce = (func, wait = 100, immediate) => {
    if (typeof func !== "function") {
        throw new TypeError("Expected a function");
    }

    if (typeof wait !== "number") {
        throw new TypeError("Expected a number for wait");
    }

    if (typeof immediate !== "boolean") {
        throw new TypeError("Expected a boolean for immediate");
    }
    let timer = null;
    return function (...args) {
        const context = this;
        const later = () => {
            timer = null;
            if (!immediate) {
                try {
                    func.apply(context, args);
                } catch (error) {
                    console.error("Error in debounced function:", error);
                }
            }
        };
        const now = immediate && !timer;
        clearTimeout(timer);
        timer = setTimeout(later, wait);
        if (now) {
            try {
                func.apply(context, args);
            } catch (error) {
                console.error("Error in immediate debounced function:", error);
            }
        }
    };
};

export { debounce };
