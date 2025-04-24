"use client";

import { useQuery } from "@tanstack/react-query";
import { Briefcase, Clock, Pin, Sparkle } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "next-view-transitions";
import Image from "next/image";
import { ReactElement, useEffect, useState } from "react";
import {
    getRepositories,
    GithubProjectResponse,
} from "~/actions/get-github-repos";
import PaginationControls from "~/components/pagination-controls";
import SimpleTooltip from "~/components/simple-tooltip";
import { Badge } from "~/components/ui/badge";
import { MagicCard } from "~/components/ui/magic-card";
import { Skeleton } from "~/components/ui/skeleton";
import { Page, Paginator } from "~/lib/paginator";
import { truncateText } from "~/lib/string";
import { GithubProject } from "~/types/github-project";

const ProjectsSection = (): ReactElement => {
    const [page, setPage] = useState<number>(1);
    const { isLoading, data: githubResponse } = useQuery<GithubProjectResponse>(
        {
            queryKey: ["github-projects"],
            queryFn: getRepositories,
        }
    );
    const [pagedProjects, setPagedProjects] = useState<
        Page<GithubProject> | undefined
    >();

    useEffect(() => {
        if (!githubResponse) return;
        const getPagedProjects = async () => {
            const pagedProjects = await new Paginator<GithubProject>()
                .setItems(githubResponse.projects)
                .setItemsPerPage(6)
                .setTotalItems(githubResponse.projects.length)
                .getPage(page);
            setPagedProjects(pagedProjects);
        };
        getPagedProjects();
    }, [page, githubResponse]);

    return (
        <section id="projects" className="pt-40 flex flex-col gap-4">
            {/* Header */}
            <div className="flex flex-col gap-2">
                <motion.h2
                    className="text-4xl font-bold flex gap-4 items-center"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    <Briefcase className="p-2 size-10 bg-primary/20 border border-border rounded-lg" />
                    My Projects
                </motion.h2>
                <motion.p
                    className="max-w-lg text-lg text-muted-foreground font-light"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                >
                    Here are some of the projects I&apos;ve worked on.
                </motion.p>
            </div>

            {/* Projects */}
            {isLoading ? (
                // Loading state
                <motion.div
                    className="flex flex-wrap gap-2 items-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                >
                    {Array.from({ length: 5 }).map((_, index: number) => (
                        <Skeleton
                            key={index}
                            className="w-full max-w-[23.5rem] h-[9.5rem]"
                        />
                    ))}
                </motion.div>
            ) : (
                // Projects
                <div className="flex flex-col gap-4">
                    <ul className="flex flex-wrap gap-4 items-center">
                        {pagedProjects?.items?.map(
                            (project: GithubProject, index: number) => (
                                <Project
                                    key={project.id}
                                    project={project}
                                    index={index}
                                />
                            )
                        )}
                    </ul>

                    {/* Pagination Controls */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{
                            duration: 0.5,
                            delay:
                                1.2 +
                                (pagedProjects?.metadata.end ??
                                    0 - (pagedProjects?.metadata.start ?? 0)) *
                                    0.1,
                        }}
                    >
                        <PaginationControls
                            loading={isLoading}
                            responseTime={githubResponse?.responseTime ?? 0}
                            page={pagedProjects}
                            setPage={setPage}
                        />
                    </motion.div>
                </div>
            )}
        </section>
    );
};

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
                            </div>
                        </div>

                        <div className="p-4 h-full flex flex-col">
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

                            {/* Spacer */}
                            <div className="flex-1" />

                            {/* Repository Language, Stars, & Forks */}
                            <div className="pt-5 flex gap-4 text-sm text-muted-foreground">
                                {/* Language */}
                                {project.language && (
                                    <SimpleTooltip
                                        content={
                                            <span>
                                                This project is made with{" "}
                                                <b>{project.language.name}</b>
                                            </span>
                                        }
                                        side="bottom"
                                    >
                                        <span>{project.language.name}</span>
                                    </SimpleTooltip>
                                )}

                                {/* Stars */}
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
                                    side="bottom"
                                >
                                    <span>⭐ {project.stargazers_count}</span>
                                </SimpleTooltip>

                                {/* Forks */}
                                <SimpleTooltip
                                    content={
                                        <span>
                                            This project has {project.forks}{" "}
                                            fork
                                            {project.forks === 1 ? "" : "s"}
                                        </span>
                                    }
                                    side="bottom"
                                >
                                    <span>🍴 {project.forks}</span>
                                </SimpleTooltip>
                            </div>
                        </div>
                    </MagicCard>
                </Link>
            </motion.li>
        </SimpleTooltip>
    );
};

export default ProjectsSection;
