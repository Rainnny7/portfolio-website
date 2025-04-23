export type GithubProject = {
    id: number;
    name: string;
    nameWithOwner: string;
    description: string | null;
    html_url: string;
    stargazers_count: number;
    forks: number;
    language: {
        name: string;
    } | null;
    archived: boolean;
    created_at: string;
    updated_at: string;
    isPinned: boolean;
    socialImageUrl: string;
};
