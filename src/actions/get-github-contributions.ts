"use server";

import { octokit } from "~/lib/github";

type ContributionCalendar = {
    totalContributions: number;
    weeks: {
        contributionDays: {
            contributionCount: number;
            date: string;
        }[];
    }[];
};

type RawGithubContributionsResponse = {
    viewer: {
        contributionsCollection: {
            contributionCalendar: ContributionCalendar;
        };
    };
};

export type GithubContributionsResponse = ContributionCalendar;

/**
 * Get the contribution calendar for the user.
 *
 * @returns the contribution calendar
 */
export const getGitHubContributions =
    async (): Promise<GithubContributionsResponse> => {
        // Try and get the contribution calendar
        try {
            const response =
                await octokit.graphql<RawGithubContributionsResponse>(
                    graphQlQuery
                );
            // Missing the contribution calendar
            if (!response?.viewer?.contributionsCollection) {
                throw new Error("Failed to fetch contribution data");
            }
            return response.viewer.contributionsCollection.contributionCalendar;
        } catch (error) {
            console.error("Error fetching GitHub contributions:", error);
            if (error instanceof Error) {
                throw new Error(
                    `Failed to fetch GitHub contributions: ${error.message}`
                );
            }
            throw new Error("Failed to fetch GitHub contributions");
        }
    };

const graphQlQuery: string = `
      query {
        viewer {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                  date
                }
              }
            }
          }
        }
      }
    `;
