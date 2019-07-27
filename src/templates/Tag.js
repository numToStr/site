import React, { Fragment } from "react";
import { graphql } from "gatsby";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import SEO from "../components/SEO";
import Bar from "../components/Bar";
import BlogCards from "../components/BlogCards";
import NavigationLink from "../components/NavigationLink";

export const data = graphql`
    query($tag: String) {
        allMarkdownRemark(
            limit: 2000
            sort: { fields: [frontmatter___date], order: DESC }
            filter: { frontmatter: { tags: { in: [$tag] } } }
        ) {
            count: totalCount
            edges {
                node {
                    timeToRead
                    frontmatter {
                        title
                        date
                    }
                    excerpt(format: PLAIN, pruneLength: 50)
                    fields {
                        slug
                    }
                }
            }
        }
    }
`;

const Tags = ({ pageContext, data }) => {
    const { tag } = pageContext;
    const { edges, count } = data.allMarkdownRemark;

    const tagHeader = `${count} post${
        count === 1 ? "" : "s"
    } tagged with "${tag}"`;

    return (
        <Fragment>
            <SEO title={tagHeader} />
            <Grid container justify="center">
                <Grid item xs={12} sm={8} md={6}>
                    <Typography variant="h5" paragraph>
                        {tagHeader}
                    </Typography>
                    <Bar />
                    <BlogCards blogs={edges} />
                    <NavigationLink
                        text="All Tags"
                        type="previous"
                        to="/tags"
                    />
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default Tags;
