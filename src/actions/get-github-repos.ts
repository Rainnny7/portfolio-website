"use server";

import { octokit } from "~/lib/github";
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
        const response = await octokit.graphql<{
            user: {
                pinnedItems: { nodes: GithubProject[] };
                repositories: { nodes: GithubProject[] };
            };
        }>(graphQlQuery);

        // Invalid response from GitHub
        if (!response?.user) {
            console.error("Invalid GitHub API response:", response);
            return {
                projects: [],
                totalProjects: 0,
                responseTime: performance.now() - before,
            };
        }

        // Combine pinned and regular repositories, ensuring pinned ones come first
        const pinnedRepos = response.user.pinnedItems.nodes.map(
            (repo: GithubProject) => ({
                ...repo,
                name: repo.nameWithOwner,
                language: repo.language ? { name: repo.language.name } : null,
                isPinned: true,
            })
        );

        return {
            projects: [
                ...pinnedRepos,
                ...response.user.repositories.nodes
                    .filter(
                        (repo: GithubProject) =>
                            !repo.archived &&
                            !pinnedRepos.some((pinned) => pinned.id === repo.id)
                    )
                    .map((repo: GithubProject) => ({
                        ...repo,
                        name: repo.nameWithOwner,
                        language: repo.language
                            ? { name: repo.language.name }
                            : null,
                        isPinned: false,
                    })),
            ],
            totalProjects:
                pinnedRepos.length + response.user.repositories.nodes.length,
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

const graphQlQuery: string = `
        query {
            user(login: "Rainnny7") {
                pinnedItems(first: 6, types: REPOSITORY) {
                    nodes {
                        ... on Repository {
                            id
                            name
                            nameWithOwner
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
                        nameWithOwner
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
