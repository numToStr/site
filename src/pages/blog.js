import React, { Fragment } from "react";

import SEO from "../components/SEO";
import useBlogs from "../hooks/useBlogs";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";

const blog = () => {
    const blogs = useBlogs();

    const list = blogs.map(
        ({
            node: {
                frontmatter: { title, date },
                excerpt,
            },
        }) => (
            <Box key={title} my={3}>
                <Box mb={1}>
                    <Link href="#!" variant="h6" color="textPrimary">
                        {title}
                    </Link>
                </Box>
                <Typography component="p" variant="caption">
                    {date}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {excerpt}
                </Typography>
            </Box>
        )
    );

    return (
        <Fragment>
            <SEO title="Blog" />
            <Grid container justify="center">
                <Grid item xs={12} sm={8} md={6}>
                    <Typography variant="h3" paragraph>
                        Blog
                    </Typography>
                    <Box
                        width={100}
                        height={2}
                        bgcolor="text.primary"
                        borderRadius="borderRadius"
                        my={3}
                    />
                    {list}
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default blog;
