import React, {
    createContext,
    useContext,
    useReducer,
    useEffect,
    useMemo,
} from "react";
import themeConfig from "../styles/theme.config";

const ThemeContext = createContext(null);
const ThemeDispatch = createContext(null);

const initialTheme = {
    paletteType: "light",
};

const reducer = (__, { type }) => {
    switch (type) {
        case "light":
            return { paletteType: "light" };
        case "dark":
            return { paletteType: "dark" };
        default:
            return initialTheme;
    }
};

export const ThemeProvider = ({ children }) => {
    const [{ paletteType }, dispatch] = useReducer(reducer, initialTheme);

    const theme = useMemo(() => {
        return themeConfig(paletteType);
    }, [paletteType]);

    useEffect(() => {
        // This variable comes from no-theme-flash plugin
        const type = window.__theme;

        dispatch({ type });

        const classList = document.body.classList;
        // Remove No Flash classes after initial reload
        // And let material-ui to handle theme changes after mount
        classList.remove("light", "dark");
        // This will make smooth transitioning in light/dark mode after mount
        // Dont' add this class directly through css otherwise it will make theme flash
        classList.add("bg-transition");
    }, []);

    useEffect(() => {
        localStorage.setItem("theme-type", paletteType);
        window.__theme = paletteType;
    }, [paletteType]);

    return (
        <ThemeContext.Provider value={theme}>
            <ThemeDispatch.Provider value={dispatch}>
                {children}
            </ThemeDispatch.Provider>
        </ThemeContext.Provider>
    );
};

export const useThemeDispatch = () => {
    const context = useContext(ThemeDispatch);

    if (!context) {
        throw new Error(
            "useThemeDispatch must be used within a ThemeDispatchProvider"
        );
    }

    return context;
};

export const useThemeContext = () => {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error(
            "useThemeContext must be used within a ThemeContextProvider"
        );
    }

    return context;
};
