import React, { useState } from "react";
import { createCtx } from "./ContextHelper";

interface HeaderProps {
    children: React.ReactNode;
}

type HeaderContextType = {
    title: string;
    setTitle: (value: string) => void;
    showBackArrow: React.ReactNode;
    setShowBackArrow: (value: boolean) => void;
};

export const [useHeaderContext, CtxProvider] = createCtx<HeaderContextType>();

export const HeaderContextProvider = ({ children }: HeaderProps) => {
    const [title, setTitle] = useState<string>("...");
    const [showBackArrow, setShowBackArrow] = useState<boolean>(false);
    
    return (
        <CtxProvider
            value={{
                title,
                setTitle,
                showBackArrow,
                setShowBackArrow,
            }}
        >
            {children}
        </CtxProvider>
    );
};
