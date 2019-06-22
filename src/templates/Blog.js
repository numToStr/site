import React, { Fragment } from "react";
import { graphql } from "gatsby";
import SEO from "../components/SEO";
import { Grid, Typography, Box } from "@material-ui/core";

export const data = graphql`
    query($slug: String!) {
        markdownRemark(fields: { slug: { eq: $slug } }) {
            frontmatter {
                title
                date
            }
            html
        }
    }
`;

const Blog = ({
    data: {
        markdownRemark: {
            frontmatter: { title, date },
            html,
        },
    },
}) => {
    return (
        <Fragment>
            <SEO title={title} />
            <Grid container justify="center">
                <Grid item xs={12} sm={10} md={8}>
                    <Box
                        component="p"
                        lineHeight={1}
                        m={0}
                        fontSize={{
                            xs: "h5.fontSize",
                            md: "h4.fontSize",
                        }}
                        color="secondary.main"
                        fontWeight="fontWeightBold"
                        mb={2}
                    >
                        {title}
                    </Box>
                    <Typography color="textSecondary">{date}</Typography>
                    <Box
                        pt={1}
                        pb={10}
                        fontSize="body1.fontSize"
                        dangerouslySetInnerHTML={{ __html: html }}
                    />
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default Blog;
