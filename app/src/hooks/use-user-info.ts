import {useEffect, useState} from "react";
import Http from "../http/Http";
interface UserInfo {
    name: string;
    actualName: string;
    englishName: string;
    "school": string;
    "company": string;
    "gender": string;
    "birthday": string;
    resume: string;
    avatar: string
}
export default function useUserInfo(): {userInfo: UserInfo, load: () => void} {
    const [userInfo, setUserInfo] = useState({} as UserInfo);
    useEffect(() => {
        loadUserInfo();
    }, []);
    const loadUserInfo = () => {
        Http
            .getInstance()
            .request<UserInfo>({path: "/data/user-info.json"})
            .then(res => {
                console.log("get user info", res);
                setUserInfo({...res});
            })
            .catch(e => {
                console.log(e);
            });
    };
    return {userInfo, load: loadUserInfo};
}