"use server";

import request from "~/lib/request";
import { GithubProject } from "~/types/github-project";

export type GithubProjectResponse = {
    projects: GithubProject[];
    totalProjects: number;
    responseTime: number;
};

/**
 * Get all repositories from the GitHub API.
 *
 * @returns the github projects
 */
export const getRepositories = async (): Promise<GithubProjectResponse> => {
    const before: number = performance.now();
    try {
        // Get pinned and regular repositories using the GitHub GraphQL API
        const response = await request.post<{
            data: {
                user: {
                    pinnedItems: { nodes: GithubProject[] };
                    repositories: { nodes: GithubProject[] };
                };
            };
        }>("https://api.github.com/graphql", {
            data: { query: graphQlQuery },
            headers: {
                Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            },
        });

        // Invalid response from GitHub
        if (!response?.data?.user) {
            console.error("Invalid GitHub API response:", response);
            return {
                projects: [],
                totalProjects: 0,
                responseTime: performance.now() - before,
            };
        }

        // Combine pinned and regular repositories, ensuring pinned ones come first
        const pinnedRepos = response.data.user.pinnedItems.nodes.map(
            (repo: GithubProject) => ({
                ...repo,
                language: repo.language ? { name: repo.language.name } : null,
                isPinned: true,
            })
        );

        return {
            projects: [
                ...pinnedRepos,
                ...response.data.user.repositories.nodes
                    .filter(
                        (repo: GithubProject) =>
                            !repo.archived &&
                            !pinnedRepos.some((pinned) => pinned.id === repo.id)
                    )
                    .map((repo: GithubProject) => ({
                        ...repo,
                        language: repo.language
                            ? { name: repo.language.name }
                            : null,
                        isPinned: false,
                    })),
            ],
            totalProjects:
                pinnedRepos.length +
                response.data.user.repositories.nodes.length,
            responseTime: performance.now() - before,
        };
    } catch (error) {
        console.error("Error fetching GitHub repositories:", error);
        return {
            projects: [],
            totalProjects: 0,
            responseTime: performance.now() - before,
        };
    }
};

const graphQlQuery = `
        query {
            user(login: "Rainnny7") {
                pinnedItems(first: 6, types: REPOSITORY) {
                    nodes {
                        ... on Repository {
                            id
                            name
                            description
                            html_url: url
                            stargazers_count: stargazerCount
                            forks: forkCount
                            language: primaryLanguage {
                                name
                            }
                            archived: isArchived
                            created_at: createdAt
                            updated_at: updatedAt
                        }
                    }
                }
                repositories(first: 100, orderBy: {field: UPDATED_AT, direction: DESC}) {
                    nodes {
                        id
                        name
                        description
                        html_url: url
                        stargazers_count: stargazerCount
                        forks: forkCount
                        language: primaryLanguage {
                            name
                        }
                        archived: isArchived
                        created_at: createdAt
                        updated_at: updatedAt
                    }
                }
            }
        }
    `;
