import React, { Fragment, useState } from "react";

import DrawerBackground from "./DrawerBackground";
import DrawerLinks from "./DrawerLinks";
import DrawerButton from "./DrawerButton";

const BaseDrawer = () => {
    const [show, setShow] = useState(false);

    const showDrawer = () => setShow(v => !v);

    return (
        <Fragment>
            <DrawerButton onClick={showDrawer}>Show</DrawerButton>
            <DrawerBackground open={show}>
                <DrawerLinks open={show} onTap={showDrawer} />
            </DrawerBackground>
        </Fragment>
    );
};

export default BaseDrawer;
