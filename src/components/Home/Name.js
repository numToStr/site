import React from "react";
import Box from "@material-ui/core/Box";
import { animated } from "react-spring";

import useSiteMetadata from "../../hooks/useSiteMetadata";

const Name = props => {
    const { name } = useSiteMetadata();

    return (
        <Box
            className="text-uppercase"
            component={animated.div}
            fontSize={{
                xs: "h3.fontSize",
                sm: "h2.fontSize",
                md: "h1.fontSize",
            }}
            lineHeight={1}
            mb={3}
            letterSpacing={{ sm: 3 }}
            fontWeight="fontWeightBold"
            color="primary.main"
            {...props}
        >
            {name}.
        </Box>
    );
};

export default Name;
