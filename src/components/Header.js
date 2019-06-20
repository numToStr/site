import React, { useState, Fragment, useCallback } from "react";
import BaseDrawer from "./Drawer/Drawer";
import DrawerButton from "./Drawer/DrawerButton";
import Box from "@material-ui/core/Box";
import MuiLink from "@material-ui/core/Link";
import { navigate } from "gatsby";

const Header = ({ padding }) => {
    const [show, setShow] = useState(false);

    const showDrawer = () => setShow(v => !v);

    const handleClick = useCallback(
        link => ev => {
            ev.preventDefault();
            showDrawer();
            navigate(link);
        },
        [showDrawer, navigate]
    );

    return (
        <Fragment>
            <Box
                component="header"
                position="fixed"
                width="100%"
                zIndex="tooltip"
                display="flex"
                justifyContent="space-between"
                {...padding}
            >
                <MuiLink
                    underline="none"
                    href="/"
                    color="secondary"
                    onClick={handleClick("/")}
                >
                    Logo
                </MuiLink>
                <DrawerButton onClick={showDrawer} open={show}>
                    Show
                </DrawerButton>
            </Box>
            <BaseDrawer open={show} onTap={handleClick} />
        </Fragment>
    );
};

export default Header;
