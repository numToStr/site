import React, { Fragment } from "react";

import SEO from "../components/SEO";
import Box from "@material-ui/core/Box";
import { useTrail, config } from "react-spring";
import Im from "../components/Home/Im";
import Name from "../components/Home/Name";
import Title from "../components/Home/Title";
import Footer from "../components/Footer";

const components = [Im, Name, Title];

const IndexPage = () => {
    const trails = useTrail(components.length, {
        config: config.wobbly,
        from: { opacity: 0, x: 50 },
        to: { opacity: 1, x: 0 },
    });

    return (
        <Fragment>
            <SEO title="Home" />
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                height="100%"
                width="100%"
                px={2}
            >
                <Box mb={8}>
                    {trails.map(({ x, opacity }, $i) => {
                        const Component = components[$i];
                        return (
                            <Component
                                key={$i}
                                style={{
                                    opacity,
                                    transform: x.interpolate(
                                        x => `translate3d(0,${x}px,0)`
                                    ),
                                }}
                            />
                        );
                    })}
                </Box>
            </Box>
            <Footer />
        </Fragment>
    );
};

export default IndexPage;
