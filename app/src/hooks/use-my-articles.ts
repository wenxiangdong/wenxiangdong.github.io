import useGithubApi, {http} from "../http/use-github-api";
import { Article, GithubContentItem, FileTypes } from "../types";
import { responseInterface } from "swr";
import { useState, useEffect } from "react";

/** 排队在外的文件 */
const excludes = [/README.md/i, /images/i];
const filterGithubItems = (items: GithubContentItem[]) => items.filter(
    item => !excludes.some(reg => reg.test(item.path))
);

const createArticleItem = (githubItem: GithubContentItem) => {
    const formatFilename = (filename: string) => {
        const index = filename.match(/\..*$/)?.index;
        return index ? filename.slice(0, index) : filename;
    }
    const {path, sha, html_url} = githubItem;
    const patterns = path.split("/");
    const name = formatFilename(patterns.length > 1 ? patterns[patterns.length - 1] : patterns[0]);
    const category = patterns.length > 1 ? patterns.slice(0, patterns.length - 1) : [];
    return {
        category,
        name,
        sha,
        url: html_url,
    } as Article;
}

const PATH = "/repos/wenxiangdong/my-articles/contents";
// const PATH = "/repos/wenxiangdong/hhhh/contents";
const TIMEOUT = 5 * 60 * 1000;

export default function(): responseInterface<Article[], Error> {
    
    const {data, ...rest} = useGithubApi<GithubContentItem[]>(PATH, {timeout: TIMEOUT});
    const [articleList, setArticleList] = useState<Article[]>([]);

    /** github repo 首级内容变化时，要获取所有文章 */
    useEffect(() => {
        if (!data) return;
        const queue: GithubContentItem[] = filterGithubItems([...data]);
        /** 广度优先加载文章 */
        const loadBFS = async () => {
            while(queue.length) {
                const head = queue.shift();
                switch (head?.type) {
                    case FileTypes.file:
                        setArticleList(preList => [...preList, createArticleItem(head)])
                        break;
                    case FileTypes.dir:
                        try {
                            const res = await http.request<GithubContentItem[]>({
                                path: `${PATH}/${head.path}`,
                                cacheOptions: {
                                    timeout: TIMEOUT,
                                }
                            });
                            queue.push(...filterGithubItems(res));
                        } catch (error) {
                            console.log(error);
                        }
                        break;
                }
            }
        }
        loadBFS();
        return () => {
            setArticleList([]);
        };
    }, [data]);
    return {
        data: articleList,
        ...rest,
    };
}