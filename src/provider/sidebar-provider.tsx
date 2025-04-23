"use client";

import { createContext, ReactNode, useContext, useState } from "react";

/**
 * The props for the socket context.
 */
type SidebarContextProps = {
    /**
     * The sidebar open state.
     */
    open: boolean;

    /**
     * The function to set the sidebar open state.
     */
    setOpen: (open: boolean) => void;
};

/**
 * The current context of the sidebar.
 */
const SidebarContext = createContext<SidebarContextProps>({
    open: false,
    setOpen: () => {
        throw new Error("SidebarContext is not defined.");
    },
});

/**
 * The hook to use the sidebar context.
 */
export const useSidebar = (): SidebarContextProps => {
    return useContext(SidebarContext);
};

const SidebarProvider = ({ children }: { children: ReactNode }) => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <SidebarContext.Provider value={{ open, setOpen }}>
            {children}
        </SidebarContext.Provider>
    );
};
export default SidebarProvider;
