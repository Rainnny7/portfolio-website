import { cn } from "~/lib/utils";

const Sidebar = () => (
    <div
        className={cn(
            "w-[20rem] bg-background/65",
            "[mask-image:linear-gradient(to_right,black_90%,transparent)]"
        )}
    >
        <h1>Sidebar</h1>
    </div>
);
export default Sidebar;
