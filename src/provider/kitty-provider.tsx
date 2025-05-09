"use client";

import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";

/**
 * The props for the kitty context.
 */
type KittyContextProps = {
    /**
     * The sidebar open state.
     */
    showKitty: boolean;

    /**
     * The function to set the kitty show state.
     */
    setShowKitty: (showKitty: boolean) => void;
};

/**
 * The current context of the kitty.
 */
const KittyContext = createContext<KittyContextProps>({
    showKitty: false,
    setShowKitty: () => {
        throw new Error("KittyContext is not defined.");
    },
});

/**
 * The hook to use the sidebar context.
 */
export const useKitty = (): KittyContextProps => {
    return useContext(KittyContext);
};

const KittyProvider = ({ children }: { children: ReactNode }) => {
    const [showKitty, setShowKitty] = useState<boolean>(false);

    // Fetch the kitty state from local storage
    useEffect(() => {
        setShowKitty(localStorage.getItem("show-kitty") === "true");
    }, []);

    // Save the kitty state to local storage when it changes
    useEffect(
        () => localStorage.setItem("show-kitty", showKitty.toString()),
        [showKitty]
    );

    return (
        <KittyContext.Provider value={{ showKitty, setShowKitty }}>
            {children}
        </KittyContext.Provider>
    );
};
export default KittyProvider;
