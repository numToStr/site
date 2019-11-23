import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import CssBaseline from "@material-ui/core/CssBaseline";
import ThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import { useThemeContext } from "../../src/components/ThemeContext";

export default function TopLayout(props) {
    const theme = useThemeContext();

    return (
        <React.Fragment>
            <Helmet>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
                />
                <link
                    href="https://fonts.googleapis.com/css?family=Roboto+Mono:400,500&display=swap"
                    rel="stylesheet"
                />
            </Helmet>
            <ThemeProvider theme={theme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                {props.children}
            </ThemeProvider>
        </React.Fragment>
    );
}

TopLayout.propTypes = {
    children: PropTypes.node,
};
