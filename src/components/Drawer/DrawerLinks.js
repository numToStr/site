import React from "react";
import styled from "@material-ui/styles/styled";
import Link from "@material-ui/core/Link";
import { animated, useTrail } from "react-spring";

const LinkDiv = styled(animated.div)(({ theme: { breakpoints } }) => ({
    textTransform: "uppercase",
    fontWeight: "bold",
    margin: "0 0 1rem",
    lineHeight: "normal",
    fontSize: "3.5rem",
    color: "#fff",
    letterSpacing: 10,
    transition: "color .3s ease-in-out, letter-spacing .5s ease-in-out",
    [breakpoints.down("sm")]: {
        fontSize: "2rem",
    },
    "&:hover": {
        letterSpacing: 20,
        color: "crimson !important",
    },
}));

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
        to: "/",
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

const config = { mass: 1, tension: 170, friction: 18 };

export default ({ open, onTap }) => {
    const trails = useTrail(links.length, {
        config,
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
            <LinkDiv
                key={curr.text}
                style={{
                    opacity: opacity.interpolate([0, 0.7, 1], [0, 0.3, 1]),
                    transform: xy.interpolate(
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
            </LinkDiv>
        );
    });
};
