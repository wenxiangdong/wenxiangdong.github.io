import Http from "./Http";
import useSWR from "swr";


const http = Http.createHttpInstance("https://api.github.com");
const fetchFn = <Data>(key: string) => http.request<Data>({path: key});

export default function useGithubApi<Data = any>(url) {
    return useSWR<Data>(url, fetchFn);
}