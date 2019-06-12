import React, { useState, Fragment } from "react";
import BaseDrawer from "./Drawer/Drawer";
import DrawerButton from "./Drawer/DrawerButton";
import Box from "@material-ui/core/Box";
import MuiLink from "@material-ui/core/Link";
import { Link } from "gatsby";

const Header = () => {
    const [show, setShow] = useState(false);

    const showDrawer = () => setShow(v => !v);

    return (
        <Fragment>
            <Box
                component="header"
                position="fixed"
                width="100%"
                zIndex="tooltip"
                display="flex"
                justifyContent="space-between"
                py={3.5}
                px={3.5}
            >
                <MuiLink
                    underline="none"
                    component={Link}
                    to="/"
                    color="secondary"
                >
                    Logo
                </MuiLink>
                <DrawerButton onClick={showDrawer}>Show</DrawerButton>
            </Box>
            <BaseDrawer show={show} onTap={showDrawer} />
        </Fragment>
    );
};

export default Header;
