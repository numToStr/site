import React, { Fragment } from "react";
import SEO from "../components/SEO";
import Box from "@material-ui/core/Box";
import Bar from "../components/Bar";

const NotFoundPage = () => (
    <Fragment>
        <SEO title="404: Not found" />
        <Box
            height="100%"
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
        >
            <Box
                component="p"
                lineHeight={1}
                m={0}
                mb={4}
                fontSize={{
                    xs: "h2.fontSize",
                    sm: "h1.fontSize",
                    md: "h1.fontSize",
                }}
            >
                4 0_o 4
            </Box>
            <Bar width={100} mb={5} />
            <Box
                component="p"
                lineHeight={1}
                m={0}
                mb={3}
                fontSize={{
                    xs: "h5.fontSize",
                    sm: "h4.fontSize",
                }}
            >
                You are lost
            </Box>
            <Box
                component="p"
                lineHeight={1}
                m={0}
                mb={2}
                fontSize={{
                    xs: "body2.fontSize",
                    sm: "body1.fontSize",
                }}
            >
                {/* [Sadness Everywhere] */}
                {/* [Sad Music Playing] */}
                [Everyone Disliked That]
            </Box>
        </Box>
    </Fragment>
);

export default NotFoundPage;
