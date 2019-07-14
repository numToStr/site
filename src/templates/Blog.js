import React, { Fragment, useMemo, useEffect } from "react";
import { graphql, Link } from "gatsby";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import MuiLink from "@material-ui/core/Link";
import styled from "@material-ui/styles/styled";
import PreviousIcon from "@material-ui/icons/KeyboardArrowLeftRounded";
import NextIcon from "@material-ui/icons/KeyboardArrowRightRounded";
import SEO from "../components/SEO";
import { useFadeIn } from "../components/Animation/useFadeIn";
import DateFormat from "../components/DateFormat";
import TimeToRead from "../components/TimeToRead";

const StyledBox = styled(Box)(
    ({
        theme: {
            spacing,
            palette: { primary, text },
        },
    }) => ({
        "& a": {
            color: text.primary,
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
            }
            html
        }
    }
`;

const PreviousComp = () => (
    <Fragment>
        <PreviousIcon />
        Previous
    </Fragment>
);
const NextComp = () => (
    <Fragment>
        Next
        <NextIcon />
    </Fragment>
);

const Blog = ({
    data: {
        markdownRemark: {
            timeToRead,
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
                        pt={2}
                        fontSize={{
                            xs: "body2.fontSize",
                            md: "body1.fontSize",
                        }}
                        dangerouslySetInnerHTML={{ __html: html }}
                    />
                    <Box display="flex" justifyContent="space-between" pt={3}>
                        {navs.map(({ component: Comp, link }) =>
                            link ? (
                                <Box
                                    clone
                                    key={link}
                                    display="flex"
                                    alignItems="center"
                                    lineHeight={1}
                                    fontWeight="fontWeightBold"
                                >
                                    <MuiLink
                                        component={Link}
                                        to={`/blog/${link}`}
                                        color="textPrimary"
                                    >
                                        <Comp />
                                    </MuiLink>
                                </Box>
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
