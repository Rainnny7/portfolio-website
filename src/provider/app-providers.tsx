"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ViewTransitions } from "next-view-transitions";
import { ReactNode } from "react";
import { TooltipProvider } from "~/components/ui/tooltip";
import SidebarProvider from "~/provider/sidebar-provider";

const queryClient = new QueryClient();

const AppProviders = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>
        <TooltipProvider delayDuration={100}>
            <ViewTransitions>
                <SidebarProvider>{children}</SidebarProvider>
            </ViewTransitions>
        </TooltipProvider>
    </QueryClientProvider>
);
export default AppProviders;
