import React, { Fragment, useMemo, useEffect } from "react";
import { graphql } from "gatsby";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import styled from "@material-ui/core/styles/styled";
import SEO from "../components/SEO";
import { useFadeIn } from "../components/Animation/useFadeIn";
import DateFormat from "../components/DateFormat";
import TimeToRead from "../components/TimeToRead";
import BlogTags from "../components/BlogTags";
import Bar from "../components/Bar";
import NavigationLink from "../components/NavigationLink";

const StyledBox = styled(Box)(
    ({
        theme: {
            spacing,
            palette: { primary },
        },
    }) => ({
        "& a": {
            color: primary.main,
        },
        "& blockquote": {
            margin: 0,
            padding: spacing(0.5, 2),
            borderLeft: `3px solid ${primary.main}`,
        },
    })
);

export const data = graphql`
    query($slug: String!) {
        markdownRemark(fields: { slug: { eq: $slug } }) {
            timeToRead
            frontmatter {
                title
                date
                tags
            }
            html
        }
    }
`;

const Blog = ({
    data: {
        markdownRemark: {
            timeToRead,
            frontmatter: { title, date, tags },
            html,
        },
    },
    pageContext: { previous, next },
}) => {
    const navs = useMemo(
        () => [
            { text: "Previous", to: previous, type: "previous" },
            { text: "Next", to: next, type: "next" },
        ],
        [previous, next]
    );

    const [fadeIn, animated] = useFadeIn();

    // To fixing the problem where gatsby link remembering the scroll position
    useEffect(() => {
        const htmlElem = document.querySelector("html");

        htmlElem.setAttribute(
            "style",
            "height: initial !important; overflow-y: auto;"
        );
        return () => {
            htmlElem.removeAttribute("style");
        };
    }, []);

    return (
        <Fragment>
            <SEO title={title} />
            <Grid
                component={animated.div}
                style={fadeIn}
                container
                justify="center"
            >
                <Grid item xs={12} sm={10} md={8}>
                    <Box
                        component="p"
                        lineHeight={1}
                        m={0}
                        fontSize={{
                            xs: "h5.fontSize",
                            md: "h4.fontSize",
                        }}
                        color="primary.main"
                        fontWeight="fontWeightBold"
                        mb={2}
                    >
                        {title}
                    </Box>
                    <Box display="flex">
                        <DateFormat date={date} />
                        <TimeToRead time={timeToRead} />
                    </Box>
                    <StyledBox
                        py={2}
                        fontSize={{
                            xs: "body2.fontSize",
                            md: "body1.fontSize",
                        }}
                        dangerouslySetInnerHTML={{ __html: html }}
                    />
                    <Bar width="100%" my={2} />
                    <BlogTags tags={tags} />
                    <Box display="flex" justifyContent="space-between" pt={3}>
                        {navs.map(nav =>
                            nav.to ? (
                                <NavigationLink {...nav} />
                            ) : (
                                <div key={nav.to} />
                            )
                        )}
                    </Box>
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default Blog;
