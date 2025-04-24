import { Metadata } from "next";
import { ReactElement } from "react";
import NotFoundContent from "~/components/not-found-content";

export const metadata: Metadata = {
    title: "Page Not Found",
    description: "The page you are looking for does not exist.",
};

const NotFoundPage = (): ReactElement => (
    <main className="min-h-screen flex justify-center items-center">
        <NotFoundContent />
    </main>
);
export default NotFoundPage;
