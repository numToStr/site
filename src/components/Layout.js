import React, { Fragment } from "react";
import PropTypes from "prop-types";

import Header from "./Header";
import Box from "@material-ui/core/Box";

const Layout = ({ children }) => (
    <Fragment>
        <Header />
        <Box
            height="100%"
            py={10}
            px={{
                xs: 2.5,
                md: 0,
            }}
            style={{ overflowY: "auto" }}
        >
            {children}
        </Box>
    </Fragment>
);

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;
