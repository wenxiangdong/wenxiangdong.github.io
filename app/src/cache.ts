interface Data<T = any> {
    value: T;
    expireIn: number;
}
const CACHE_MISS_ERROR = new Error("cache missed");

class TimeoutCache {
    public static createInstance(timeout = 5 * 60 * 1000) {
        return new TimeoutCache(timeout);
    }

    /**
     * @param {number} timeout ms
     */
    private constructor(private timeout: number) {}
    set(key: string, value: any, options?: {timeout: number}) {
        const {timeout = this.timeout} = options || {};
        console.log("set", key, value, timeout / 1000 + "s");
        localStorage.setItem(key, JSON.stringify({
            value,
            expireIn: Date.now() + timeout,
        } as Data));
    }
    get<T>(key: string): T {
        const json = localStorage.getItem(key);
        if (!json) {
            throw CACHE_MISS_ERROR;
        }
        const data: Data<T> = JSON.parse(json);
        if (data.expireIn < Date.now()) {
            localStorage.removeItem(key);
            throw CACHE_MISS_ERROR;
        }
        return data.value;
    }
}

const cache = TimeoutCache.createInstance();
export {
    CACHE_MISS_ERROR
}
export default cache;

declare global {
    interface Window {
        clearCache: (key?: string) => void;
    }
}
(function() {
    window.clearCache = (key?: string) => {
        key ? localStorage.removeItem(key) : localStorage.clear()
    }
})()