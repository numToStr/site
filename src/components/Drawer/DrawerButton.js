import React from "react";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

const DrawerButton = props => {
    return (
        <Box position="fixed" zIndex="tooltip" top="1rem" right="1rem">
            <Button size="small" variant="contained" {...props} />
        </Box>
    );
};

export default DrawerButton;
