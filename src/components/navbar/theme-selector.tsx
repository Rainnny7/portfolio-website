import { Paintbrush2 } from "lucide-react";
import { useTheme } from "next-themes";
import { ReactElement, useEffect, useState } from "react";
import { toast } from "sonner";
import { appConfig } from "~/app/config";
import SimpleTooltip from "~/components/simple-tooltip";
import { Button } from "~/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/utils";
import { SiteTheme } from "~/types/app-config";

const ThemeSelector = (): ReactElement => {
    const { setTheme, theme } = useTheme();
    const [currentTheme, setCurrentTheme] = useState<SiteTheme>(
        appConfig.themes[0]
    );

    useEffect(() => {
        setCurrentTheme(
            appConfig.themes.find(
                (otherTheme: SiteTheme) => otherTheme.id === theme
            ) || appConfig.themes[0]
        );
    }, [theme]);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <div>
                    <SimpleTooltip content="Switch Themes" side="bottom">
                        <Button
                            className={cn(
                                "size-8 rounded-xl hover:bg-zinc-900/55 transition-all transform-gpu",
                                currentTheme && "bg-zinc-900/55"
                            )}
                            variant="ghost"
                            size="icon"
                            style={{
                                color: currentTheme.color,
                            }}
                        >
                            <Paintbrush2 className="size-4" />
                        </Button>
                    </SimpleTooltip>
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-32 p-1.5 bg-background/70 backdrop-blur-md border border-border rounded-xl">
                {appConfig.themes.map((themeOption: SiteTheme) => {
                    const isActive: boolean =
                        currentTheme.id === themeOption.id;
                    return (
                        <Button
                            key={themeOption.id}
                            className={cn(
                                "w-full justify-start gap-2.5 hover:bg-zinc-900/55",
                                isActive &&
                                    "bg-zinc-900/55 text-primary/85 hover:text-primary/85"
                            )}
                            variant="ghost"
                            onClick={() => {
                                setTheme(themeOption.id);
                                toast.success(
                                    `Switched to the ${themeOption.name} theme!`
                                );
                            }}
                        >
                            <div
                                className="p-1 rounded-full"
                                style={{ backgroundColor: themeOption.color }}
                            />
                            <span>{themeOption.name}</span>
                        </Button>
                    );
                })}
            </PopoverContent>
        </Popover>
    );
};

export default ThemeSelector;
