import React from "react";

import DrawerBackground from "./DrawerBackground";
import DrawerLinks from "./DrawerLinks";

const BaseDrawer = ({ show, onTap }) => {
    return (
        <DrawerBackground open={show}>
            <DrawerLinks open={show} onTap={onTap} />
        </DrawerBackground>
    );
};

export default BaseDrawer;
