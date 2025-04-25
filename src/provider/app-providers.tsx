"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ViewTransitions } from "next-view-transitions";
import { ReactNode, useEffect } from "react";
import { Toaster } from "~/components/ui/sonner";
import { TooltipProvider } from "~/components/ui/tooltip";
import KittyProvider from "~/provider/kitty-provider";

const queryClient = new QueryClient();

const AppProviders = ({ children }: { children: ReactNode }) => {
    // When loading the site, start from the top
    useEffect(() => {
        if (!window.location.hash) {
            window.scrollTo(0, 0);
        }
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
            <TooltipProvider delayDuration={100}>
                <ViewTransitions>
                    <KittyProvider>
                        {children}
                        <Toaster
                            position="bottom-center"
                            toastOptions={{
                                classNames: {
                                    toast: "!min-w-[16rem] !w-fit !flex !justify-center !items-center !gap-2 !bg-background/75 !backdrop-blur-md !border !border-border !rounded-3xl select-none",
                                    success: "!text-green-500",
                                    error: "!text-red-500",
                                    content: "!text-white/95",
                                },
                            }}
                        />
                    </KittyProvider>
                </ViewTransitions>
            </TooltipProvider>
        </QueryClientProvider>
    );
};
export default AppProviders;
