import React, { useState, Fragment, useCallback, memo } from "react";
import BaseDrawer from "./Drawer/Drawer";
import DrawerButton from "./Drawer/DrawerButton";
import Box from "@material-ui/core/Box";
import MuiLink from "@material-ui/core/Link";
import { navigate } from "gatsby";

const Header = () => {
    const [show, setShow] = useState(false);

    const showDrawer = f =>
        typeof f === "boolean" ? setShow(f) : setShow(v => !v);

    const handleClick = useCallback(
        (link, flag) => ev => {
            ev.preventDefault();
            showDrawer(flag);
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
                py={{
                    xs: 2.5,
                    md: 3.5,
                }}
                px={{
                    xs: 2.5,
                    md: 4,
                }}
            >
                <MuiLink
                    underline="none"
                    href="/"
                    color="secondary"
                    onClick={handleClick("/", false)}
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

export default memo(Header);
