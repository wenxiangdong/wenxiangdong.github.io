import {useState, useEffect} from "react";
import Http from "../http/Http";
interface ContactInfo {
    type: string;
    value: string;
    icon: string;
    link: string | undefined;
}
export function useContactInfo(): {contactInfoList: ContactInfo[]} {
    const [list, setList] = useState([] as ContactInfo[]);
    useEffect(() => {
        loadContactList();
    }, []);
    const loadContactList = () => {
        Http
            .getInstance()
            .request<ContactInfo[]>({
                path: "/data/contact-info.json"
            })
            .then(res => {
                setList([...res]);
            })
            .catch(console.error);
    }
    return {contactInfoList: list};
}