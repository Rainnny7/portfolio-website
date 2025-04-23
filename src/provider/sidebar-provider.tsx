"use client";

import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import { ScreenSize, useIsScreenSize } from "~/hooks/use-mobile";

/**
 * The props for the sidebar context.
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
    const isMobile: boolean = !useIsScreenSize(ScreenSize.Large);

    useEffect(() => {
        if (isMobile) {
            setOpen(false);
        }
    }, [isMobile]);

    return (
        <SidebarContext.Provider value={{ open, setOpen }}>
            {children}
        </SidebarContext.Provider>
    );
};
export default SidebarProvider;
