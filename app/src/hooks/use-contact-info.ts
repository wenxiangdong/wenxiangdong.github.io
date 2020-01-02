import {useState, useEffect} from "react";
import Http from "../http/Http";
import { ContactInfo } from "../types";

const CACHE_TIMEOUT = 5 * 60 * 1000;
export function useContactInfo(): {contactInfoList: ContactInfo[]} {
    const [list, setList] = useState([] as ContactInfo[]);
    useEffect(() => {
        loadContactList();
    }, []);
    const loadContactList = () => {
        Http
            .getInstance()
            .request<ContactInfo[]>({
                path: "/data/contact-info.json",
                cacheOptions: {
                    timeout: CACHE_TIMEOUT,
                }
            })
            .then(res => {
                setList([...res]);
            })
            .catch(console.error);
    }
    return {contactInfoList: list};
}