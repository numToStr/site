import React from "react";
import Box from "@material-ui/core/Box";
import { animated } from "react-spring";
import makeStyles from "@material-ui/styles/makeStyles";

const useStyles = makeStyles({
    uCase: {
        textTransform: "uppercase",
    },
});

const Im = props => {
    const classes = useStyles();
    return (
        <Box
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
            className={classes.uCase}
            {...props}
        >
            I'm
        </Box>
    );
};

export default Im;
