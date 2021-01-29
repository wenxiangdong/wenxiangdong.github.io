import {createContainer, useContainer} from "unstated-next";
import { useState, useCallback } from "react";
import moment from "dayjs";

enum LogTypes {
    info = "info",
    error = "error",
    warn = "warn",
}
export class LogItem {
    private time: number;
    constructor(
        private type: LogTypes,
        private messages: any[],
        private tag: string,
    ) {
        this.time = Date.now();
    }

    header(): string {
        const time = moment(this.time).format("YYYY-MM-DD HH:mm:ss");
        return `[${this.tag}] at ${time}`;
    }
}
const useLog = (debug?: boolean) => {
    const [logList, setLogList] = useState<LogItem[]>([]);
    const addLog = useCallback((logItem: LogItem) => {
        setLogList(preState => [...preState, logItem]);
    }, []);

    return {
        debug,
        addLog,
        logList,
    }
};
export const LogContainer = createContainer(useLog);

export function useLogger(tag: string) {
    const {debug, addLog, logList} = useContainer(LogContainer);
    const info = useCallback((...messages) => {
        const logItem = new LogItem(LogTypes.info, messages, tag);
        addLog(logItem);
        if (debug) {
            console.info(logItem.header());
            console.info(...messages);
        }
    }, [tag, addLog, debug]);
    const error = useCallback((...messages) => {
        const logItem = new LogItem(LogTypes.error, messages, tag);
        addLog(logItem);
        if (debug) {
            console.error(logItem.header());
            console.error(...messages);
        }
    }, [tag, addLog, debug]);
    const warn = useCallback((...messages) => {
        const logItem = new LogItem(LogTypes.warn, messages, tag);
        addLog(logItem);
        if (debug) {
            console.warn(logItem.header());
            console.warn(...messages);
        }
    }, [tag, addLog, debug]);

    return {info, error, warn, logList};
}