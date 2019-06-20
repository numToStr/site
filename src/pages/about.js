import React, { Fragment } from "react";

import SEO from "../components/SEO";
import useSiteMetadata from "../hooks/useSiteMetadata";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const about = () => {
    const { about } = useSiteMetadata();
    return (
        <Fragment>
            <SEO title="About" />
            <Box
                height="100%"
                display="flex"
                alignItems={{
                    xs: "flex-start",
                    sm: "center",
                }}
                pb={8}
            >
                <Grid container alignItems="center" justify="center">
                    <Grid item xs={12} md={5}>
                        <Box
                            fontSize={{
                                xs: "h2.fontSize",
                                md: "h1.fontSize",
                            }}
                            lineHeight={1}
                            m={0}
                            mb={2}
                            textAlign="center"
                            component="p"
                        >
                            Hello.
                        </Box>
                    </Grid>
                    <Grid item>
                        <Box
                            display="flex"
                            justifyContent={{
                                xs: "center",
                                md: "flex-start",
                            }}
                            py={4}
                            mr={{
                                md: 8,
                            }}
                        >
                            <Box
                                height={{ xs: 2, md: 200 }}
                                width={{ xs: 100, md: 2 }}
                                bgcolor="black"
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md>
                        <Box
                            px={{
                                xs: 2,
                                md: 0,
                            }}
                            pr={{
                                md: 4,
                            }}
                            pb={{
                                xs: 8,
                                md: 0,
                            }}
                        >
                            <Typography>{about}</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Fragment>
    );
};

export default about;
