export interface UserInfo {
    name: string;
    actualName: string;
    englishName: string;
    "school": string;
    "company": string;
    "gender": string;
    "birthday": string;
    avatar: string
}
export interface ContactInfo {
    type: string;
    value: string;
    icon: string;
    link: string | undefined;
}

export interface Article {
    category: string[];
    name: string;
    sha: string;
    url: string;
}

export enum FileTypes {
    file = "file",
    dir = "dir"
}

export interface GithubContentItem {
    name: string;
    path: string;
    sha: string;
    html_url: string;
    type: FileTypes;
}