import React from "react";

import DrawerBackground from "./DrawerBackground";
import DrawerLinks from "./DrawerLinks";

const BaseDrawer = ({ open, onTap }) => {
    return (
        <DrawerBackground open={open}>
            <DrawerLinks open={open} onTap={onTap} />
        </DrawerBackground>
    );
};

export default BaseDrawer;
