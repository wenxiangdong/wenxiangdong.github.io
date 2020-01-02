import Axios, {AxiosInstance} from "axios";
import cache from "../cache";

const qs = (params: object | undefined) => {
    return params 
        ?  "?" + Object.entries(params)
            .map(([key, value]) => `${key}=${value}`)
            .join("&")
        : "";
}
export default class Http {
    private static http: Http;
    public static getInstance(): Http {
        if (!this.http) {
            this.http = new Http("https://wenxiangdong.github.io");
        }
        return this.http;
    }
    private axios: AxiosInstance;
    private constructor(baseURL: string) {
        this.axios = Axios.create({
            baseURL,
        });
    }

    /**
     * 请求资源
     * @param options
     */
    public async request<T>(options: {
        path: string,
        params?: object,
        method?: "GET" | "POST",
        cacheOptions?: {
            timeout: number
        }
    }): Promise<T> {
        const {path, params, method = "GET", cacheOptions: {timeout = 0} = {}} = options;
        /** 先拿cache */
        const key = path + qs(params);
        try {
            const cachedData:T = cache.get<T>(key);
            return cachedData;
        } catch (error) {}

        const res = await this.axios.request({
            url: path,
            params: params,
            method: method,
        });
        if (res.status !== 200) {
            throw new Error("请求错误");
        } else {
            cache.set(key, res.data, {timeout});
            return res.data as T;
        }
    }

    public static createHttpInstance(baseURL: string):Http {
        return new Http(baseURL);
    }
}