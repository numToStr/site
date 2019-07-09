import React, { Fragment } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import SEO from "../components/SEO";
import useBlogs from "../hooks/useBlogs";
import Bar from "../components/Bar";
import { useFadeIn } from "../components/Animation/useFadeIn";
import BlogCards from "../components/BlogCards";

const blog = () => {
    const blogs = useBlogs();

    const [fadeIn, animated] = useFadeIn();

    return (
        <Fragment>
            <SEO title="Blog" />
            <Box clone pb={2}>
                <Grid
                    style={fadeIn}
                    component={animated.div}
                    container
                    justify="center"
                >
                    <Grid item xs={12} sm={8} md={6}>
                        <Typography variant="h3" paragraph>
                            Blog
                        </Typography>
                        <Bar />
                        <BlogCards blogs={blogs} />
                    </Grid>
                </Grid>
            </Box>
        </Fragment>
    );
};

export default blog;
