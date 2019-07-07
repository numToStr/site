import React from "react";
import Box from "@material-ui/core/Box";

const Bar = props => {
    return (
        <Box
            width={100}
            height={2}
            bgcolor="text.primary"
            borderRadius="borderRadius"
            my={3}
            {...props}
        />
    );
};

export default Bar;
