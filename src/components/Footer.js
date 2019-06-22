import React, { Fragment } from "react";
import Box from "@material-ui/core/Box";
import MuiLink from "@material-ui/core/Link";
import { Link } from "gatsby";

const Footer = ({ padding }) => {
    return (
        <Fragment>
            <Box
                component="header"
                position="fixed"
                bottom={0}
                left={0}
                width="100%"
                zIndex="tooltip"
                display="flex"
                justifyContent="space-between"
                {...padding}
            >
                <MuiLink component={Link} to="/blog" color="textPrimary">
                    Blog
                </MuiLink>
            </Box>
        </Fragment>
    );
};

export default Footer;
