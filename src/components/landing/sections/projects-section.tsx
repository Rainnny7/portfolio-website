"use client";

import { useQuery } from "@tanstack/react-query";
import { Briefcase, Pin } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "next-view-transitions";
import { ReactElement, useEffect, useState } from "react";
import {
    getRepositories,
    GithubProjectResponse,
} from "~/actions/get-github-repos";
import PaginationControls from "~/components/pagination-controls";
import { Skeleton } from "~/components/ui/skeleton";
import { Page, Paginator } from "~/lib/paginator";
import { truncateText } from "~/lib/string";
import { GithubProject } from "~/types/github-project";

const ProjectsSection = (): ReactElement => {
    const [page, setPage] = useState<number>(1);
    const { isLoading, data: githubResponse } = useQuery<GithubProjectResponse>(
        {
            queryKey: ["github-projects"],
            queryFn: async () => await getRepositories(),
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
                .setItemsPerPage(12)
                .setTotalItems(githubResponse.totalProjects)
                .getPage(page);
            setPagedProjects(pagedProjects);
        };
        getPagedProjects();
    }, [page, githubResponse]);

    return (
        <section id="projects" className="flex flex-col gap-4">
            <motion.h2
                id="projects"
                className="text-4xl font-bold flex gap-4 items-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
            >
                <Briefcase className="p-2 size-10 bg-primary/20 border border-border rounded-lg" />
                My Projects
            </motion.h2>

            {/* Projects */}
            {isLoading ? (
                // Loading state
                <motion.div
                    className="flex flex-wrap gap-2 items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.5,
                        delay: 0.7,
                    }}
                >
                    {Array.from({ length: 5 }).map((_, index: number) => (
                        <Skeleton
                            key={index}
                            className="w-full max-w-[30rem] h-[9.5rem]"
                        />
                    ))}
                </motion.div>
            ) : (
                // Projects
                <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {pagedProjects?.items?.map(
                            (project: GithubProject, index: number) => (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: 0.45 + index * 0.1,
                                    }}
                                >
                                    <Link
                                        className="p-4 h-[9.5rem] flex flex-col bg-background/50 backdrop-blur-sm border border-border rounded-2xl hover:border-primary/50 transition-colors transform-gpu"
                                        href={project.html_url}
                                        target="_blank"
                                        draggable={false}
                                    >
                                        {/* Repository Name & Pin Badge */}
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-xl font-semibold">
                                                {project.name}
                                            </h3>
                                            {project.isPinned && (
                                                <Pin className="size-4 text-red-500" />
                                            )}
                                        </div>

                                        {/* Repository Description */}
                                        <p className="text-muted-foreground mt-2">
                                            {truncateText(
                                                project.description ??
                                                    "No description );",
                                                124
                                            )}
                                        </p>

                                        {/* Repository Language, Stars, & Forks */}
                                        <div className="mt-auto flex gap-4 text-sm text-muted-foreground">
                                            {project.language && (
                                                <span>
                                                    {project.language.name}
                                                </span>
                                            )}
                                            <span>
                                                ⭐ {project.stargazers_count}
                                            </span>
                                            <span>🍴 {project.forks}</span>
                                        </div>
                                    </Link>
                                </motion.div>
                            )
                        )}
                    </div>

                    {/* Pagination Controls */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.5,
                            delay:
                                1.7 + (pagedProjects?.items?.length ?? 0) * 0.1,
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
export default ProjectsSection;
