import React, { Fragment } from "react";
import Box from "@material-ui/core/Box";

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
                Just a Footer
            </Box>
        </Fragment>
    );
};

export default Footer;
