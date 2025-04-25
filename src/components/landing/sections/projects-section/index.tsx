"use client";

import { useQuery } from "@tanstack/react-query";
import { Briefcase } from "lucide-react";
import { motion } from "motion/react";
import { ReactElement, useEffect, useState } from "react";
import {
    getRepositories,
    GithubProjectResponse,
} from "~/actions/get-github-repos";
import Project from "~/components/landing/sections/projects-section/project";
import PaginationControls from "~/components/pagination-controls";
import { Skeleton } from "~/components/ui/skeleton";
import { Page, Paginator } from "~/lib/paginator";
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
export default ProjectsSection;
