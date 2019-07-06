import React, { useMemo, useCallback } from "react";
import IconButton from "@material-ui/core/IconButton";
import DarkIcon from "@material-ui/icons/Brightness2TwoTone";
import LightIcon from "@material-ui/icons/FlareRounded";
import Box from "@material-ui/core/Box";
import { useThemeDispatch, useThemeContext } from "./ThemeContext";
import { useToggleAnimation } from "./Animation/useToggleAnimation";

const ThemeToggle = () => {
    const { palette } = useThemeContext();
    const dispatch = useThemeDispatch();

    const isDark = useMemo(() => palette.type === "dark", [palette.type]);
    const changeTheme = useCallback(() => {
        dispatch({ type: isDark ? "light" : "dark" });
    }, [isDark, dispatch]);

    const [transition, animated] = useToggleAnimation(isDark);

    return (
        <Box
            position="relative"
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            p={2}
        >
            {transition.map(({ item, __, props }) => {
                return item ? (
                    <IconButton
                        key="light-toggle-icon"
                        component={animated.button}
                        style={props}
                        onClick={changeTheme}
                        size="small"
                        color="inherit"
                    >
                        <LightIcon />
                    </IconButton>
                ) : (
                    <IconButton
                        key="dark-toggle-icon"
                        component={animated.button}
                        style={props}
                        onClick={changeTheme}
                        size="small"
                        color="inherit"
                    >
                        <DarkIcon />
                    </IconButton>
                );
            })}
        </Box>
    );
};

export default ThemeToggle;
