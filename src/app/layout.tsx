import { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import Script from "next/script";
import { ReactNode } from "react";
import Background from "~/components/background";
import Navbar from "~/components/navbar";
import OnekoKitty from "~/components/oneko-kitty";
import RoundedCursor from "~/components/rounded-cursor";
import { env, isProd } from "~/lib/env";
import { cn } from "~/lib/utils";
import AppProviders from "~/provider/app-providers";
import "./styles/globals.css";

export const metadata: Metadata = {
    title: {
        default: "RainnnyCLUB",
        template: "%s • RainnnyCLUB",
    },
    description:
        "👋🏼 Hi there, my name is Braydon and I am a self-taught software engineer living in Canada!",
    openGraph: {
        images: [
            {
                url: "https://cdn.rainnny.club/me.png",
                width: 128,
                height: 128,
            },
        ],
    },
    twitter: { card: "summary" },
};
export const viewport: Viewport = { themeColor: "#CC1D1D" };

const roboto = Roboto({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const RootLayout = ({
    children,
}: Readonly<{
    children: ReactNode;
}>) => (
    <html lang="en" suppressHydrationWarning>
        <body
            className={cn(
                "antialiased scroll-smooth select-none",
                roboto.className
            )}
        >
            {isProd && (
                <Script
                    src={`${env.ANALYTICS_HOST}/script.js`}
                    data-website-id={env.ANALYTICS_ID}
                    defer
                />
            )}
            <AppProviders>
                <div className="relative min-h-screen">
                    {/* Backgrounds */}
                    <Background />

                    {/* Kitty! */}
                    <OnekoKitty />

                    {/* Content */}
                    <Navbar />
                    <div className="mx-auto max-w-screen-3xl relative">
                        {children}
                    </div>
                </div>
                <RoundedCursor />
            </AppProviders>
        </body>
    </html>
);
export default RootLayout;
