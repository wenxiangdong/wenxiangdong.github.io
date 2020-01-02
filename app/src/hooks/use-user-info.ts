import {useEffect, useState, useCallback} from "react";
import Http from "../http/Http";
import {UserInfo} from "../types";
import { useLogger } from "./use-logger";

const CACHE_TIMEOUT = 5 * 60 * 1000;
export default function useUserInfo(): {userInfo: UserInfo, load: () => void} {
    const [userInfo, setUserInfo] = useState({} as UserInfo);
    const logger = useLogger(useUserInfo.name);
    const loadUserInfo = useCallback(() => {
        Http
            .getInstance()
            .request<UserInfo>({path: "/data/user-info.json", cacheOptions: {timeout: CACHE_TIMEOUT}})
            .then(res => {
                logger.info(`get userInfo`, res);
                setUserInfo({...res});
            })
            .catch(e => {
                console.log(e);
            });
    }, []);
    useEffect(() => {
        loadUserInfo();
    }, [loadUserInfo]);
    
    return {userInfo, load: loadUserInfo};
}