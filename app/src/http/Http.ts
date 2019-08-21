import Axios, {AxiosInstance} from "axios";
export default class Http {
    private static http: Http;
    public static getInstance(): Http {
        if (!this.http) {
            this.http = new Http();
        }
        return this.http;
    }
    private axios: AxiosInstance;
    private constructor() {
        this.axios = Axios.create({
            baseURL: "https://wenxiangdong.github.io"
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
}