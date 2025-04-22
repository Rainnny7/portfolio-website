import { ReactElement } from "react";
import Sidebar from "~/components/landing/sidebar";

const LandingPage = (): ReactElement => (
    <main className="min-h-screen flex">
        <Sidebar />
        <div>landing</div>
    </main>
);
export default LandingPage;
