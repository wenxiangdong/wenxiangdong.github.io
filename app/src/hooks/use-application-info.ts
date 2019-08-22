import {useState} from "react";

export interface IApplication {
    name: string;
    desc: string;
    type: ApplicationType;

    sourceCodeUrl: string;
    qrCodeUrl: string;
    cooperators: string[]
}
export enum ApplicationType {
    Web,
    Android,
    MiniProgram,
}

export default function useApplicationInfo() {
    const [app, setApp] = useState({} as IApplication);
    return {applicationInfo: app};
}