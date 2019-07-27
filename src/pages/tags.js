import React, { Fragment } from "react";
import { Link, graphql } from "gatsby";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Fab from "@material-ui/core/Fab";
import { kebabCase } from "../utils/string.utils";
import SEO from "../components/SEO";
import Bar from "../components/Bar";

export const pageQuery = graphql`
    query {
        site {
            siteMetadata {
                title
            }
        }
        allMarkdownRemark(limit: 2000) {
            group(field: frontmatter___tags) {
                fieldValue
                totalCount
            }
        }
    }
`;

const TagsPage = ({
    data: {
        allMarkdownRemark: { group },
    },
}) => (
    <Fragment>
        <SEO title="Tags" />
        <Grid container justify="center">
            <Grid item xs={12} sm={8} md={6}>
                <Typography variant="h3" paragraph>
                    Tags
                </Typography>
                <Bar />
                {group.map(tag => (
                    <Box
                        key={tag.fieldValue}
                        display="inline-block"
                        m={0.75}
                        ml={0}
                    >
                        <Fab
                            component={Link}
                            to={`/tags/${kebabCase(tag.fieldValue)}/`}
                            variant="extended"
                            size="medium"
                            color="primary"
                        >
                            {tag.fieldValue} ({tag.totalCount})
                        </Fab>
                    </Box>
                ))}
            </Grid>
        </Grid>
    </Fragment>
);

export default TagsPage;
