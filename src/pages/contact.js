import React, { Fragment } from "react";

import SEO from "../components/SEO";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import MuiLink from "@material-ui/core/Link";
import useSiteMetadata from "../hooks/useSiteMetadata";
import { useFadeIn } from "../components/Animation/useFadeIn";

const contact = () => {
    const { social } = useSiteMetadata();
    const [fadeIn, animated] = useFadeIn();

    return (
        <Fragment>
            <SEO title="Contact" />
            <Box
                style={fadeIn}
                component={animated.div}
                height="100%"
                width="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <Box mb={8}>
                    <Typography variant="h5" paragraph>
                        You can find me on...
                    </Typography>
                    <MuiLink
                        href={`https://twitter.com/${social.twitter}`}
                        color="textPrimary"
                        target="_blank"
                        rel="noopener noreferrer"
                        display="block"
                        variant="body1"
                        paragraph
                    >
                        twitter
                    </MuiLink>
                    <MuiLink
                        href={`https://github.com/${social.github}`}
                        color="textPrimary"
                        target="_blank"
                        rel="noopener noreferrer"
                        display="block"
                        variant="body1"
                        paragraph
                    >
                        github
                    </MuiLink>
                    <Typography align="center" paragraph>
                        or
                    </Typography>
                    <Typography paragraph variant="h5">
                        You can mail me at...
                    </Typography>
                    <MuiLink
                        href="mailto:sudo@vikasraj.dev"
                        variant="body1"
                        color="textPrimary"
                    >
                        sudo@vikasraj.dev
                    </MuiLink>
                </Box>
            </Box>
        </Fragment>
    );
};

export default contact;
