import React, { Fragment } from "react";

import SEO from "../components/SEO";
import useBlogs from "../hooks/useBlogs";
import DateFormat from "../components/DateFormat";

import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { Link } from "gatsby";
import { useTrail, config, animated } from "react-spring";

const blog = () => {
    const blogs = useBlogs();

    const trails = useTrail(blogs.length, {
        config: config.stiff,
        delay: 50,
        from: { x: -15, opacity: 0 },
        to: { x: 0, opacity: 1 },
    });

    const list = trails.map(({ x, opacity }, $i) => {
        const {
            node: {
                frontmatter: { title, date },
                excerpt,
                fields: { slug },
            },
        } = blogs[$i];

        return (
            <Box
                key={title}
                my={3}
                component={animated.div}
                style={{
                    opacity,
                    transform: x.interpolate(
                        x => `translate3d(${x}px,${x}px,0)`
                    ),
                }}
            >
                <Box
                    component={Link}
                    to={`/blog/${slug}`}
                    fontSize={{
                        xs: "h6.fontSize",
                        md: "h5.fontSize",
                    }}
                    color="secondary.main"
                    fontWeight="fontWeightBold"
                    display="block"
                    mb={1}
                >
                    {title}
                </Box>
                <DateFormat
                    date={date}
                    component="p"
                    variant="caption"
                    margin={{
                        mb: 1,
                    }}
                />
                <Typography variant="body2" color="textPrimary">
                    {excerpt}
                </Typography>
            </Box>
        );
    });

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
