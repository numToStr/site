import React, { Fragment } from "react";
import PropTypes from "prop-types";

import Header from "./Header";
import Footer from "./Footer";
import Box from "@material-ui/core/Box";

const px = {
    xs: 2.5,
    md: 4,
};

const padding = {
    py: {
        xs: 2.5,
        md: 3.5,
    },
    px,
};

const Layout = ({ children }) => (
    <Fragment>
        <Header padding={padding} />
        <Box
            height="100%"
            py={10}
            px={{
                xs: 5,
                md: 0,
            }}
            style={{ overflowY: "auto" }}
        >
            {children}
        </Box>
        <Footer padding={padding} />
    </Fragment>
);

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;
