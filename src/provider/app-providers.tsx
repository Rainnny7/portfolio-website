"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ViewTransitions } from "next-view-transitions";
import { ReactNode } from "react";
import { TooltipProvider } from "~/components/ui/tooltip";

const queryClient = new QueryClient();

const AppProviders = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>
        <TooltipProvider delayDuration={100}>
            <ViewTransitions>{children}</ViewTransitions>
        </TooltipProvider>
    </QueryClientProvider>
);
export default AppProviders;
