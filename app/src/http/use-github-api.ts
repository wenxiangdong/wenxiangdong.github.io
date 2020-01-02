import Http from "./Http";
import useSWR, { responseInterface } from "swr";
import { useCallback } from "react";


const http = Http.createHttpInstance("https://api.github.com");


export default function useGithubApi<Data = any>(url: string, cacheOptions?: {timeout: number}): responseInterface<Data, Error> {
    const fetchFn = useCallback(<Data>(key: string) => http.request<Data>({path: key, cacheOptions}), [url]);
    return useSWR<Data>(url, fetchFn);
}

export {
    http
}