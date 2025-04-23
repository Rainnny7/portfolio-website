"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ViewTransitions } from "next-view-transitions";
import { ReactNode, useEffect } from "react";
import { TooltipProvider } from "~/components/ui/tooltip";
import SidebarProvider from "~/provider/sidebar-provider";

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
                    <SidebarProvider>{children}</SidebarProvider>
                </ViewTransitions>
            </TooltipProvider>
        </QueryClientProvider>
    );
};
export default AppProviders;
