import red from "@material-ui/core/colors/red";
import grey from "@material-ui/core/colors/grey";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

// A custom theme for this app
const theme = createMuiTheme({
    palette: {
        type: "dark",
        primary: grey,
        secondary: red,
        background: {
            default: "#000",
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
