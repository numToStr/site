import React, { Fragment } from "react";
import PropTypes from "prop-types";

import Header from "./Header";

const Layout = ({ children }) => (
    <Fragment>
        <Header />
        {children}
    </Fragment>
);

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;
