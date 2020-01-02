import {createContainer, useContainer} from "unstated-next";
import React, { useState } from "react";
import {ThemeProvider as StyledThemeProvider} from "styled-components";

export interface Theme {
    backgroundColor: string;
    pageBackgroundColor: string;
    primaryColor: string;
    textPrimaryColor: string;
    textSecondaryColor: string; 
    borderColor: string;
    starColor: string;
    hoverColor: string;
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
};

export const DarkTheme: Theme = {
    // backgroundColor: "#282c34",
    backgroundColor: "#202028",
    // pageBackgroundColor: "#282c34",
    pageBackgroundColor: "#202028",

    primaryColor: "#2d8cf0",
    textPrimaryColor: "#ffffffdd",
    textSecondaryColor: "#ffffff55",
    borderColor: "#ffffff55",
    starColor: "#ff0000",
    hoverColor: "rgba(255,255,255,0.05)",
};

export const ThemeContainer = createContainer((defaultTheme?: Theme) => {
    const [theme, setTheme] = useState(defaultTheme || DarkTheme)
    return {
        theme,
        setTheme,
    }
});

export const ThemeProvider: React.FC<React.PropsWithChildren<any>> = ({children}) => {
    const ThemeProviderInner: React.FC<React.PropsWithChildren<any>> = ({children}) => {
        const {theme} = useContainer(ThemeContainer);
        console.log(theme);
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