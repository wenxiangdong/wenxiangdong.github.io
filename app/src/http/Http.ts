import Axios, {AxiosInstance} from "axios";
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
        params?: string,
        method?: "GET" | "POST"
    }): Promise<T> {
        const res = await this.axios.request({
            url: options.path,
            params: options.params,
            method: options.method || "GET"
        });
        if (res.status !== 200) {
            throw new Error("请求错误");
        } else {
            return res.data as T;
        }
    }

    public static createHttpInstance(baseURL: string):Http {
        return new Http(baseURL);
    }
}