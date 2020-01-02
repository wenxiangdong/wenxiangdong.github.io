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
}
export const DefaultTheme: Theme = {
    backgroundColor: "white",
    pageBackgroundColor: "#ECF5FD66",
    primaryColor: "#2d8cf0",
    textPrimaryColor: "#515a6e",
    textSecondaryColor: "#808695",
    borderColor: "#dcdee2",
    starColor: "#5f91ff",
};

export const DarkTheme: Theme = {
    backgroundColor: "#282c34",
    pageBackgroundColor: "#282c34",
    primaryColor: "#2d8cf0",
    textPrimaryColor: "#ffffff",
    textSecondaryColor: "#ffffff",
    borderColor: "#ffffff",
    starColor: "#ff0000",
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