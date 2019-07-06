import React from "react";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import { animated, useTrail, config } from "react-spring";

const links = [
    {
        text: "Home",
        to: "/",
    },
    {
        text: "About",
        to: "/about",
    },
    {
        text: "Projects",
        to: "/projects",
    },
    {
        text: "Blog",
        to: "/blog",
    },
    {
        text: "Contact",
        to: "/contact",
    },
];

export default ({ open, onTap }) => {
    const trails = useTrail(links.length, {
        config: config.stiff,
        from: {
            opacity: 0,
            xy: [-50, -200],
        },
        to: {
            opacity: open ? 1 : 0,
            xy: open ? [0, 0] : [-50, -200],
        },
    });

    return trails.map(({ xy, opacity }, $i) => {
        const curr = links[$i];
        return (
            <Box
                key={curr.text}
                component={animated.div}
                fontWeight="fontWeightBold"
                lineHeight={1}
                mb={3}
                color="text.primary"
                fontSize={{
                    xs: "h3.fontSize",
                    md: "h2.fontSize",
                }}
                className="text-uppercase"
                style={{
                    opacity: opacity.to([0, 0.7, 1], [0, 0.3, 1]),
                    transform: xy.to(
                        (_x, _y) => `translate3d(${_x}%,${_y}px,0)`
                    ),
                }}
            >
                <Link
                    color="inherit"
                    underline="none"
                    onClick={onTap(curr.to)}
                    data-href={curr.to}
                    href={curr.to}
                >
                    {curr.text}
                </Link>
            </Box>
        );
    });
};
