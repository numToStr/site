import React, { Fragment, useMemo, useEffect } from "react";
import { graphql, Link } from "gatsby";
import SEO from "../components/SEO";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import MuiLink from "@material-ui/core/Link";
import DateFormat from "../components/DateFormat";
import PreviousIcon from "@material-ui/icons/KeyboardArrowLeftRounded";
import NextIcon from "@material-ui/icons/KeyboardArrowRightRounded";
import { Typography } from "@material-ui/core";

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

const PreviousComp = () => (
    <Fragment>
        <PreviousIcon />
        <Typography variant="subtitle2">Previous</Typography>
    </Fragment>
);
const NextComp = () => (
    <Fragment>
        <Typography variant="subtitle2">Next</Typography>
        <NextIcon />
    </Fragment>
);

const Blog = ({
    data: {
        markdownRemark: {
            frontmatter: { title, date },
            html,
        },
    },
    pageContext: { previous, next },
}) => {
    const navs = useMemo(
        () => [
            { component: PreviousComp, link: previous },
            { component: NextComp, link: next },
        ],
        [previous, next]
    );

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
                        color="primary.main"
                        fontWeight="fontWeightBold"
                        mb={2}
                    >
                        {title}
                    </Box>
                    <DateFormat date={date} variant="body2" />
                    <Box
                        pt={1}
                        fontSize={{
                            xs: "body2.fontSize",
                            md: "body1.fontSize",
                        }}
                        dangerouslySetInnerHTML={{ __html: html }}
                    />
                    <Box display="flex" justifyContent="space-between" pt={3}>
                        {navs.map(({ component: Comp, link }) =>
                            link ? (
                                <MuiLink
                                    key={link}
                                    component={Link}
                                    to={`/blog/${link}`}
                                    color="textPrimary"
                                >
                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        lineHeight={1}
                                    >
                                        <Comp />
                                    </Box>
                                </MuiLink>
                            ) : (
                                <div key={link} />
                            )
                        )}
                    </Box>
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default Blog;
