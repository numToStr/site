import React, { Fragment } from "react";

import SEO from "../components/SEO";
import useBlogs from "../hooks/useBlogs";
import DateFormat from "../components/DateFormat";

import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { Link } from "gatsby";
import Bar from "../components/Bar";
import { useFadeIn } from "../components/Animation/useFadeIn";
import { useStaggeredSlideIn } from "../components/Animation/useStaggeredSlideIn";

const blog = () => {
    const blogs = useBlogs();

    const [fadeIn, animated] = useFadeIn();
    const [trails] = useStaggeredSlideIn(blogs.length);

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
                    transform: x.to(_x => `translate3d(${_x}px,${_x}px,0)`),
                }}
            >
                <Box
                    component={Link}
                    to={`/blog/${slug}`}
                    fontSize={{
                        xs: "h6.fontSize",
                        md: "h5.fontSize",
                    }}
                    color="primary.main"
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
                    {list}
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default blog;
