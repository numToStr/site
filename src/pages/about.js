import React, { Fragment } from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import MuiLink from "@material-ui/core/Link";
import { Link } from "gatsby";
import SEO from "../components/SEO";
import { useFadeIn } from "../components/Animation/useFadeIn";

const About = () => {
    const [fadeIn, animated] = useFadeIn();

    return (
        <Fragment>
            <SEO title="About" />
            <Box
                style={fadeIn}
                component={animated.div}
                height="100%"
                display="flex"
                alignItems={{
                    xs: "flex-start",
                    md: "center",
                }}
                pb={{ xs: 0, lg: 3 }}
            >
                <Grid container alignItems="center">
                    <Grid item xs={12} md={5}>
                        <Box
                            component="p"
                            lineHeight={1}
                            m={0}
                            fontSize={{
                                xs: "h3.fontSize",
                                md: "h1.fontSize",
                            }}
                            textAlign={{
                                xs: "left",
                                md: "center",
                            }}
                        >
                            Hello
                        </Box>
                    </Grid>
                    <Grid item>
                        <Box
                            height={{ xs: 2, md: 200 }}
                            width={{ xs: 100, md: 2 }}
                            bgcolor="text.primary"
                            borderRadius="borderRadius"
                            my={3}
                            mr={{
                                md: 8,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md>
                        <Box
                            pb={{
                                xs: 5,
                                md: 0,
                            }}
                            pr={{
                                md: 4,
                            }}
                        >
                            <Typography variant="h5" gutterBottom>
                                I'm Vikas Raj.
                            </Typography>
                            <Typography gutterBottom>
                                I'm a Full-Stack Developer (self taught){" "}
                                <span role="img" aria-labelledby="cool">
                                    🤘
                                </span>
                                . I was born in 1996 (calculate my age).
                                Currently living in New Delhi, India (in a
                                Docker Container{" "}
                                <span role="img" aria-labelledby="docker">
                                    🐋
                                </span>
                                ). Done bachelors in Commerce (BIG MISTAKE). Now
                                pursuing masters in Computer Applications
                                (finally{" "}
                                <span role="img" aria-label="dancing">
                                    🕺
                                </span>
                                ).
                            </Typography>
                            <Typography>
                                Besides that, I make stupid stuff on the Web{" "}
                                <span role="img" aria-labelledby="web">
                                    🕸
                                </span>
                                . I code with React, Vue and Node.js (w/
                                GraphQl). Interested in DevOps and Machine
                                Learning{" "}
                                <span role="img" aria-labelledby="robot">
                                    🤖
                                </span>{" "}
                                (next goal). I'm also learning Python{" "}
                                <span role="img" aria-labelledby="snake">
                                    🐍
                                </span>
                                . Read about what I'm learning on{" "}
                                <MuiLink
                                    component={Link}
                                    to="/blog"
                                    underline="always"
                                    color="textPrimary"
                                >
                                    my blog
                                </MuiLink>
                                . Apart from coding I also debug{" "}
                                <span role="img" aria-labelledby="ladybug">
                                    🐞
                                </span>{" "}
                                code and play guitar{" "}
                                <span role="img" aria-labelledby="guitar">
                                    🎸
                                </span>
                                .
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Fragment>
    );
};

export default About;
