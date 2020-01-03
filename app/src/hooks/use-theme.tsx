import {createContainer, useContainer} from "unstated-next";
import React, { useState, useEffect } from "react";
import {ThemeProvider as StyledThemeProvider} from "styled-components";
import { useLogger } from "./use-logger";

export interface Theme {
    backgroundColor: string;
    pageBackgroundColor: string;
    primaryColor: string;
    textPrimaryColor: string;
    textSecondaryColor: string; 
    borderColor: string;
    starColor: string;
    hoverColor: string;
    id: string;
}
export enum ThemeTypes {
    default = "default",
    dark = "dark"
}
export const DefaultTheme: Theme = {
    backgroundColor: "white",
    pageBackgroundColor: "#ECF5FD66",
    primaryColor: "#2d8cf0",
    textPrimaryColor: "#515a6e",
    textSecondaryColor: "#C9C9C9",
    borderColor: "#dcdee2",
    starColor: "#5f91ff",
    hoverColor: "rgba(0,0,0,0.1)",
    id: ThemeTypes.default,
};
const darkColor = "hsl(240,0%,10%)";
export const DarkTheme: Theme = {
    // backgroundColor: "#282c34",
    backgroundColor: darkColor,
    // pageBackgroundColor: "#282c34",
    pageBackgroundColor: "hsl(240,0%,8%)",

    primaryColor: "#2d8cf0",
    textPrimaryColor: "rgba(255,255,255,0.8)",
    textSecondaryColor: "rgba(255,255,255,0.3)",
    borderColor: "#ffffff55",
    starColor: "#ff0000",
    hoverColor: "rgba(255,255,255,0.05)",
    id: ThemeTypes.dark,
};

const themeList = [
    DefaultTheme,
    DarkTheme
];

export const ThemeContainer = createContainer((defaultTheme?: Theme) => {
    const KEY = "wenxiangdong.github.io/theme-id";
    const {info} = useLogger("theme hook");

    const lastThemeId = localStorage.getItem(KEY);
    const lastTheme = themeList.find(theme => theme.id === lastThemeId);
    
    const state = useState<Theme>(defaultTheme || lastTheme || DefaultTheme);

    useEffect(() => {
        info("set to local");
        localStorage.setItem(KEY, state[0].id);
    }, [state[0]]);
    return state;
});

export const ThemeProvider: React.FC<React.PropsWithChildren<any>> = ({children}) => {
    const ThemeProviderInner: React.FC<React.PropsWithChildren<any>> = ({children}) => {
        const [theme] = useContainer(ThemeContainer);
        return (
            <StyledThemeProvider theme={theme}>
                {children}
            </StyledThemeProvider>
        );
    }
    return (
        <ThemeContainer.Provider>
            <ThemeProviderInner>
                {children}
            </ThemeProviderInner>
        </ThemeContainer.Provider>
    );
}