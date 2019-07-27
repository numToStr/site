import React from "react";
import { Link } from "gatsby";
import Box from "@material-ui/core/Box";
import MuiLink from "@material-ui/core/Link";
import PreviousIcon from "@material-ui/icons/KeyboardArrowLeftRounded";
import NextIcon from "@material-ui/icons/KeyboardArrowRightRounded";

const NavigationLink = ({ text, type, to, ...props }) => {
    return (
        <Box
            clone
            display="flex"
            alignItems="center"
            lineHeight={1}
            fontWeight="fontWeightBold"
            {...props}
        >
            <MuiLink component={Link} to={to} color="textPrimary">
                {type === "previous" && <PreviousIcon />}
                {text}
                {type === "next" && <NextIcon />}
            </MuiLink>
        </Box>
    );
};

export default NavigationLink;
