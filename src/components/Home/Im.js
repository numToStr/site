import React from "react";
import Box from "@material-ui/core/Box";
import { animated } from "react-spring";

const Im = props => {
    return (
        <Box
            className="text-uppercase"
            component={animated.div}
            fontSize={{
                xs: "h5.fontSize",
                sm: "h4.fontSize",
                md: "h3.fontSize",
            }}
            lineHeight={1}
            mb={3}
            letterSpacing={{
                sm: 1,
            }}
            {...props}
        >
            I'm
        </Box>
    );
};

export default Im;
