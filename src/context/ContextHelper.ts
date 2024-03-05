import React, { createContext } from "react";

export const createCtx = <ContextType>() => {
    const ctx = createContext<ContextType | undefined>(undefined);
    function useCtx() {
        const context = React.useContext(ctx);
        if (!context) {
            console.trace();
            throw new Error("useCtx must be inside a Provider with a value");
        }
        return context;
    }
    return [useCtx, ctx.Provider, ctx] as const;
};
