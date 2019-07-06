import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

// A custom theme for this app
const themeConfig = type => {
    return createMuiTheme({
        palette: {
            type,
            primary: {
                main: "#ff1744", // real red
                // main: "#00e676", // green
            },
            secondary: {
                main: "#ff0",
            },
            background: {
                default: type === "dark" ? "#000" : "#fff",
            },
        },
        overrides: {
            MuiFab: {
                root: {
                    backgroundColor: type === "dark" ? "#fff" : "#ddd",
                },
            },
        },
        typography: {
            fontFamily: [
                "Roboto Mono",
                "monospace",
                "Roboto",
                '"Helvetica Neue"',
                "Arial",
                "sans-serif",
            ].join(","),
        },
    });
};

export default themeConfig;
