import { Clock, Pin, Sparkle } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "next-view-transitions";
import Image from "next/image";
import { ReactElement } from "react";
import SimpleTooltip from "~/components/simple-tooltip";
import { Badge } from "~/components/ui/badge";
import { InfiniteMovingCards } from "~/components/ui/infinite-moving-cards";
import { MagicCard } from "~/components/ui/magic-card";
import { truncateText } from "~/lib/string";
import { GithubProject } from "~/types/github-project";

const Project = ({
    project,
    index,
}: {
    project: GithubProject;
    index: number;
}): ReactElement => {
    // A project is considered new if it was created in the last week
    const isNew: boolean =
        new Date(project.created_at) >
        new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    // A project is considered recently updated if it was updated in the last week
    const recentlyUpdated: boolean =
        new Date(project.updated_at) >
        new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    return (
        <SimpleTooltip
            content={
                <span>
                    Click to view <b>{project.nameWithOwner}</b> on GitHub
                </span>
            }
            side="bottom"
        >
            <motion.li
                key={project.id}
                className="group w-full md:w-fit"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                }}
            >
                <Link href={project.html_url} target="_blank" draggable={false}>
                    <MagicCard
                        className="relative w-full md:w-[21rem] xl:w-[24.5rem] rounded-lg"
                        gradientColor="#1C1C1C"
                        gradientFrom="#AA0000"
                        gradientTo="#FE5454"
                    >
                        {/* New Badge */}
                        {isNew ? (
                            <SimpleTooltip
                                content="This project was created in the last week!"
                                side="bottom"
                            >
                                <Badge
                                    className="absolute top-2 left-2 bg-muted/70 backdrop-blur-sm border border-border/85 z-10"
                                    variant="secondary"
                                >
                                    <Sparkle className="size-4 text-primary font-bold" />
                                    New!
                                </Badge>
                            </SimpleTooltip>
                        ) : (
                            recentlyUpdated && (
                                <SimpleTooltip
                                    content="This project was recently updated!"
                                    side="bottom"
                                >
                                    <Badge
                                        className="absolute top-2 left-2 bg-muted/70 backdrop-blur-sm border border-border/85 z-10"
                                        variant="secondary"
                                    >
                                        <Clock className="size-4 text-primary font-bold" />
                                        Recently Updated!
                                    </Badge>
                                </SimpleTooltip>
                            )
                        )}

                        {/* Social Preview */}
                        <div className="p-1 h-[12rem]">
                            <div className="relative h-full w-full overflow-hidden">
                                <Image
                                    className="object-cover rounded-t-lg group-hover:scale-105 transition-all duration-300 transform-gpu"
                                    src={project.socialImageUrl}
                                    alt={project.name}
                                    priority
                                    fill
                                    draggable={false}
                                />

                                {/* Language, Stars, and Forks */}
                                <div className="absolute top-0 right-0 p-2 flex flex-col gap-1 items-end bg-black/70 backdrop-blur-sm rounded-bl-lg rounded-tr-lg opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    {project.language && (
                                        <SimpleTooltip
                                            content={
                                                <span>
                                                    This project is made with{" "}
                                                    <b>
                                                        {project.language.name}
                                                    </b>
                                                </span>
                                            }
                                            side="left"
                                        >
                                            <span className="text-sm text-white/90">
                                                {project.language.name}
                                            </span>
                                        </SimpleTooltip>
                                    )}
                                    <SimpleTooltip
                                        content={
                                            <span>
                                                This project has{" "}
                                                {project.stargazers_count} star
                                                {project.stargazers_count === 1
                                                    ? ""
                                                    : "s"}
                                            </span>
                                        }
                                        side="left"
                                    >
                                        <span className="text-sm text-white/90">
                                            ⭐ {project.stargazers_count}
                                        </span>
                                    </SimpleTooltip>
                                    <SimpleTooltip
                                        content={
                                            <span>
                                                This project has {project.forks}{" "}
                                                fork
                                                {project.forks === 1 ? "" : "s"}
                                            </span>
                                        }
                                        side="left"
                                    >
                                        <span className="text-sm text-white/90">
                                            🍴 {project.forks}
                                        </span>
                                    </SimpleTooltip>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 h-full flex flex-col gap-1.5">
                            {/* Repository Name & Pin Badge */}
                            <div className="flex justify-between gap-1.5 items-center">
                                <h3 className="inline-flex gap-1 items-center text-xl font-semibold">
                                    {project.name}
                                </h3>
                                {project.isPinned && (
                                    <SimpleTooltip
                                        content="This repository is pinned!"
                                        side="bottom"
                                    >
                                        <Pin className="size-4 text-red-500" />
                                    </SimpleTooltip>
                                )}
                            </div>

                            {/* Repository Description */}
                            <p className="h-18 mt-2 line-clamp-2 text-muted-foreground font-light">
                                {truncateText(
                                    project.description ?? "No description );",
                                    148
                                )}
                            </p>

                            {/* Tags */}
                            <div className="min-h-[3.5rem]">
                                {project.tags && (
                                    <InfiniteMovingCards speed={50}>
                                        {project.tags.map((tag) => (
                                            <Badge
                                                key={tag}
                                                className="text-xs text-white/85"
                                                variant="secondary"
                                            >
                                                {tag}
                                            </Badge>
                                        ))}
                                    </InfiniteMovingCards>
                                )}
                            </div>
                        </div>
                    </MagicCard>
                </Link>
            </motion.li>
        </SimpleTooltip>
    );
};
export default Project;
