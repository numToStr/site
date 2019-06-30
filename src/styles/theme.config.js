import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

// A custom theme for this app
const theme = createMuiTheme({
    palette: {
        type: "dark",
        primary: {
            main: "#ff1744", // real red
            // main: "#00e676", // green
        },
        secondary: {
            main: "#ff0",
        },
        background: {
            default: "#000",
        },
    },
    overrides: {
        MuiFab: {
            root: {
                backgroundColor: "#fff",
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

export default theme;
