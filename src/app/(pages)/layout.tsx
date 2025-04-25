import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
    title: "Hi there!",
};

export const dynamic = "force-dynamic";

const LandingLayout = ({ children }: { children: ReactNode }) => (
    <>{children}</>
);
export default LandingLayout;
