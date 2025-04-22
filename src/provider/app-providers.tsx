"use client";

import { ViewTransitions } from "next-view-transitions";
import { ReactNode } from "react";
import { TooltipProvider } from "~/components/ui/tooltip";

const AppProviders = ({ children }: { children: ReactNode }) => (
    <TooltipProvider>
        <ViewTransitions>{children}</ViewTransitions>
    </TooltipProvider>
);
export default AppProviders;
