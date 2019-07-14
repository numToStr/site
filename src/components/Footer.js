import React, { Fragment, memo } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import MuiLink from "@material-ui/core/Link";
import ArrayIcon from "@material-ui/icons/PlayArrowTwoTone";
import { Link } from "gatsby";
import CustomFab from "./CustomFab";
import { useFadeIn } from "./Animation/useFadeIn";

const Footer = () => {
    const [fadeIn, animated] = useFadeIn();

    return (
        <Fragment>
            <Box
                style={fadeIn}
                component={animated.header}
                position="fixed"
                bottom={0}
                left={0}
                width="100%"
                display="flex"
                justifyContent="flex-end"
                py={{
                    xs: 2.5,
                    md: 3.5,
                }}
                px={{
                    xs: 2.5,
                    md: 4,
                }}
            >
                <Box clone display="flex" alignItems="center">
                    <MuiLink component={Link} to="/blog" color="textPrimary">
                        <Box lineHeight={1} px={1}>
                            <Typography variant="body2">Blog</Typography>
                        </Box>
                        <CustomFab size="small">
                            <ArrayIcon color="primary" fontSize="small" />
                        </CustomFab>
                    </MuiLink>
                </Box>
            </Box>
        </Fragment>
    );
};

export default memo(Footer);
