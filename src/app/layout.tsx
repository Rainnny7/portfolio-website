import { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import Script from "next/script";
import { ReactNode } from "react";
import { env } from "~/lib/env";
import { cn } from "~/lib/utils";
import AppProviders from "~/provider/app-providers";
import "./styles/globals.css";

export const metadata: Metadata = {
    title: {
        default: "RainnnyCLUB",
        template: "%s • RainnnyCLUB",
    },
    description:
        "Pariatur nisi pariatur elit aute anim esse sint incididunt. Aliqua in sit enim aliquip do irure elit excepteur occaecat.",
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
            <Script
                src={`${env.ANALYTICS_HOST}/script.js`}
                data-website-id={env.ANALYTICS_ID}
                defer
            />
            <AppProviders>
                <div className="relative min-h-screen">
                    {/* Background */}
                    <div className="fixed inset-0 h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_80%_-20%,rgba(204,29,29,0.125),rgba(255,255,255,0))] z-[-2]" />

                    {/* Content */}
                    <div className="mx-auto max-w-screen-3xl relative">
                        {children}
                    </div>
                </div>
            </AppProviders>
        </body>
    </html>
);
export default RootLayout;
