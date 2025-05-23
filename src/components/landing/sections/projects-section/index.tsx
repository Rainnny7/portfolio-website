"use client";

import { useQuery } from "@tanstack/react-query";
import { Briefcase } from "lucide-react";
import { motion } from "motion/react";
import { ReactElement, useEffect, useState } from "react";
import {
    getRepositories,
    GithubProjectResponse,
} from "~/actions/get-github-repos";
import LandingSection from "~/components/landing/landing-section";
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
            setPagedProjects(
                await new Paginator<GithubProject>()
                    .setItems(githubResponse.projects)
                    .setItemsPerPage(6)
                    .setTotalItems(githubResponse.projects.length)
                    .getPage(page)
            );
        };
        getPagedProjects();
    }, [page, githubResponse]);

    return (
        <LandingSection
            id="projects"
            icon={Briefcase}
            title={
                <span>
                    My{" "}
                    <span className="bg-gradient-to-br from-primary to-tertiary text-transparent bg-clip-text">
                        Projects
                    </span>
                </span>
            }
            description="Here are some of the projects I've worked on!"
        >
            {/* Projects */}
            {isLoading ? (
                // Loading state
                <motion.div
                    className="w-full flex flex-wrap gap-2 items-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.25, delay: 0.7 }}
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
                        viewport={{ once: true, margin: "0px" }}
                        transition={{
                            duration: 0.25,
                            delay: 0.85,
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
        </LandingSection>
    );
};
export default ProjectsSection;
