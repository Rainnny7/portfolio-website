"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ViewTransitions } from "next-view-transitions";
import { ReactNode, useEffect } from "react";
import { appConfig } from "~/app/config";
import { Toaster } from "~/components/ui/sonner";
import { TooltipProvider } from "~/components/ui/tooltip";
import KittyProvider from "~/provider/kitty-provider";
import ThemeProvider from "~/provider/theme-provider";
import { SiteTheme } from "~/types/app-config";

const queryClient = new QueryClient();

const AppProviders = ({ children }: { children: ReactNode }) => {
    // When loading the site, start from the top
    useEffect(() => {
        if (!window.location.hash) {
            window.scrollTo(0, 0);
        }
    }, []);

    // Hello there!
    useEffect(() => {
        setTimeout(() => {
            console.log(
                "\n",
                "  ___      _                           ___ _   _   _ ___ \n",
                " | _ \\__ _(_)_ _  _ _  _ _ _  _       / __| | | | | | _ )\n",
                " |   / _` | | ' \\| ' \\| ' \\ || |  _  | (__| |_| |_| | _ \\\n",
                " |_|_\\__,_|_|_||_|_||_|_||_\\_, | (_)  \\___|____\\___/|___/\n",
                "                           |__/                          \n",
                "\n",
                " Made with ❤️ by Braydon\n",
                "\n",
                ` REACH OUT: ${
                    appConfig.socials.email.href.split("mailto:")[1]
                }\n`,
                "\n"
            );
        }, 1250);
    });

    return (
        <QueryClientProvider client={queryClient}>
            <ViewTransitions>
                <ThemeProvider
                    attribute="class"
                    defaultTheme={appConfig.themes[0].id}
                    themes={appConfig.themes.map(
                        (theme: SiteTheme) => theme.id
                    )}
                >
                    <TooltipProvider delayDuration={100}>
                        <KittyProvider>
                            {children}
                            <Toaster
                                position="bottom-center"
                                toastOptions={{
                                    classNames: {
                                        toast: "!min-w-[16rem] !w-fit !flex !justify-center !items-center !gap-2 !bg-background/75 !backdrop-blur-md !border !border-border !rounded-3xl",
                                        success: "!text-green-500",
                                        error: "!text-red-500",
                                        content: "!text-white/95",
                                    },
                                }}
                            />
                        </KittyProvider>
                    </TooltipProvider>
                </ThemeProvider>
            </ViewTransitions>
        </QueryClientProvider>
    );
};
export default AppProviders;
