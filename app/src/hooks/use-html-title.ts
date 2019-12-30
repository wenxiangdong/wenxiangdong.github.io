import {useEffect} from "react";
export default function useHtmlTitle(title = "") {
    useEffect(() => {
        document.title = title;
    }, [title]);
}