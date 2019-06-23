import React from "react";
import Box from "@material-ui/core/Box";
import { animated } from "react-spring";

import useSiteMetadata from "../../hooks/useSiteMetadata";
import makeStyles from "@material-ui/styles/makeStyles";

const useStyles = makeStyles({
    uCase: {
        textTransform: "uppercase",
    },
});

const Name = props => {
    const { name } = useSiteMetadata();
    const classes = useStyles();

    return (
        <Box
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
            color="secondary.main"
            className={classes.uCase}
            {...props}
        >
            {name}.
        </Box>
    );
};

export default Name;
