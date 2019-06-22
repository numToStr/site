import React, { Fragment } from "react";

import useSiteMetadata from "../hooks/useSiteMetadata";
import SEO from "../components/SEO";
import Box from "@material-ui/core/Box";

const IndexPage = () => {
    const { name, title } = useSiteMetadata();

    return (
        <Fragment>
            <SEO title="Home" />
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                height="100%"
                width="100%"
                px={2}
            >
                <Box mb={8}>
                    <Box
                        fontSize={{
                            xs: "h5.fontSize",
                            sm: "h4.fontSize",
                            md: "h3.fontSize",
                        }}
                        lineHeight={1}
                        mb={3}
                        letterSpacing={{
                            xs: 0,
                            sm: 1,
                        }}
                    >
                        I'M
                    </Box>
                    <Box
                        fontSize={{
                            xs: "h3.fontSize",
                            sm: "h2.fontSize",
                            md: "h1.fontSize",
                        }}
                        lineHeight={1}
                        mb={3}
                        letterSpacing={1}
                        fontWeight="fontWeightBold"
                        color="secondary.main"
                        style={{ textTransform: "uppercase" }}
                    >
                        {name}.
                    </Box>
                    <Box display="flex" alignItems="center">
                        <Box
                            width={{
                                xs: 30,
                                md: 50,
                            }}
                            height={3}
                            bgcolor="text.primary"
                            mr={2}
                            borderRadius="borderRadius"
                        />
                        <Box
                            fontSize={{
                                xs: "body1.fontSize",
                                sm: "h5.fontSize",
                                md: "h4.fontSize",
                            }}
                            lineHeight={1}
                            letterSpacing={1}
                        >
                            {title}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Fragment>
    );
};

export default IndexPage;
