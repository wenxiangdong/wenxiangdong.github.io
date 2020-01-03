import React, { useCallback, useState, useEffect, useContext } from "react";
import {ThemeTypes, Theme, ThemeContainer, DefaultTheme, DarkTheme} from "../../hooks/use-theme";
import styled, { ThemeContext } from "styled-components";
import classnames from "classnames";
import { useContainer } from "unstated-next";
import { useLogger } from "../../hooks/use-logger";

const themeList = [
    {
        id: ThemeTypes.default,
        name: "常规主题",
        theme: DefaultTheme,
    },
    {
        id: ThemeTypes.dark,
        name: "暗色主题",
        theme: DarkTheme,
    },
];

const getThemeName = (id: string) => {
    const names = themeList.reduce<{[id: string]: string}>((acc, cur) => ({
        ...acc,
        [cur.id]: cur.name,
    }), {});
    return names[id];
}


// styled
const Select = styled.div`
    padding: 6px 12px;
    border: ${props => (props.theme as Theme).borderColor} 1px solid;
    border-radius: 4px;
    color: ${props => (props.theme as Theme).textSecondaryColor};
    background-color: ${props => (props.theme as Theme).backgroundColor};
    position: relative;
    display: inline-block;
    min-width: 150px;
    cursor: pointer;
    transition: all .5s ease;

    &:hover {
        color: ${props => (props.theme as Theme).textPrimaryColor};
    }

    &>.overlay {
        position: absolute;
        z-index: -10;
        left: 0;
        top: calc(100% + 8px);
        /* margin: 8px 0; */
        padding: 6px 12px;
        width: 100%;

        border: ${props => (props.theme as Theme).borderColor} 1px solid;
        border-radius: 4px;
        
        overflow: hidden;
        text-overflow: ellipsis;

        background-color: ${props => (props.theme as Theme).backgroundColor};

        opacity: 0;
        transform: translateY(-50%);
        transition: all .5s ease;

        &.overlay--active {
            opacity: 1;
            transform: translateY(0);
            z-index: 10;
        }
    }
`;

const ThemeSwitcher: React.FC<React.HTMLAttributes<any>> = () => {
    const {info} = useLogger(ThemeSwitcher.name);
    const [showOptions, setShowOptions] = useState(false);
    const [currentTheme, setTheme] = useContainer(ThemeContainer);

    const handleTriggerSelect = useCallback((e: React.SyntheticEvent) => {
        e.stopPropagation();
        e.preventDefault();
        setShowOptions(preState => !preState);
    }, []);

    const handleChangeTheme = useCallback((id, e: React.SyntheticEvent) => {
        e.stopPropagation();
        e.preventDefault();
        const nextTheme = themeList.find(theme => theme.id === id);
        nextTheme && setTheme(preTheme => preTheme.id === nextTheme.id ? preTheme : nextTheme.theme);
    }, [currentTheme]);
    // click body cancle
    useEffect(() => {
        const handleColseOveraly = (e: MouseEvent) => {
            setShowOptions(false);
        }
        document.body.addEventListener("click", handleColseOveraly);
        return () => {
            document.body.removeEventListener("click", handleColseOveraly);
        }
    }, []);
    const overlayClassName = classnames(["overlay", {"overlay--active": showOptions}]);
    return (
        <Select onClick={handleTriggerSelect}>
            <span>{getThemeName(currentTheme.id)}</span>
            <div className={overlayClassName}>
                {
                    themeList.map(theme => (
                        <div key={theme.id} onClick={(e) => handleChangeTheme(theme.id, e)}>
                            {theme.name}
                        </div>
                    ))
                }
            </div>
        </Select>
    );
}

export default ThemeSwitcher;