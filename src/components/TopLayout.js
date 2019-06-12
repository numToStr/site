import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import CssBaseline from "@material-ui/core/CssBaseline";
import ThemeProvider from "@material-ui/styles/ThemeProvider";

import "../styles/index.scss";
import theme from "../styles/theme.config";

export default function TopLayout({ children }) {
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
                {children}
            </ThemeProvider>
        </React.Fragment>
    );
}

TopLayout.propTypes = {
    children: PropTypes.node,
};
